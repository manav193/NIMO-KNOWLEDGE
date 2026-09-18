# System Architecture

## 1. Overview & Architectural Role

**NIMO-KNOWLEDGE** provides the centralized, version-controlled knowledge and learning-data layer for the NIMO ecosystem. It bridges the gap between empirical observations gathered by distributed NIMO clients and the authoritative knowledge base leveraged by **NIMO-CORE**.

```
+-----------------------------------------------------------------------------------+
|                                  NIMO CLIENTS                                     |
|  +-------------------+   +--------------------+   +----------------------------+  |
|  |     NIMO-WEB      |   |     Prompt-Aii     |   |       NIMO Assistant       |  |
|  | (Study / Web UI)  |   | (Strategy / Prompts|   | (OS Tools / Voice Actions) |  |
|  +-------------------+   +--------------------+   +----------------------------+  |
+-----------------------------------------------------------------------------------+
                                         |
                                         | [Sanitized events & telemetric signals]
                                         v
+-----------------------------------------------------------------------------------+
|                                   NIMO-CORE                                       |
|               (Intelligence, Reasoning & Orchestration Layer)                     |
+-----------------------------------------------------------------------------------+
                                         |
                                         | [Evaluation Proposals & Benchmark Diffs]
                                         v
+-----------------------------------------------------------------------------------+
|                                 NIMO-KNOWLEDGE                                    |
|   +-------------------+  +--------------------+  +-----------------------------+  |
|   |   JSON Schemas    |  | Verified Knowledge |  |       Unified Catalog       |  |
|   |  (Data Contracts) |  | (Curated Heuristics|  |  (Entry Pointers & Meta)    |  |
|   +-------------------+  +--------------------+  +-----------------------------+  |
|   +----------------------------------------------------------------------------+  |
|   |                        Evaluations & Approvals                             |  |
|   +----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
```

---

## 2. GitHub Layer vs. Google Drive Layer

A core architectural tenet of the NIMO ecosystem is the separation of **declarative intelligence** from **bulk object storage**:

```
+-------------------------------------------------------------+
|                      NIMO-KNOWLEDGE (GitHub)                |
|  - JSON Schemas                                             |
|  - Verified domain knowledge (general, edu, os, auto)       |
|  - Evaluation proposals & decisions                         |
|  - Index catalogs (`indexes/catalog.json`)                  |
|  - Git-backed version history and rollback mechanism        |
|  - Strict size constraints (lightweight text & JSON only)   |
+-------------------------------------------------------------+
                              ^
                              | [Curated extraction & approval]
                              v
+-------------------------------------------------------------+
|                  Google Drive (Bulk Data Layer)             |
|  - Raw conversation archives & historical traces            |
|  - Audio streams & visual media (screenshots, demos)        |
|  - Benchmark datasets & training splits                     |
|  - Unprocessed user feedback dumps                          |
+-------------------------------------------------------------+
```

### Key Principles:
1. **GitHub is the Brain Catalog**: High-signal, low-volume, auditable, versioned.
2. **Google Drive is the Raw Vault**: High-volume, low-density, cold storage.
3. **NIMO-CORE is the Conduit**: NIMO-CORE consumes Git indexes and entries into memory for agent decision-making.

---

## 3. Data Flow & Signal Ingestion Pipeline

When an agent or user interaction occurs, the signal traverses a rigorous sequence before it can affect future agent behavior:

```
Interaction
   │
   ▼
[1. Local Scrubbing]   --> Drops secrets, hashes identifiers, applies sanitization
   │
   ▼
[2. Staging / Drive]   --> Stores full raw payload in private, cold storage
   │
   ▼
[3. Proposal Creation] --> Generates a structured JSON record conforming to NIMO schemas
   │
   ▼
[4. Evaluation Gate]   --> Benchmark testing, anti-hallucination check, peer review
   │
   ├── (Rejected)  ────--> Logged in `evaluations/rejected/` with rationale
   │
   └── (Approved)  ────--> Committed to `knowledge/` and indexed in `indexes/catalog.json`
                              │
                              ▼
                        NIMO-CORE pulls updated index into active memory
```

---

## 4. Subsystem Roles & Responsibilities

### 4.1 NIMO-CORE
- Serves as the central consumer of approved knowledge.
- Ingests `indexes/catalog.json` on initialization to index system playbooks.
- Submits `learning-event` and `evaluation` proposals whenever execution heuristics deviate or improve.

### 4.2 NIMO-WEB
- The front-facing educational portal.
- Emits user feedback (`feedback.schema.json`) regarding course material, UI clarity, and comprehension.
- Emits student feature requests (`feature-request.schema.json`).

### 4.3 Prompt-Aii
- The prompt engineering and agent persona workbench.
- Emits successful prompting patterns and failures (`suggestion.schema.json` and `issue-pattern.schema.json`).

### 4.4 NIMO Assistant
- OS automation and voice assistant agent.
- Emits environment-specific issue patterns (`issue-pattern.schema.json`) for Windows, macOS, and Linux tool execution failures.

---

## 5. Security Boundaries & Tamper Resistance

- **Declarative Immutability**: Knowledge entries are committed through Git pull requests requiring review.
- **No Self-Activation**: Agent processes cannot write directly to `knowledge/` or `approved/` paths during live inference.
- **Runtime Approval Boundary**: NIMO-CORE enforces that only entries marked with `status: "approved"` or `status: "active"` can be loaded into runtime memory. Proposed, draft, evaluated, or rejected items are strictly ignored.
- **Deterministic Replay**: Every entry contains a Git hash and schema version, enabling point-in-time reconstruction of agent behavior.
- **Planned Storage Distinction**: Google Drive serves as a future bulk object and historical archive layer (not yet implemented in production); it never feeds directly into active runtime inference without passing through the NIMO-KNOWLEDGE evaluation gate.
