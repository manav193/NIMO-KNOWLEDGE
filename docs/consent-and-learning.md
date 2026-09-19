# NIMO Consent, Encrypted Memory & Learning Architecture

## Purpose

NIMO must ask users directly before using personal data for persistent memory or for generalized learning/model-improvement purposes. Consent must be explicit, understandable, purpose-specific, revocable, and auditable.

## 1. Separate the three data planes

### A. Encrypted Personal Vault
Contains user-specific data needed for continuity and personalization:
- conversations
- preferences
- task history
- permitted file metadata
- permitted screen/voice context
- user-created memories

This data is encrypted at rest and in transit. Encryption keys are managed outside NIMO-KNOWLEDGE. NIMO-KNOWLEDGE must never contain encryption keys, plaintext private data, passwords, tokens, or raw conversations.

### B. NIMO-KNOWLEDGE
Contains only sanitized, minimized, evaluated and approved reusable knowledge. It is not a personal database and must not become a raw telemetry dump.

### C. Learning / Model-Improvement Dataset
A separate controlled pipeline may produce anonymized learning records from consented data. A learning proposal is not automatically training data. It must pass consent verification, sanitization, minimization, evaluation and approval.

## 2. Explicit consent UX

When access is requested, NIMO should display:
- exactly which data categories are requested
- the purpose
- where the data will be stored
- whether it is used for personal memory or generalized learning
- retention period
- whether third parties receive it
- how to revoke access

Do not bundle unrelated purposes into one vague consent action.

Example:

> NIMO wants permission to save your preferences for personal memory.
> Data: preferences and task history.
> Purpose: personalize future responses.
> Storage: encrypted Personal Vault.
> Model training: No.
> Retention: until you revoke it.
>
> [Allow] [Don't Allow] [Customize]

Learning consent must be a separate decision:

> NIMO can use sanitized, anonymized patterns from your interactions to improve general NIMO knowledge.
> Your raw private conversation will not be placed in NIMO-KNOWLEDGE.
>
> [Allow Learning] [No Thanks] [Review Data]

## 3. Revocation

A user can revoke a previously granted purpose. New collection must stop after revocation. Existing personal memory must become eligible for deletion according to the retention/deletion workflow. Learning records that have already been irreversibly aggregated cannot always be individually extracted; the UI and policy must explain this before consent is granted.

## 4. Learning pipeline

```
User interaction
      |
      v
Consent check
      |
      +---- denied ----> discard learning candidate
      |
      v
Encrypted private staging
      |
      v
Secret + PII sanitization
      |
      v
Minimization / anonymization
      |
      v
Learning proposal
      |
      v
Evaluation
      |
      +---- rejected ---> quarantine/audit
      |
      v
Human/authorized approval
      |
      v
NIMO-KNOWLEDGE
      |
      v
NIMO-CORE runtime index
```

No unapproved proposal may become active knowledge.

## 5. Encryption boundary

NIMO-KNOWLEDGE stores only opaque references such as `ciphertextReference` and `keyReference`. It never stores the encryption key itself.

Recommended boundary:

```
NIMO-AGENT
   |
   | encrypted transport
   v
NIMO-CORE
   |
   +----> Personal Vault / KMS
   |
   +----> sanitized Learning Pipeline
                    |
                    v
              NIMO-KNOWLEDGE
```

NIMO-AGENT must not receive master encryption keys merely to perform ordinary memory operations.

## 6. Training is not automatic

A consented interaction does not automatically mean that the foundation model is trained on it.

NIMO distinguishes:
1. personal memory,
2. retrieval knowledge,
3. generalized learning records,
4. evaluated training datasets,
5. model training/fine-tuning.

Each stage has its own consent and governance boundary.

## 7. Audit requirements

Every consent decision should produce an auditable record containing:
- purpose
- decision
- data categories
- policy version
- timestamp
- retention choice
- consent identifier

Do not store the user's private content inside the consent record.

## 8. Security invariants

The following are hard requirements:
- no plaintext personal data in NIMO-KNOWLEDGE
- no secrets or encryption keys in Git
- no hidden learning opt-in
- no automatic promotion of raw observations to active knowledge
- no silent expansion of an existing consent to a new purpose
- no model-training use without the applicable consent
- revocation must stop future collection for that purpose
- personal data and generalized knowledge remain separate

## 9. Implementation ownership

- NIMO-AGENT: user-facing consent prompts and local permission enforcement.
- NIMO-CORE: policy enforcement, routing, sanitization orchestration and audit events.
- NIMO-KNOWLEDGE: schemas, governance, evaluated proposals and approved reusable knowledge.
- Encrypted Vault/KMS: ciphertext and key-management boundary.
- Training pipeline: dataset preparation, evaluation and model-training controls.
