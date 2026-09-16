# Data Governance & Privacy Policy

## 1. Core Mission

The NIMO-KNOWLEDGE repository operates under a strict **privacy-first and zero-secrets** governance mandate. Because this repository serves as the shared intelligence layer for public and private components across the NIMO ecosystem, data integrity, confidentiality, and verification are mandatory prerequisites for any commit.

---

## 2. Strict Exclusions (Zero-Tolerance)

The following items are **strictly prohibited** from ever being committed to this repository in any form:

- **API Keys & Secrets**: Secret keys, tokens, client secrets, symmetric keys, private certificates (`.pem`, `.key`).
- **Authentication Credentials**: Passwords, hashed passwords, basic auth tokens, OAuth bearer tokens, session cookies.
- **Private Access Tokens (PATs)**: GitHub PATs, cloud platform service tokens, database connection strings.
- **Personally Identifiable Information (PII)**: User full names, email addresses, phone numbers, billing details, physical addresses, IP addresses.
- **Raw User Conversations**: Full raw dialogue transcripts, audio recordings, or unscrubbed chat logs.
- **Internal Proprietary Enclaves**: Confidential internal server IP addresses, unmapped private domains, or proprietary binaries.

> [!CAUTION]
> Any commit found containing secrets or unscrubbed PII will trigger immediate repository history scrubbing, secret revocation, and incident review.

---

## 3. The 7-Step Privacy Pipeline

All intelligence signals sourced from NIMO applications must traverse the following seven sequential validation gates before reaching NIMO-KNOWLEDGE:

```
[1. Collection]
      │
      ▼
[2. Sanitization]
      │
      ▼
[3. Minimization]
      │
      ▼
[4. Categorization]
      │
      ▼
[5. Evaluation]
      │
      ▼
[6. Approval]
      │
      ▼
[7. Knowledge]
```

### Stage Breakdown:
1. **Collection**: Raw interactions are received in ephemeral memory or partitioned Google Drive storage. No Git interaction occurs.
2. **Sanitization**: Automated scanners scrub any identifiable regex patterns (emails, keys, IPs, tokens).
3. **Minimization**: Data is pruned to the absolute minimal semantic essence required to describe the pattern or lesson.
4. **Categorization**: The sanitized record is classified into one of the 10 standard categories and mapped to its JSON schema.
5. **Evaluation**: Benchmark checks and automated unit/validation tests verify that the pattern is safe, accurate, and non-hallucinatory.
6. **Approval**: An authorized reviewer or evaluation consensus approves the entry.
7. **Knowledge**: The approved artifact is written to the appropriate domain folder and registered in `indexes/catalog.json`.

---

## 4. The Knowledge Lifecycle

Every record within NIMO-KNOWLEDGE progresses through formal lifecycle states:

```
RAW ──> SANITIZED ──> PROCESSED ──> EVALUATED ──┬──> APPROVED ──> ACTIVE ──> ARCHIVED
                                                │
                                                └──> REJECTED
```

| State | Description | In Git? |
| :--- | :--- | :--- |
| **RAW** | Unfiltered telemetry or user submission. | **NO** (Lives in Google Drive / Staging only). |
| **SANITIZED** | Scrubbed of all PII and secret markers. | Ephemeral staging or proposal workspace. |
| **PROCESSED** | Structured into conformant JSON schema format. | In `processed/` folders for review. |
| **EVALUATED** | Tested against safety and accuracy benchmarks. | In `evaluations/proposals/`. |
| **APPROVED** | Verified and signed off by maintainers. | In `approved/` folders. |
| **ACTIVE** | Promoted into `knowledge/` and indexed in `catalog.json`. | Active NIMO-CORE operational index. |
| **REJECTED** | Failed validation, safety, or utility checks. | In `evaluations/rejected/` with post-mortem notes. |
| **ARCHIVED** | Deprecated, superseded, or out of date. | Retained for historical audit; removed from active catalog. |

> [!IMPORTANT]
> **NO AUTOMATIC UNVERIFIED KNOWLEDGE -> ACTIVE KNOWLEDGE.**
> Direct injection from unverified sources into the `ACTIVE` state is architecturally prohibited.

---

## 5. Synthetic Data Baseline

For initial bootstrapping and example demonstration:
- Only **synthetic, mocked, and anonymized** entries are stored in this repository.
- Examples illustrate schema compliance, field formats, and categorization without exposing any real user interaction or production data.

---

## 6. Retention and Deletion

- **Git Immutability vs. Privacy**: Because Git maintains history, sensitive data must never enter commits in the first place.
- **Deprecation**: When knowledge becomes obsolete, its schema status transitions to `archived` and its reference is removed from the active `catalog.json`.
- **Periodic Audits**: Automated linting tools and secret scanners run against repository commits to ensure compliance with this data policy.
