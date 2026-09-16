# Project Contract: NIMO-CORE

> **Status**: Future Integration Specification

NIMO-CORE is the intelligence and orchestration engine of the NIMO ecosystem.

## Future Interactions
- **Consumes**: `indexes/catalog.json`, `knowledge/` entries, and approved heuristics to tune reasoning, tool selection, and retry behaviors.
- **Emits**: Atomic `learning-event` proposals when execution anomalies or optimization signals emerge during agent operations.
- **Participates in**: Automated evaluation benchmarks to validate proposed knowledge entries before promotion to `approved`.
