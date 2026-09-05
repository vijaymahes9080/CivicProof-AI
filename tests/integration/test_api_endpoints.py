"""
Integration Tests for FastAPI Routers
"""
import asyncio
from fastapi.testclient import TestClient
from app.main import app
from app.db.session import init_db

# Initialize database tables and seeds before tests
asyncio.run(init_db())

client = TestClient(app)


def test_health_check_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "HEALTHY"
    assert "CivicProof AI" in data["service"]


def test_schemes_list_endpoint():
    response = client.get("/api/v1/schemes")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0


def test_assistant_chat_endpoint():
    payload = {
        "query": "What is the family income limit for Central Sector Scholarship?",
        "language": "en"
    }
    response = client.post("/api/v1/assistant/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "answer" in data
    assert "citations" in data
    assert data["confidence_score"] > 0.0


def test_eligibility_evaluate_endpoint():
    payload = {
        "citizen": {
            "state_of_domicile": "Tamil Nadu",
            "category": "OBC",
            "gender": "Female",
            "annual_family_income": 200000.0,
            "education_level": "Undergraduate",
            "previous_exam_percentage": 85.0,
            "is_differently_abled": False,
            "is_first_graduate": True,
            "govt_school_studied_class_6_to_12": True
        }
    }
    response = client.post("/api/v1/eligibility/evaluate", json=payload)
    assert response.status_code == 200
    results = response.json()
    assert len(results) > 0
    assert "passed_rules" in results[0]
