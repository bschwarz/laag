# laag Skills

Reusable AI skills for working with the laag library. These follow the [Agent Skills open standard](https://docs.claude.com/en/docs/claude-code/skills) and work with Claude Code, Kiro, and other tools that support the standard.

## Available Skills

| Skill | Description |
|---|---|
| [openapi](./openapi/SKILL.md) | Reading, writing, and querying OpenAPI documents with `@laag/openapi` |
| [smithy](./smithy/SKILL.md) | Parsing and manipulating AWS Smithy models with `@laag/smithy` |
| [code-generation](./code-generation/SKILL.md) | Generating Python, JavaScript, TypeScript code and curl commands from specs |
| [validation](./validation/SKILL.md) | Validating OpenAPI and Smithy documents and handling errors |

## Installation

Copy the skill directories you want into your project's `.claude/skills/` folder (Claude Code) or `.kiro/skills/` folder (Kiro):

```bash
# Claude Code
cp -r docs/skills/openapi ~/.claude/skills/
cp -r docs/skills/smithy ~/.claude/skills/

# Kiro
cp -r docs/skills/openapi .kiro/skills/
cp -r docs/skills/smithy .kiro/skills/
```

Or copy directly from GitHub into your own project:

```bash
# Claude Code — single skill
curl -o ~/.claude/skills/openapi/SKILL.md --create-dirs \
  https://raw.githubusercontent.com/bschwarz/laag/main/docs/skills/openapi/SKILL.md
```

## Usage

Once installed, skills load automatically when relevant, or invoke them directly:

```
/openapi
/smithy
/code-generation
/validation
```
