# CivicProof AI - Data Model Specification

## 1. Relational Entities (PostgreSQL)

```
+--------------------------------------------------------------------+
|                              SOURCES                               |
+--------------------------------------------------------------------+
| id                  VARCHAR(36) [PK]                               |
| url                 VARCHAR(1024) [UNIQUE]                         |
| domain              VARCHAR(255)                                   |
| title               VARCHAR(512)                                   |
| department          VARCHAR(255)                                   |
| state               VARCHAR(100)                                   |
| language            VARCHAR(10)                                    |
| content_hash        VARCHAR(64)  -- SHA-256                        |
| trust_status        VARCHAR(50)  -- OFFICIAL_GOVERNMENT            |
| version_num         INTEGER                                        |
+--------------------------------------------------------------------+
                                 | 1
                                 |
                                 | N
+--------------------------------------------------------------------+
|                          SOURCE_VERSIONS                           |
+--------------------------------------------------------------------+
| id                  VARCHAR(36) [PK]                               |
| source_id           VARCHAR(36) [FK -> SOURCES.id]                 |
| version_num         INTEGER                                        |
| raw_content         TEXT                                           |
| content_hash        VARCHAR(64)                                    |
| diff_summary        TEXT                                           |
| captured_at         TIMESTAMP                                      |
+--------------------------------------------------------------------+
```

---

## 2. Scheme & Rules Entities

```
+--------------------------------------------------------------------+
|                              SCHEMES                               |
+--------------------------------------------------------------------+
| id                  VARCHAR(36) [PK]                               |
| slug                VARCHAR(255) [UNIQUE]                          |
| title_en            VARCHAR(512)                                   |
| title_ta            VARCHAR(512)                                   |
| department          VARCHAR(255)                                   |
| state               VARCHAR(100)                                   |
| funding_type        VARCHAR(100)                                   |
| official_portal_url VARCHAR(1024)                                  |
| max_amount          VARCHAR(100)                                   |
+--------------------------------------------------------------------+
                                 | 1
                                 |
                                 | 1
+--------------------------------------------------------------------+
|                        ELIGIBILITY_RULESETS                        |
+--------------------------------------------------------------------+
| id                  VARCHAR(36) [PK]                               |
| scheme_id           VARCHAR(36) [FK -> SCHEMES.id] [UNIQUE]        |
| rules_json          JSON                                           |
| version             INTEGER                                        |
+--------------------------------------------------------------------+
```
