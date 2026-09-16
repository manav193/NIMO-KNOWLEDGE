# Contribution Guidelines & Future Project Contracts

> [!NOTE]
> **Future Contract Notice**: The integration contracts detailed in this document define future specifications and protocols for cross-project interoperability. These pipelines are currently under phased design and do not claim to be operating production integrations at this stage.

---

## 1. Contributing to NIMO-KNOWLEDGE

Contributions to NIMO-KNOWLEDGE may come from human developers, maintainers, or automated pipelines (e.g., NIMO-CORE evaluation agents). Regardless of origin, all submissions must:
1. Conform to the respective JSON schema in `schemas/`.
2. Adhere to the **Zero Secrets & Privacy-First** policy ([docs/data-policy.md](data-policy.md)).
3. Include clear provenance, evidence, and rationale.
4. Pass automated schema and validation scripts (`node scripts/validate.js`).

---

## 2. Future Project Contribution Contracts

```
+-------------------------------------------------------------------------------+
|                      Ecosystem Contribution Contracts                         |
+-------------------+-----------------------------------------------------------+
| Source Project    | Emitted Signal Types & Payloads                           |
+-------------------+-----------------------------------------------------------+
| NIMO-WEB          | - Student feedback (`feedback.schema.json`)               |
|                   | - UI/UX feature requests (`feature-request.schema.json`)   |
|                   | - Educational FAQs (`faq.schema.json`)                    |
|                   | - Sanitized web error patterns (`issue-pattern.schema.json`)|
|                   | - Study usage insights & topic friction points            |
+-------------------+-----------------------------------------------------------+
| Prompt-Aii        | - Agent prompt templates & revisions                      |
|                   | - Successful reasoning trajectories (`knowledge-entry`)   |
|                   | - Failed strategy post-mortems (`issue-pattern.schema.json`)|
|                   | - Automation heuristic proposals (`suggestion.schema.json`)|
+-------------------+-----------------------------------------------------------+
| NIMO Assistant    | - Voice and task outcomes                                 |
|                   | - Windows & macOS execution patterns                      |
|                   | - Tool timeout and permission failures                    |
|                   | - Successful local automation workflows                   |
+-------------------+-----------------------------------------------------------+
| NIMO-CORE         | - Atomic learning events (`learning-event.schema.json`)   |
|                   | - Multi-agent evaluation results (`evaluations/`)          |
|                   | - System-wide improvement proposals                       |
|                   | - Active knowledge catalog re-indexing                    |
+-------------------+-----------------------------------------------------------+
```

---

## 3. Contribution Workflow

To add or update knowledge, follow this structured pull-request lifecycle:

```
[1. Branch] ──> [2. Author / Stage] ──> [3. Validate] ──> [4. PR Review] ──> [5. Merge & Index]
```

### 1. Branch Naming Conventions
- `proposal/<topic>-<short-description>` (e.g., `proposal/windows-path-escaping`)
- `faq/<topic>` (e.g., `faq/latex-rendering`)
- `schema/<schema-name>` (e.g., `schema/learning-event-v2`)

### 2. Record Authoring
- Assign a unique ID conforming to the regex pattern defined in the corresponding schema.
- Populate `evidence` with verifiable references (test hashes, anonymized trace IDs, or benchmark runs).
- Set `metadata.sanitized` explicitly to `true`.

### 3. Local Verification
Run the verification suite before opening a PR:
```bash
node scripts/validate.js
```

### 4. Review & Approval
- Pull requests require approval from at least one repository maintainer.
- For `knowledge/` updates, the PR must specify:
  - What prior belief or pattern is altered or superseded.
  - Test evidence demonstrating why this change improves agent performance.

### 5. Catalog Indexing
Upon PR approval and merge, the maintainer or CI workflow updates `indexes/catalog.json` to register the new active knowledge entry.
