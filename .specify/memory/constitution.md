
<!--
SYNC IMPACT REPORT
------------------
Version change: (none) → 1.0.0
Modified principles: All placeholders replaced with concrete values for petstore e-commerce app
Added sections: All core sections now concrete
Removed sections: None
Templates requiring updates: plan-template.md (✅ updated), spec-template.md (✅ updated), tasks-template.md (✅ updated)
Follow-up TODOs: RATIFICATION_DATE (first adoption date unknown, marked TODO)
-->

# petstore Constitution

## Core Principles

### I. Service-Oriented Architecture
All backend features MUST be implemented as modular Spring Boot services. Each service MUST be independently testable, documented, and expose a clear API contract. Rationale: Enables maintainability, scalability, and clear separation of concerns.

### II. Modern Frontend Discipline
Frontend MUST use React with MUI and Tailwind for UI. All components MUST be reusable, accessible, and follow atomic/component-driven design. Rationale: Ensures UI consistency, accessibility, and rapid iteration.

### III. Test-First (NON-NEGOTIABLE)
All code (backend and frontend) MUST be developed using TDD or equivalent test-first discipline. Unit, integration, and end-to-end tests are mandatory. Red-Green-Refactor cycle is strictly enforced. Rationale: Guarantees reliability and enables safe refactoring.

### IV. Integration & Contract Testing
Integration tests MUST cover all service boundaries (Spring Boot APIs, PostgreSQL, frontend-backend). API contracts MUST be validated with automated tests. Rationale: Prevents regressions and ensures system integrity.

### V. Observability, Versioning & Simplicity
All services MUST implement structured logging, error tracking, and health checks. Semantic versioning (MAJOR.MINOR.PATCH) is required for all deployable artifacts. Simplicity is prioritized: avoid over-engineering, follow YAGNI and KISS principles. Rationale: Enables debuggability, safe upgrades, and sustainable growth.

## Technology & Security Requirements

- Backend: Java 21+, Spring Boot (latest LTS), PostgreSQL (cloud-managed on Render)
- Frontend: React (latest LTS), Tailwind CSS, MUI
- Cloud: Render for deployment (staging/prod), managed PostgreSQL
- Security: All secrets managed via environment variables; HTTPS enforced; OWASP Top 10 mitigations required; Regular dependency audits
- Performance: API endpoints MUST respond <300ms p95 under expected load; Frontend initial load <2s on broadband
- Compliance: GDPR and CCPA data handling for user data

## Development Workflow & Quality Gates

- All changes via Pull Requests (PRs) with mandatory code review
- CI/CD pipeline MUST run all tests (unit, integration, e2e) and static analysis (lint, type check)
- PRs MUST reference a tracked task/spec and pass all constitution gates
- Deployments to staging/prod via Render with automated rollback on failure
- Documentation (README, API docs, architecture) MUST be updated with each feature

## Governance

This constitution supersedes all other development practices for petstore. Amendments require:
- Documentation of the proposed change, rationale, and migration plan
- Approval by project maintainers (majority)
- Version bump per semantic versioning (see above)
- All PRs/reviews MUST verify compliance with the latest constitution
- Complexity must be justified in the plan and spec
- Use this constitution as the authoritative runtime guidance for all contributors

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE) | **Last Amended**: 2026-04-30
<!-- Version: 1.0.0 | Ratified: TODO | Last Amended: 2026-04-30 -->
