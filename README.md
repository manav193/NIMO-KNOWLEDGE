# NIMO-KNOWLEDGE

> Centralized, version-controlled knowledge and learning-data layer for the NIMO ecosystem.

[![Status](https://img.shields.io/badge/status-foundation--phase-blue.svg)](#)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](#)
[![Privacy](https://img.shields.io/badge/privacy-zero--secrets--first-critical.svg)](#privacy-first-design)
[![Lifecycle](https://img.shields.io/badge/lifecycle-governed--approval-orange.svg)](#knowledge-lifecycle)

---

## 1. What is NIMO-KNOWLEDGE?

**NIMO-KNOWLEDGE** serves as the authoritative, version-controlled repository of sanitized intelligence, schemas, curated operating patterns, and approved guidance across all NIMO ecosystem initiatives.

### What it IS:
- The single source of truth for **schemas** defining inter-project signals.
- A **governed approval layer** where observations are vetted before turning into active knowledge.
- A **versioned knowledge base** containing educational heuristics, automation playbooks, issue patterns, and domain solutions.
- A **structured catalog** indexing knowledge assets for consumption by NIMO-CORE and related services.

### What it is NOT:
- **NOT a database replacement**: It does not handle high-volume write transactions or low-latency transactional lookups.
- **NOT a bulk blob/media archive**: Raw datasets, multimedia assets, large historical dumps, and model checkpoints belong in **Google Drive**.
- **NOT an arbitrary dump for raw telemetry**: Raw telemetry or unscrubbed user conversations are strictly barred.

---

## 2. Ecosystem Architecture

NIMO-KNOWLEDGE sits at the center of knowledge consolidation and curation for the entire NIMO platform:

```
       +-------------------------------------------------------+
       |                     NIMO Projects                     |
       |  (NIMO-WEB, Prompt-Aii, NIMO Assistant, Future Svc)   |
       +-------------------------------------------------------+
                                  |
                                  | [Sanitized signals & telemetry]
                                  v
       +-------------------------------------------------------+
       |                       NIMO-CORE                       |
       |     (Intelligence, Orchestration & Learning Engine)   |
       +-------------------------------------------------------+
                                  |
                                  | [Evaluation proposals & test results]
                                  v
       +-------------------------------------------------------+
       |                    NIMO-KNOWLEDGE                     |
       |   (Schemas, Evaluations, Approvals & Catalog Index)   |
       +-------------------------------------------------------+
                                  |
                                  | [Curated, versioned, approved knowledge]
                                  v
       +-------------------------------------------------------+
       |                       NIMO-CORE                       |
       +-------------------------------------------------------+
                                  |
                                  | [Enhanced reasoning, safe tools & playbooks]
                                  v
       +-------------------------------------------------------+
       |                     NIMO Ecosystem                    |
       |              (Reliable, adaptive execution)           |
       +-------------------------------------------------------+
```

---

## 3. Project Relationships & Future Contracts

All inter-project interactions documented below represent **future integration contracts**. None of these automated pipelines exist in production yet; this repository defines the governance rules and schemas for them:

| Project | Role in Ecosystem | Future Ingestion / Contribution Contract |
| :--- | :--- | :--- |
| **NIMO-CORE** | Intelligence Orchestrator | Submits learning events and evaluation proposals; pulls approved knowledge and catalog indexes to calibrate agent reasoning. |
| **NIMO-WEB** | Web Application & Study UI | Emits student feedback, UI feature requests, frequently asked questions, and sanitized error patterns. |
| **Prompt-Aii** | Prompt Engineering Lab | Contributes successful agent strategies, failed reasoning patterns, prompt templates, and automation heuristics. |
| **NIMO Assistant** | Voice & OS Automation Agent | Contributes task execution outcomes, OS-specific failure modes (Windows/macOS), tool timeout patterns, and workflow scripts. |
| **Future Projects** | Enterprise & Domain Extensions | Conforms to strict JSON schemas to register domain knowledge and receive certified playbooks. |

---

## 4. GitHub vs. Google Drive Responsibilities

To maintain repository velocity, auditability, and safety, a strict architectural partition separates Git storage from Google Drive storage:

| Responsibility Domain | GitHub (NIMO-KNOWLEDGE) | Google Drive (Raw Storage) |
| :--- | :--- | :--- |
| **Primary Function** | Curated intelligence & governance layer | Bulk object & historical archive layer |
| **Data Types** | Schemas, metadata, catalog indexes, approved knowledge, evaluations, release versions | Multi-gigabyte raw transcripts, audio recordings, screen captures, raw feedback archives, database dumps |
| **Access Pattern** | High auditability, declarative Git commits, version diffs, branch pull requests | Batch upload, cold archive, streaming media, large analytical workloads |
| **Integrity & Trust** | Cryptographically signed commits, strict JSON schema validation, human/peer sign-off | Immutable cold storage, role-based folder access, storage retention rules |
| **NIMO-CORE Interaction**| Reads active indexes and approved knowledge directly; issues evaluation pull requests | Writes raw session logs via asynchronous background pipeline; never reads directly into active reasoning loops |

*See [docs/google-drive-integration.md](docs/google-drive-integration.md) for full integration architecture.*

---

## 5. Ten Core Data Categories

NIMO-KNOWLEDGE standardizes ten discrete data categories. Each category serves a dedicated operational purpose:

1. **FEEDBACKS**: Subjective user reactions, satisfaction ratings, sentiment evaluations, and UX critique.
2. **Frequently Asked Questions (FAQs)**: Verified, canonical question-answer pairs clarifying concepts, capabilities, or setup.
3. **Required Updates**: Identified technical discrepancies, API deprecations, schema changes, or out-of-date documentation requiring immediate patching.
4. **Feature Requests**: Formal user or system capability requests specifying use cases, priority, and expected utility.
5. **Suggestions**: Light-weight optimization ideas, UX tweaks, and heuristic refinements (distinct from formal feature specs).
6. **Error Patterns**: Recurring technical exceptions, tool crashes, OS-level failures, and edge cases paired with root causes and fixes.
7. **Success Patterns**: Proven strategies, high-performing prompts, resilient tool chains, and optimal agent workflows.
8. **Project Knowledge**: Architectural decisions, project-specific conventions, and domain reference materials.
9. **Learning Events**: Atomic, fine-grained observation signals captured during agent executions before broad generalization.
10. **Evaluation Results**: Structured audit findings and benchmark records documenting why a proposal was approved or rejected.

---

## 6. Privacy-First Design

### Zero Secrets Policy
This repository must **NEVER** contain:
- API keys, credentials, or private access tokens
- Passwords, bearer tokens, or secret hashes
- Personally Identifiable Information (PII) such as student names, email addresses, phone numbers, or physical addresses
- Raw private conversation transcripts or unscrubbed chat logs

### The 7-Step Privacy Pipeline
Raw data collected from any NIMO touchpoint must complete the 7-step pipeline before entering NIMO-KNOWLEDGE:
```
[1. Collection] -> [2. Sanitization] -> [3. Minimization] -> [4. Categorization]
                        -> [5. Evaluation] -> [6. Approval] -> [7. Knowledge]
```

1. **Collection**: Raw data ingested into isolated staging storage (Google Drive).
2. **Sanitization**: Automated scrubbing of all keys, secrets, tokens, and PII.
3. **Minimization**: Truncation to the minimal subset of information required to convey the pattern.
4. **Categorization**: Tagging and schema classification.
5. **Evaluation**: Benchmark validation, empirical consistency checks, and drift assessment.
6. **Approval**: Explicit review sign-off.
7. **Knowledge**: Publication to NIMO-KNOWLEDGE as an approved entry.

*Synthetic and anonymized example data only are permitted in initial repository states.*

---

## 7. Knowledge Lifecycle

Every knowledge item in NIMO-KNOWLEDGE adheres to an explicit lifecycle state machine:

```
       +---------------------------------------------+
       |                     RAW                     |
       +---------------------------------------------+
                              |
                              v
       +---------------------------------------------+
       |                  SANITIZED                  |
       +---------------------------------------------+
                              |
                              v
       +---------------------------------------------+
       |                  PROCESSED                  |
       +---------------------------------------------+
                              |
                              v
       +---------------------------------------------+
       |                  EVALUATED                  |
       +---------------------------------------------+
                       /             \
             (pass)   /               \  (fail)
                     v                 v
       +--------------------+    +--------------------+
       |      APPROVED      |    |      REJECTED      |
       +--------------------+    +--------------------+
                 |
                 v
       +--------------------+
       |       ACTIVE       |
       +--------------------+
                 |
                 v
       +--------------------+
       |      ARCHIVED      |
       +--------------------+
```

> [!IMPORTANT]
> **Cardinal Rule**: NO AUTOMATIC UNVERIFIED KNOWLEDGE -> ACTIVE KNOWLEDGE.
> Unverified observations or raw telemetry must never automatically be promoted to active knowledge without going through structured evaluation and approval.

---

## 8. Versioning & Rollback

- **Version Identifiers**: Knowledge entries, schemas, and catalog releases are versioned monotonically (`version: 1`, `version: 2`, or `knowledge-v1`, `knowledge-v2`).
- **Traceability**: Every update is anchored to a Git commit SHA with author provenance, rationale, and review logs.
- **Rollback via Git**: In the event of regression, knowledge entries can be rolled back immediately via standard `git revert` operations without affecting underlying persistence infrastructure.
- **No Automatic Production Activation**: Merging into `main` updates the catalog; client runtimes pull or bundle certified versions on designated release cadences.

---

## 9. Repository Structure

```
/
├── README.md                           # Ecosystem overview and governance root
├── .gitignore                          # Strict exclusions for secrets, caches, and dumps
├── schemas/                            # Strict JSON Schema definitions
│   ├── learning-event.schema.json
│   ├── feedback.schema.json
│   ├── suggestion.schema.json
│   ├── feature-request.schema.json
│   ├── faq.schema.json
│   ├── issue-pattern.schema.json
│   └── knowledge-entry.schema.json
│
├── knowledge/                          # Curated domain knowledge
│   ├── general/
│   ├── education/
│   ├── automation/
│   ├── windows/
│   ├── macos/
│   └── projects/
│
├── projects/                           # Project integration contracts & schemas
│   ├── nimo-core/
│   ├── nimo-web/
│   ├── prompt-aii/
│   ├── nimo-assistant/
│   └── future/
│
├── feedback/                           # User feedback records
│   ├── approved/
│   ├── processed/
│   └── examples/
│
├── suggestions/                        # Optimization proposals
│   ├── approved/
│   ├── processed/
│   └── examples/
│
├── feature-requests/                   # Capability expansion specs
│   ├── approved/
│   ├── processed/
│   └── examples/
│
├── faq/                                # Reusable verified Q&A
│   ├── approved/
│   └── processed/
│
├── evaluations/                        # Audit proposals & decisions
│   ├── proposals/
│   ├── approved/
│   └── rejected/
│
├── indexes/                            # Unified catalog registry
│   ├── README.md
│   └── catalog.json
│
├── scripts/                            # Validation & linting utilities
│   └── validate.js
│
└── docs/                               # Governance & architectural documentation
    ├── architecture.md
    ├── data-policy.md
    ├── contribution.md
    └── google-drive-integration.md
```

---

## 10. Getting Started & Validation

### Validate Local Schemas & Records
Ensure all JSON artifacts adhere to schema constraints and zero-secret rules:

```bash
node scripts/validate.js
```
