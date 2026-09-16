# Google Drive Integration Architecture & Contract

> [!NOTE]
> **Planning & Design Specification**: This document establishes the boundary and integration contract between **GitHub** and **Google Drive** for future implementation. No live connection or active API upload to Google Drive is initiated during this foundational phase.

---

## 1. Architectural Division of Responsibilities

The NIMO ecosystem maintains a clean separation between **versioned intelligence** (hosted on GitHub) and **bulk storage archives** (hosted on Google Drive):

```
+---------------------------------------------------------------------------------------+
|                                    NIMO ECOSYSTEM                                     |
+-------------------------------------------+-------------------------------------------+
|             GitHub (Git Layer)            |         Google Drive (Object Layer)       |
+-------------------------------------------+-------------------------------------------+
| - JSON Schemas                            | - High-volume telemetry & chat dumps      |
| - Curated, approved domain knowledge      | - Audio streams, voice prompts, clips     |
| - Unified knowledge catalog index         | - Screenshot batches & visual UI traces   |
| - Formal evaluation proposals & decisions | - Historical raw feedback archives        |
| - Strict size footprint (<100MB target)   | - Pre-sanitized staging dumps             |
| - Cryptographic Git commit history        | - Multi-gigabyte benchmark datasets       |
+-------------------------------------------+-------------------------------------------+
```

---

## 2. Why Git is NOT a Database or Blob Store

1. **Git Repository Health**: Storing binary blobs, large audio clips, or millions of raw JSON lines bloats the `.git` directory, causing slow clones, timeouts, and difficult branch merges.
2. **Auditability & Review**: Git diffs excel at human-readable text, structured schemas, and targeted heuristics. Diffs on large datasets are unreviewable and pollute commit logs.
3. **Security & Revocation**: Once committed to Git history, a sensitive token or unscrubbed PII item requires complex rewrites (`git filter-repo`) and forces all collaborators to re-clone. Cold blob storage allows standard lifecycle expiration and granular access controls.

---

## 3. Future Google Drive Folder Hierarchy

In the future Google Drive integration phase, storage will be organized into standardized workspaces:

```
Google Drive: /NIMO-VAULT/
├── raw-telemetry/
│   ├── nimo-web/
│   ├── prompt-aii/
│   └── nimo-assistant/
├── media/
│   ├── audio-recordings/
│   └── ui-screenshots/
├── benchmarks/
│   ├── evaluation-runs/
│   └── baseline-corpora/
└── exports/
    └── historical-dumps/
```

---

## 4. Ingestion & Extraction Workflow

When raw data in Google Drive needs to inform NIMO-KNOWLEDGE, it follows an asynchronous extraction pipeline:

```
[Raw Data in Drive] ──> [Sanitization Worker] ──> [Distillation & Pattern Detection]
                                                              │
                                                              ▼
                                                   [Schema-Compliant Proposal]
                                                              │
                                                              ▼
                                                  [Pull Request into GitHub]
```

1. **Asynchronous Batching**: Heavy extraction workloads run off-peak against raw Drive archives.
2. **Automated Scrubbing**: Scrubbers strip all PII and secret patterns before any proposal is synthesized.
3. **Distillation**: Thousands of raw events condense into a single `issue-pattern` or `knowledge-entry`.
4. **Git Submission**: Only the distilled, high-signal, schema-compliant summary enters NIMO-KNOWLEDGE via Git.

---

## 5. NIMO-CORE Operational Rule

**Rule of Direct Trust**:
- **NIMO-CORE reads approved/indexed knowledge from GitHub**: This knowledge is trusted, verified, and guaranteed schema-compliant.
- **NIMO-CORE NEVER directly trusts arbitrary raw data from Google Drive**: Raw data in Google Drive must pass through the evaluation and approval gate before NIMO-CORE incorporates it into active decision-making.
