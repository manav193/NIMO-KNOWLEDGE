# Project Contract: Prompt-Aii

> **Status**: Active Integration Contract

Prompt-Aii is the prompt engineering workbench and agent evaluation sandbox for the NIMO ecosystem.

## Core Contribution
Prompt-Aii contributes **model-aware prompt engineering knowledge** rather than generic prompt text. Its contribution areas include:
- Deep reasoning prompt structures for reasoning-oriented models.
- High-level coding-agent prompts for Codex, Claude, and similar engineering agents.
- Model-specific image-generation prompt structures.
- Reverse-prompt visual decomposition patterns.
- Promplet patterns and reusable prompt strategies.
- Failure patterns and evaluation signals used to improve prompt quality.

## Future / Active Interactions
- **Consumes**: Historical issue patterns and failure trajectories to design anti-regression prompts.
- **Emits**:
  - Proven prompt templates and prompt-engineering guidelines (`knowledge-entry.schema.json`)
  - Reasoning optimizations (`suggestion.schema.json`)
  - Prompt drift and hallucination issue patterns (`issue-pattern.schema.json`)
  - Sanitized learning observations for evaluation; never raw private conversations.
- **NIMO-CORE consumes**: Only approved Prompt-Aii knowledge entries referenced by the NIMO-KNOWLEDGE catalog.

## Learning Contract
Prompt-Aii is a **knowledge source and evaluation laboratory**, not an autonomous model-weight trainer. New patterns follow the NIMO-KNOWLEDGE lifecycle:

`RAW -> SANITIZED -> PROCESSED -> EVALUATED -> APPROVED -> ACTIVE`

No raw chat logs, secrets, credentials, or PII may enter active knowledge. An observed successful prompt is not automatically considered universally optimal; it must be evaluated before promotion.

## Current Knowledge Asset
- `knowledge/projects/prompt-aii-deep-prompt-engineering.json` — approved foundation describing PromptAI's model-aware deep prompt engineering strategy.
