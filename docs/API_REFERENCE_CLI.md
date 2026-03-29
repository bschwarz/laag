# CLI API Reference

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Installation](#installation)
- [Command Syntax](#command-syntax)
- [Commands](#commands)
  - [analyze (default)](#analyze-default)
- [Options and Flags](#options-and-flags)
- [Exit Codes](#exit-codes)
- [Error Handling](#error-handling)
- [Output Format](#output-format)
- [Environment Variables](#environment-variables)

## Overview

The `@laag/cli` package provides a command-line interface for analyzing and inspecting OpenAPI/Swagger documents. Built on top of the `@laag/openapi` library, it offers a simple way to quickly view API structure and endpoints from the terminal.

**Package Name**: `@laag/cli`  
**Version**: 2.0.0  
**Binary Name**: `laag`  
**Node.js Requirement**: >= 18.0.0

## Architecture

### CLI Structure

The CLI is implemented as a single executable Node.js script (`laag-cli.js`) that:

1. Parses command-line arguments
2. Reads and validates the OpenAPI document file
3. Uses the `@laag/openapi` library to parse the document
4. Formats and displays the API information
5. Exits with appropriate status codes

### Dependencies

- **@laag/openapi**: Core OpenAPI parsing and manipulation library
- **js-yaml**: YAML file parsing support
- **Node.js fs module**: File system operations

### Module System

The CLI uses ES modules (`type: "module"` in package.json) and requires Node.js 18.0.0 or higher.

## Installation

### Global Installation

Install the CLI globally to use the `laag` command from anywhere:

```bash
npm install -g @laag/cli
```

After global installation:

```bash
laag api.yaml
```

### Local Installation

Install as a project dependency:

```bash
npm install @laag/cli
```

Run using npx:

```bash
npx @laag/cli api.yaml
```

### Using with Bun

```bash
bun install -g @laag/cli
laag api.yaml
```

### Using with Yarn

```bash
yarn global add @laag/cli
laag api.yaml
```

## Command Syntax

```
laag [options] <openapi-file>
```

**Arguments:**

- `<openapi-file>`: Path to OpenAPI/Swagger document (YAML or JSON format)

**Options:**

- `--help`, `-h`: Display help information
- `--version`, `-v`: Display version information

## Commands

### analyze (default)

The default command analyzes an OpenAPI document and displays its structure.

**Syntax:**

```bash
laag <openapi-file>
```

**Description:**

Reads an OpenAPI/Swagger document from the specified file path, parses it, and displays:

- API title and version
- All defined paths (endpoints)
- HTTP methods for each path
- Operation IDs and descriptions

**Parameters:**

| Parameter        | Type   | Required | Description                                          |
| ---------------- | ------ | -------- | ---------------------------------------------------- |
| `<openapi-file>` | string | Yes      | Path to OpenAPI document file (relative or absolute) |

**Supported File Formats:**

- YAML files (`.yaml`, `.yml`)
- JSON files (`.json`)
- OpenAPI 3.x specifications
- Swagger 2.x specifications (basic support)

**Examples:**

Analyze a YAML file:

```bash
laag api.yaml
```

Analyze a JSON file:

```bash
laag openapi.json
```

Analyze with absolute path:

```bash
laag /path/to/specs/petstore.yaml
```

Using npx (no installation):

```bash
npx @laag/cli api.yaml
```

**Output Example:**

```
Displaying API: Swagger Petstore v1.0.0
Paths defined in this API:
GET /pets - listPets
POST /pets - createPets
GET /pets/{petId} - showPetById
```

**Exit Codes:**

- `0`: Success - document analyzed successfully
- `1`: Error - file not found, invalid format, or parsing error

## Options and Flags

### --help, -h

Display help information and usage instructions.

**Syntax:**

```bash
laag --help
laag -h
```

**Output:**

```
Usage: laag <path-to-openapi-file>

Options:
  --help, -h    Show this help message
  --version, -v Show version information

Examples:
  laag api.yaml
  laag openapi.json
```

**Exit Code:** `0`

### --version, -v

Display the CLI version number.

**Syntax:**

```bash
laag --version
laag -v
```

**Output:**

```
laag CLI version 2.0.0
```

**Exit Code:** `0`

## Exit Codes

The CLI uses standard exit codes to indicate success or failure:

| Exit Code | Meaning | Description                                                  |
| --------- | ------- | ------------------------------------------------------------ |
| `0`       | Success | Command completed successfully                               |
| `1`       | Error   | General error (file not found, parsing error, invalid usage) |

### Exit Code Examples

**Success (Exit Code 0):**

```bash
laag api.yaml
echo $?  # Outputs: 0
```

**File Not Found (Exit Code 1):**

```bash
laag nonexistent.yaml
echo $?  # Outputs: 1
```

**Invalid Usage (Exit Code 1):**

```bash
laag
echo $?  # Outputs: 1
```

## Error Handling

The CLI provides clear error messages for common issues:

### File Not Found

**Error:**

```bash
$ laag nonexistent.yaml
Error: File 'nonexistent.yaml' not found.
```

**Exit Code:** `1`

**Solution:** Verify the file path is correct and the file exists.

### No File Provided

**Error:**

```bash
$ laag
Usage: laag <path-to-openapi-file>

Options:
  --help, -h    Show this help message
  --version, -v Show version information

Examples:
  laag api.yaml
  laag openapi.json
```

**Exit Code:** `0` (displays help)

**Solution:** Provide a file path as an argument.

### Multiple Files Provided

**Error:**

```bash
$ laag file1.yaml file2.yaml
Error: Please provide exactly one OpenAPI file path.
Usage: laag <path-to-openapi-file>
Use --help for more information.
```

**Exit Code:** `1`

**Solution:** Provide only one file path. The CLI does not support batch processing.

### Invalid YAML/JSON

**Error:**

```bash
$ laag invalid.yaml
YAMLException: bad indentation of a mapping entry at line 3, column 1:
    paths:
    ^
```

**Exit Code:** Non-zero (error from js-yaml parser)

**Solution:** Validate your YAML/JSON syntax. Use a linter or validator to check the file format.

### Invalid OpenAPI Document

If the file is valid YAML/JSON but not a valid OpenAPI document, the `@laag/openapi` library may throw errors during parsing.

**Solution:** Ensure your document conforms to the OpenAPI specification.

## Output Format

### Standard Output

The CLI writes analysis results to standard output (stdout):

```
Displaying API: <API Title> v<API Version>
Paths defined in this API:
<METHOD> <PATH> - <OPERATION_ID_OR_DESCRIPTION>
<METHOD> <PATH> - <OPERATION_ID_OR_DESCRIPTION>
...
```

### Output Components

1. **Header Line**: `Displaying API: {title} v{version}`
   - Extracted from `info.title` and `info.version`

2. **Paths Section**: `Paths defined in this API:`
   - Lists all paths with their HTTP methods

3. **Operation Lines**: `{METHOD} {PATH} - {DESCRIPTION}`
   - `METHOD`: HTTP method in uppercase (GET, POST, PUT, DELETE, etc.)
   - `PATH`: API endpoint path
   - `DESCRIPTION`: Operation summary or operation ID

### Fallback Behavior

If no operations are found with operation IDs, the CLI falls back to displaying just the path names:

```
Displaying API: My API v1.0.0
Paths defined in this API:
  /users
  /users/{id}
  /products
```

### Redirecting Output

Redirect output to a file:

```bash
laag api.yaml > analysis.txt
```

Pipe output to other commands:

```bash
laag api.yaml | grep "GET"
```

## Environment Variables

The CLI does not currently use environment variables for configuration. All behavior is controlled through command-line arguments.

### Future Environment Variables

Potential future environment variables (not currently implemented):

- `LAAG_OUTPUT_FORMAT`: Control output format (text, json, yaml)
- `LAAG_COLOR`: Enable/disable colored output
- `LAAG_VERBOSE`: Enable verbose logging

## Implementation Details

### File Reading

The CLI uses Node.js `fs.readFileSync()` to read files synchronously:

```javascript
const content = fs.readFileSync(filename, 'utf8');
```

### YAML Parsing

YAML files are parsed using the `js-yaml` library:

```javascript
import yaml from 'js-yaml';
const jsonObj = yaml.load(fs.readFileSync(fname, 'utf8'));
```

### OpenAPI Processing

The parsed document is passed to the `@laag/openapi` library:

```javascript
import { Openapi } from '@laag/openapi';
const doc = new Openapi(jsonObj);
```

### Operation Extraction

Operations are extracted using the `getOperationIds()` method:

```javascript
const operations = doc.getOperationIds();
for (const op of operations) {
  const summary = doc.getOperationDescription(op.path, op.method) || op.id;
  console.log(`${op.method.toUpperCase()} ${op.path} - ${summary}`);
}
```

## Related Documentation

- [CLI Usage Guide](./CLI_GUIDE.md) - Practical usage examples and workflows
- [OpenAPI API Reference](./API_REFERENCE_OPENAPI.md) - Underlying library documentation
- [Core API Reference](./API_REFERENCE_CORE.md) - Shared functionality

## Notes

- The CLI is designed for quick inspection and analysis, not for document transformation or generation
- For advanced features like sample generation, code generation, or document modification, use the `@laag/openapi` library programmatically
- The CLI currently supports only OpenAPI/Swagger documents; RAML and Smithy support may be added in future versions
- The CLI processes one document at a time; batch processing is not supported
