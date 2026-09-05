# Contributing to CivicProof AI

Thank you for helping build trustworthy, evidence-grounded civic infrastructure!

## Development Guidelines

1. **Official Sources Only:** Any new scheme added to CivicProof AI must cite an official `.gov.in`, `.nic.in`, or accredited state portal guideline with a direct public URL.
2. **Deterministic Rules First:** Never place eligibility logic inside LLM prompt templates. Define explicit Pydantic rule models in `apps/api/app/eligibility/engine.py`.
3. **Bilingual Parity:** Ensure new schemes and user interface strings have translations in both English and Tamil.
4. **Test Coverage:** All new endpoints, rules, and parser additions must include unit and security test cases.

## Pull Request Checklist

- [ ] Unit tests pass: `pytest tests/`
- [ ] 30-Question benchmark evaluation succeeds: `python -m services.evaluation.runner`
- [ ] No unvetted external URLs or non-allowlisted domains added.
- [ ] Zero secrets or personal identity information committed.
