"""
CivicProof AI - SQLAlchemy Database Models
"""
import uuid
from datetime import datetime
from sqlalchemy import (
    Column,
    String,
    Text,
    Float,
    Integer,
    Boolean,
    DateTime,
    ForeignKey,
    JSON,
    Enum as SQLEnum
)
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=True)
    role = Column(String(50), default="citizen", nullable=False)  # citizen, admin, reviewer
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class Source(Base):
    __tablename__ = "sources"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    url = Column(String(1024), nullable=False, unique=True, index=True)
    domain = Column(String(255), nullable=False, index=True)
    title = Column(String(512), nullable=False)
    department = Column(String(255), nullable=False, index=True)
    state = Column(String(100), nullable=False, index=True)
    language = Column(String(10), default="en", nullable=False)
    publication_date = Column(DateTime, nullable=True)
    effective_date = Column(DateTime, nullable=True)
    last_checked_date = Column(DateTime, default=datetime.utcnow)
    content_hash = Column(String(64), nullable=False)  # SHA-256
    trust_status = Column(String(50), default="OFFICIAL_GOVERNMENT", nullable=False)
    version_num = Column(Integer, default=1, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    versions = relationship("SourceVersion", back_populates="source", cascade="all, delete-orphan")
    chunks = relationship("SchemeChunk", back_populates="source", cascade="all, delete-orphan")


class SourceVersion(Base):
    __tablename__ = "source_versions"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    source_id = Column(String(36), ForeignKey("sources.id"), nullable=False, index=True)
    version_num = Column(Integer, nullable=False)
    raw_content = Column(Text, nullable=False)
    content_hash = Column(String(64), nullable=False)
    diff_summary = Column(Text, nullable=True)
    captured_at = Column(DateTime, default=datetime.utcnow)

    source = relationship("Source", back_populates="versions")


class Scheme(Base):
    __tablename__ = "schemes"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    slug = Column(String(255), unique=True, index=True, nullable=False)
    title_en = Column(String(512), nullable=False)
    title_ta = Column(String(512), nullable=True)
    department = Column(String(255), nullable=False, index=True)
    state = Column(String(100), nullable=False, index=True)
    funding_type = Column(String(100), default="Centrally Sponsored", nullable=False)
    official_portal_url = Column(String(1024), nullable=False)
    application_window_start = Column(DateTime, nullable=True)
    application_window_end = Column(DateTime, nullable=True)
    max_amount = Column(String(100), nullable=True)
    description_en = Column(Text, nullable=False)
    description_ta = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    chunks = relationship("SchemeChunk", back_populates="scheme", cascade="all, delete-orphan")
    ruleset = relationship("EligibilityRuleset", back_populates="scheme", uselist=False, cascade="all, delete-orphan")


class SchemeChunk(Base):
    __tablename__ = "scheme_chunks"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    scheme_id = Column(String(36), ForeignKey("schemes.id"), nullable=False, index=True)
    source_id = Column(String(36), ForeignKey("sources.id"), nullable=False, index=True)
    section_title = Column(String(255), nullable=True)
    page_number = Column(Integer, nullable=True)
    content = Column(Text, nullable=False)
    token_count = Column(Integer, default=0)
    citation_anchor = Column(String(255), nullable=True)
    embedding_id = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    scheme = relationship("Scheme", back_populates="chunks")
    source = relationship("Source", back_populates="chunks")


class EligibilityRuleset(Base):
    __tablename__ = "eligibility_rulesets"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    scheme_id = Column(String(36), ForeignKey("schemes.id"), unique=True, nullable=False, index=True)
    rules_json = Column(JSON, nullable=False)
    version = Column(Integer, default=1)
    last_updated = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    scheme = relationship("Scheme", back_populates="ruleset")


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    action = Column(String(100), nullable=False, index=True)
    user_id = Column(String(100), default="anonymous")
    resource = Column(String(255), nullable=False)
    status = Column(String(50), nullable=False)
    ip_address = Column(String(100), nullable=True)
    details_json = Column(JSON, nullable=True)
    latency_ms = Column(Float, default=0.0)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)


class AlertRecord(Base):
    __tablename__ = "alert_records"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    scheme_id = Column(String(36), ForeignKey("schemes.id"), nullable=True, index=True)
    source_url = Column(String(1024), nullable=False)
    change_type = Column(String(100), nullable=False)  # GUIDELINE_UPDATE, DEADLINE_EXTENDED, HASH_CHANGED
    old_hash = Column(String(64), nullable=True)
    new_hash = Column(String(64), nullable=False)
    diff_summary = Column(Text, nullable=True)
    is_notified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
