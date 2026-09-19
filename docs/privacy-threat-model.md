# NIMO Privacy Threat Model

## Assets
- Personal conversations
- User preferences and memories
- Files and metadata
- Voice/screen context
- Consent records
- Encryption key references
- Learning proposals

## Threats and required controls

| Threat | Required control |
|---|---|
| Raw PII reaches knowledge repo | Sanitization gate + schema validation + secret scanning |
| API key/secret leakage | Secret scanner + zero-secrets policy |
| Unauthorized memory access | Permission gate + authenticated vault access |
| Purpose creep | Purpose-specific consent records |
| Hidden learning | Explicit learning consent UI |
| Consent bypass | Core-side policy enforcement |
| Stolen ciphertext | Strong encryption at rest + external key management |
| Key leakage | Keys never stored in Git or knowledge records |
| Unapproved learning becomes active | Evaluation + approval state machine |
| Excessive retention | User-selected retention + deletion workflow |
| Cross-user data leakage | Per-user isolation and authorization checks |
| Tampering | Audit logs + versioned governance records |

## Security invariant

The LLM must never be treated as the authority deciding whether data access is permitted. The permission/policy layer makes that decision before the tool or storage operation occurs.
