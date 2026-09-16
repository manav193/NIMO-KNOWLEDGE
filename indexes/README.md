# Knowledge Index Registry

## 1. Purpose

The `indexes/` directory provides lightweight, fast-traversal metadata catalogs of all approved and active knowledge entries stored across the repository.

Instead of requiring consumers (such as **NIMO-CORE**) to recursively crawl and parse every file in `knowledge/`, `faq/`, and other domain folders, consumers can load `indexes/catalog.json` into memory to quickly lookup paths, topics, versions, and statuses.

---

## 2. Catalog Entry Format

Each catalog record adheres to the following specification:

```json
{
  "id": "knowledge-0001",
  "type": "faq",
  "project": "nimo-web",
  "topic": "katex-rendering-guidelines",
  "version": 1,
  "status": "approved",
  "path": "faq/approved/example-faq.json",
  "updatedAt": "2026-09-16T11:00:00Z"
}
```

### Field Definitions:
- `id`: Unique identifier referencing the primary artifact.
- `type`: Category or schema type (`knowledge_entry`, `faq`, `issue_pattern`, `feedback`, `feature_request`).
- `project`: Source project associated with this knowledge item.
- `topic`: Keyword or classification slug for indexing.
- `version`: Monotonic version number of the entry.
- `status`: Lifecycle status (`approved`, `active`, `archived`).
- `path`: Relative path from the repository root to the file.
- `updatedAt`: ISO 8601 timestamp of the most recent revision.

---

## 3. Maintenance Rules

- The catalog is updated whenever an entry transitions to `approved` or `active`.
- Entries that are superseded or `archived` remain in the catalog with status `"archived"` or are pruned according to retention rules.
