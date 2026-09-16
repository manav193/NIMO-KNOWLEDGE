# Project Contract: NIMO Assistant

> **Status**: Future Integration Specification

NIMO Assistant is the voice-enabled and OS-level task automation companion.

## Future Interactions
- **Consumes**: OS-specific execution playbooks from `knowledge/windows/` and `knowledge/macos/`.
- **Emits**:
  - Tool execution failure modes (`issue-pattern.schema.json`)
  - Environment-specific timeout and permission issues
  - Local automation workflow optimizations (`suggestion.schema.json`)
