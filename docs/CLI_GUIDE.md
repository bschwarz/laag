# CLI Usage Guide

## Table of Contents

- [Introduction](#introduction)
- [Installation and Setup](#installation-and-setup)
- [Basic Usage](#basic-usage)
- [Commands](#commands)
- [Common Workflows](#common-workflows)
- [CI/CD Integration](#cicd-integration)
- [Output Parsing](#output-parsing)
- [Troubleshooting](#troubleshooting)
- [Advanced Usage](#advanced-usage)

## Introduction

The `@laag/cli` command-line tool provides a quick and easy way to analyze OpenAPI/Swagger documents directly from your terminal. Whether you're validating API specifications, exploring third-party APIs, or integrating API analysis into your development workflow, the laag CLI offers a simple interface for inspecting API structure and endpoints.

### What Can You Do with the CLI?

- **Quick API Inspection**: View API title, version, and all available endpoints
- **Endpoint Discovery**: List all paths with their HTTP methods and operation IDs
- **Format Support**: Work with both YAML and JSON OpenAPI documents
- **CI/CD Integration**: Validate and analyze APIs as part of your build pipeline
- **No Installation Required**: Use with npx for one-off analysis

### Who Is This Guide For?

This guide is for developers, API designers, and DevOps engineers who want to:

- Quickly inspect OpenAPI documents without opening an editor
- Integrate API analysis into scripts and automation
- Validate API specifications in CI/CD pipelines
- Explore and understand API structure from the command line

### Prerequisites

- Node.js 18.0.0 or higher
- Basic familiarity with command-line interfaces
- OpenAPI/Swagger specification files (YAML or JSON)

## Installation and Setup

### Global Installation

Install the CLI globally to use the `laag` command from anywhere on your system:

**Using npm:**

```bash
npm install -g @laag/cli
```

**Using Yarn:**

```bash
yarn global add @laag/cli
```

**Using Bun:**

```bash
bun install -g @laag/cli
```

After global installation, verify it works:

```bash
laag --version
```

Expected output:

```
laag CLI version 2.0.0
```

### Local Installation

Install as a project dependency for use within a specific project:

**Using npm:**

```bash
npm install @laag/cli
```

**Using Yarn:**

```bash
yarn add @laag/cli
```

**Using Bun:**

```bash
bun add @laag/cli
```

After local installation, run using npx:

```bash
npx @laag/cli api.yaml
```

Or add a script to your `package.json`:

```json
{
  "scripts": {
    "analyze-api": "laag api.yaml"
  }
}
```

Then run:

```bash
npm run analyze-api
```

### Using Without Installation (npx)

You can use the CLI without installing it by using npx:

```bash
npx @laag/cli api.yaml
```

This is perfect for:

- One-off analysis tasks
- Trying the CLI before installing
- CI/CD environments where you don't want to persist installations

### Verifying Installation

After installation, verify the CLI is working correctly:

**Check version:**

```bash
laag --version
```

**Display help:**

```bash
laag --help
```

**Analyze a sample file:**

```bash
# Create a simple OpenAPI file
cat > test-api.yaml << EOF
openapi: 3.0.2
info:
  title: Test API
  version: 1.0.0
paths:
  /test:
    get:
      summary: Test endpoint
      operationId: testGet
      responses:
        '200':
          description: Success
EOF

# Analyze it
laag test-api.yaml
```

Expected output:

```
Displaying API: Test API v1.0.0
Paths defined in this API:
GET /test - Test endpoint
```

### System Requirements

- **Node.js**: Version 18.0.0 or higher
- **Operating Systems**: macOS, Linux, Windows
- **Disk Space**: Minimal (< 5 MB including dependencies)

### Checking Node.js Version

Verify your Node.js version meets the requirement:

```bash
node --version
```

If you need to upgrade Node.js:

- Visit [nodejs.org](https://nodejs.org/) for official installers
- Use [nvm](https://github.com/nvm-sh/nvm) for version management
- Use [fnm](https://github.com/Schniz/fnm) for fast Node.js version management

### Troubleshooting Installation

**Permission Errors (Global Installation):**

If you encounter permission errors during global installation:

```bash
# On macOS/Linux, use sudo (not recommended)
sudo npm install -g @laag/cli

# Better: Configure npm to use a different directory
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
npm install -g @laag/cli
```

**Command Not Found After Installation:**

If `laag` command is not found after global installation:

1. Check if the global bin directory is in your PATH:

   ```bash
   npm config get prefix
   ```

2. Add the bin directory to your PATH:

   ```bash
   # For npm
   export PATH="$(npm config get prefix)/bin:$PATH"

   # For Yarn
   export PATH="$(yarn global bin):$PATH"
   ```

3. Restart your terminal or reload your shell configuration

**Module Resolution Errors:**

If you see module resolution errors:

```bash
# Clear npm cache
npm cache clean --force

# Reinstall
npm install -g @laag/cli
```

### Updating the CLI

Keep the CLI up to date to get the latest features and bug fixes:

**Global installation:**

```bash
npm update -g @laag/cli
```

**Local installation:**

```bash
npm update @laag/cli
```

**Check for updates:**

```bash
npm outdated -g @laag/cli
```

### Uninstalling

**Global installation:**

```bash
npm uninstall -g @laag/cli
```

**Local installation:**

```bash
npm uninstall @laag/cli
```

## Basic Usage

### Your First Command

The simplest way to use the CLI is to analyze an OpenAPI file:

```bash
laag api.yaml
```

This command:

1. Reads the `api.yaml` file
2. Parses the OpenAPI document
3. Displays the API title, version, and all endpoints

### Understanding the Output

When you run the CLI, you'll see output like this:

```
Displaying API: Swagger Petstore v1.0.0
Paths defined in this API:
GET /pets - listPets
POST /pets - createPets
GET /pets/{petId} - showPetById
```

**Output breakdown:**

- **Line 1**: API title and version from the `info` section
- **Line 2**: Header for the paths section
- **Lines 3+**: Each endpoint with:
  - HTTP method (GET, POST, PUT, DELETE, etc.)
  - Path (e.g., `/pets`, `/pets/{petId}`)
  - Operation description or operation ID

### Working with Different File Formats

The CLI supports both YAML and JSON formats:

**YAML files:**

```bash
laag api.yaml
laag openapi.yml
```

**JSON files:**

```bash
laag api.json
laag swagger.json
```

The CLI automatically detects the format based on the file content, not the extension.

### Using Relative and Absolute Paths

**Relative paths:**

```bash
# Current directory
laag api.yaml

# Subdirectory
laag specs/api.yaml

# Parent directory
laag ../api.yaml
```

**Absolute paths:**

```bash
laag /home/user/projects/api/openapi.yaml
laag /Users/username/Documents/specs/api.yaml
```

### Getting Help

Display help information anytime:

```bash
laag --help
laag -h
```

### Checking Version

Display the CLI version:

```bash
laag --version
laag -v
```

### Quick Examples

**Analyze a local file:**

```bash
laag petstore.yaml
```

**Analyze a file in a subdirectory:**

```bash
laag specs/user-api.yaml
```

**Use without installation:**

```bash
npx @laag/cli api.yaml
```

**Redirect output to a file:**

```bash
laag api.yaml > analysis.txt
```

**Search for specific endpoints:**

```bash
laag api.yaml | grep "GET"
laag api.yaml | grep "/users"
```

**Count endpoints:**

```bash
laag api.yaml | grep -c "GET"
```

## Commands

### analyze (Default Command)

The `analyze` command is the default command that runs when you provide a file path. It analyzes an OpenAPI document and displays its structure.

#### Syntax

```bash
laag <openapi-file>
```

#### Description

Reads and parses an OpenAPI/Swagger document, then displays:

- API title and version
- All defined paths (endpoints)
- HTTP methods for each endpoint
- Operation IDs or descriptions

#### Arguments

| Argument         | Type   | Required | Description                             |
| ---------------- | ------ | -------- | --------------------------------------- |
| `<openapi-file>` | string | Yes      | Path to OpenAPI document (YAML or JSON) |

#### Examples

**Basic analysis:**

```bash
laag api.yaml
```

Output:

```
Displaying API: My API v1.0.0
Paths defined in this API:
GET /users - List all users
POST /users - Create a new user
GET /users/{id} - Get user by ID
PUT /users/{id} - Update user
DELETE /users/{id} - Delete user
```

**Analyze a JSON file:**

```bash
laag openapi.json
```

**Analyze with absolute path:**

```bash
laag /path/to/specs/petstore.yaml
```

**Using npx:**

```bash
npx @laag/cli api.yaml
```

#### Supported File Formats

- **YAML**: `.yaml`, `.yml` extensions
- **JSON**: `.json` extension
- **OpenAPI 3.x**: Full support for OpenAPI 3.0, 3.1
- **Swagger 2.x**: Basic support for Swagger 2.0

#### Output Format

The command outputs information in the following format:

```
Displaying API: {title} v{version}
Paths defined in this API:
{METHOD} {PATH} - {DESCRIPTION}
{METHOD} {PATH} - {DESCRIPTION}
...
```

**Components:**

- `{title}`: From `info.title` in the OpenAPI document
- `{version}`: From `info.version` in the OpenAPI document
- `{METHOD}`: HTTP method in uppercase (GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD, TRACE)
- `{PATH}`: API endpoint path (e.g., `/users`, `/users/{id}`)
- `{DESCRIPTION}`: Operation summary or operation ID

#### Exit Codes

- `0`: Success - document analyzed successfully
- `1`: Error - file not found, invalid format, or parsing error

#### Error Scenarios

**File not found:**

```bash
$ laag nonexistent.yaml
Error: File 'nonexistent.yaml' not found.
```

**Invalid YAML syntax:**

```bash
$ laag invalid.yaml
YAMLException: bad indentation of a mapping entry at line 3, column 1:
    paths:
    ^
```

**Invalid JSON syntax:**

```bash
$ laag invalid.json
SyntaxError: Unexpected token } in JSON at position 42
```

### --help, -h

Display help information and usage instructions.

#### Syntax

```bash
laag --help
laag -h
```

#### Description

Shows the help message with command syntax, available options, and usage examples.

#### Output

```
Usage: laag <path-to-openapi-file>

Options:
  --help, -h    Show this help message
  --version, -v Show version information

Examples:
  laag api.yaml
  laag openapi.json
```

#### Exit Code

`0` - Always exits successfully

#### Examples

```bash
# Display help
laag --help

# Short form
laag -h

# Help takes precedence over file argument
laag --help api.yaml  # Shows help, doesn't analyze file
```

### --version, -v

Display the CLI version number.

#### Syntax

```bash
laag --version
laag -v
```

#### Description

Shows the current version of the `@laag/cli` package.

#### Output

```
laag CLI version 2.0.0
```

#### Exit Code

`0` - Always exits successfully

#### Examples

```bash
# Display version
laag --version

# Short form
laag -v

# Version takes precedence over file argument
laag --version api.yaml  # Shows version, doesn't analyze file
```

### Command Precedence

When multiple options are provided, they are processed in this order:

1. `--help` / `-h` - Shows help and exits
2. `--version` / `-v` - Shows version and exits
3. File analysis - Analyzes the provided file

**Examples:**

```bash
# Help takes precedence
laag --help --version  # Shows help only

# Version is checked after help
laag --version api.yaml  # Shows version only

# File analysis happens when no flags are present
laag api.yaml  # Analyzes the file
```

### Real-World Examples

#### Example 1: Analyze a Petstore API

**File: petstore.yaml**

```yaml
openapi: 3.0.2
info:
  title: Swagger Petstore
  version: 1.0.0
paths:
  /pets:
    get:
      summary: List all pets
      operationId: listPets
      responses:
        '200':
          description: Success
    post:
      summary: Create a pet
      operationId: createPets
      responses:
        '201':
          description: Created
  /pets/{petId}:
    get:
      summary: Info for a specific pet
      operationId: showPetById
      responses:
        '200':
          description: Success
```

**Command:**

```bash
laag petstore.yaml
```

**Output:**

```
Displaying API: Swagger Petstore v1.0.0
Paths defined in this API:
GET /pets - List all pets
POST /pets - Create a pet
GET /pets/{petId} - Info for a specific pet
```

#### Example 2: Analyze a User Management API

**File: user-api.json**

```json
{
  "openapi": "3.0.2",
  "info": {
    "title": "User Management API",
    "version": "2.1.0"
  },
  "paths": {
    "/users": {
      "get": {
        "operationId": "getUsers",
        "summary": "Get all users",
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      },
      "post": {
        "operationId": "createUser",
        "summary": "Create a new user",
        "responses": {
          "201": {
            "description": "Created"
          }
        }
      }
    },
    "/users/{userId}": {
      "get": {
        "operationId": "getUserById",
        "summary": "Get user by ID",
        "responses": {
          "200": {
            "description": "Success"
          }
        }
      },
      "put": {
        "operationId": "updateUser",
        "summary": "Update user",
        "responses": {
          "200": {
            "description": "Updated"
          }
        }
      },
      "delete": {
        "operationId": "deleteUser",
        "summary": "Delete user",
        "responses": {
          "204": {
            "description": "Deleted"
          }
        }
      }
    }
  }
}
```

**Command:**

```bash
laag user-api.json
```

**Output:**

```
Displaying API: User Management API v2.1.0
Paths defined in this API:
GET /users - Get all users
POST /users - Create a new user
GET /users/{userId} - Get user by ID
PUT /users/{userId} - Update user
DELETE /users/{userId} - Delete user
```

#### Example 3: Analyze an API with Multiple Resources

**Command:**

```bash
laag ecommerce-api.yaml
```

**Output:**

```
Displaying API: E-Commerce API v3.0.0
Paths defined in this API:
GET /products - List products
POST /products - Create product
GET /products/{id} - Get product
PUT /products/{id} - Update product
DELETE /products/{id} - Delete product
GET /orders - List orders
POST /orders - Create order
GET /orders/{id} - Get order
PUT /orders/{id} - Update order
GET /customers - List customers
POST /customers - Create customer
GET /customers/{id} - Get customer
```

### Command Options Summary

| Option      | Short | Description          | Exit Code |
| ----------- | ----- | -------------------- | --------- |
| `<file>`    | -     | Analyze OpenAPI file | 0 or 1    |
| `--help`    | `-h`  | Show help message    | 0         |
| `--version` | `-v`  | Show version         | 0         |

### Tips for Using Commands

1. **Always provide the full file path** if the file is not in the current directory
2. **Use quotes for paths with spaces**: `laag "my api.yaml"`
3. **Check the exit code** in scripts to detect errors: `laag api.yaml && echo "Success"`
4. **Redirect output** to save analysis results: `laag api.yaml > results.txt`
5. **Pipe output** to other commands for filtering: `laag api.yaml | grep "POST"`

## Common Workflows

### Workflow 1: Quick API Inspection

Use the CLI to quickly inspect an API specification before working with it.

**Scenario:** You've received an OpenAPI file and want to understand its structure.

**Steps:**

```bash
# 1. Analyze the API
laag api.yaml

# 2. Save the output for reference
laag api.yaml > api-structure.txt

# 3. Review the saved output
cat api-structure.txt
```

**Use Case:** Understanding third-party APIs, reviewing API changes, or getting familiar with a new API.

### Workflow 2: Filtering Endpoints

Extract specific endpoints or HTTP methods from an API.

**Scenario:** You want to see only GET endpoints or endpoints for a specific resource.

**Find all GET endpoints:**

```bash
laag api.yaml | grep "GET"
```

**Find all endpoints for a specific path:**

```bash
laag api.yaml | grep "/users"
```

**Find all POST and PUT endpoints:**

```bash
laag api.yaml | grep -E "POST|PUT"
```

**Count endpoints by method:**

```bash
# Count GET endpoints
laag api.yaml | grep -c "GET"

# Count all endpoints
laag api.yaml | tail -n +3 | wc -l
```

**Use Case:** API auditing, endpoint discovery, documentation generation.

### Workflow 3: Comparing API Versions

Compare two versions of an API to see what changed.

**Scenario:** You have two versions of an API and want to see the differences.

**Steps:**

```bash
# 1. Analyze both versions
laag api-v1.yaml > v1-structure.txt
laag api-v2.yaml > v2-structure.txt

# 2. Compare the outputs
diff v1-structure.txt v2-structure.txt

# 3. Or use a more readable diff
diff -u v1-structure.txt v2-structure.txt

# 4. Show only added endpoints
diff v1-structure.txt v2-structure.txt | grep "^+"

# 5. Show only removed endpoints
diff v1-structure.txt v2-structure.txt | grep "^-"
```

**Use Case:** API versioning, change tracking, migration planning.

### Workflow 4: Batch Analysis

Analyze multiple API files in a directory.

**Scenario:** You have multiple API specifications and want to analyze them all.

**Analyze all YAML files:**

```bash
for file in *.yaml; do
  echo "=== Analyzing $file ==="
  laag "$file"
  echo ""
done
```

**Analyze and save results:**

```bash
for file in specs/*.yaml; do
  basename="${file##*/}"
  laag "$file" > "analysis-${basename%.yaml}.txt"
done
```

**Create a summary report:**

```bash
#!/bin/bash
echo "API Analysis Summary" > summary.txt
echo "===================" >> summary.txt
echo "" >> summary.txt

for file in specs/*.yaml; do
  echo "File: $file" >> summary.txt
  laag "$file" | head -n 1 >> summary.txt
  endpoint_count=$(laag "$file" | tail -n +3 | wc -l)
  echo "Endpoints: $endpoint_count" >> summary.txt
  echo "" >> summary.txt
done

cat summary.txt
```

**Use Case:** Multi-API projects, API inventory, documentation generation.

### Workflow 5: Pre-Commit Validation

Validate API specifications before committing changes.

**Scenario:** Ensure API files are valid before committing to version control.

**Create a pre-commit script:**

```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "Validating OpenAPI specifications..."

# Find all changed YAML files in specs directory
changed_files=$(git diff --cached --name-only --diff-filter=ACM | grep "specs/.*\.yaml$")

if [ -z "$changed_files" ]; then
  echo "No OpenAPI files to validate."
  exit 0
fi

# Validate each file
for file in $changed_files; do
  echo "Validating $file..."
  if ! laag "$file" > /dev/null 2>&1; then
    echo "❌ Error: $file is not a valid OpenAPI document"
    exit 1
  fi
  echo "✅ $file is valid"
done

echo "All OpenAPI files are valid!"
exit 0
```

**Make it executable:**

```bash
chmod +x .git/hooks/pre-commit
```

**Use Case:** Quality assurance, preventing invalid specs from being committed.

### Workflow 6: API Documentation Generation

Generate simple documentation from OpenAPI files.

**Scenario:** Create a quick reference document for your API.

**Generate markdown documentation:**

```bash
#!/bin/bash
# generate-docs.sh

API_FILE="$1"
OUTPUT_FILE="${2:-api-docs.md}"

# Extract API info
API_INFO=$(laag "$API_FILE" | head -n 1)

# Create markdown document
cat > "$OUTPUT_FILE" << EOF
# API Documentation

## Overview

$API_INFO

## Endpoints

\`\`\`
$(laag "$API_FILE" | tail -n +2)
\`\`\`

## Generated

Generated on $(date) using @laag/cli
EOF

echo "Documentation generated: $OUTPUT_FILE"
```

**Usage:**

```bash
chmod +x generate-docs.sh
./generate-docs.sh api.yaml docs/api-reference.md
```

**Use Case:** Quick documentation, README generation, API catalogs.

### Workflow 7: Endpoint Discovery for Testing

Identify endpoints that need test coverage.

**Scenario:** You want to ensure all endpoints have tests.

**Extract endpoints to a checklist:**

```bash
#!/bin/bash
# create-test-checklist.sh

API_FILE="$1"

echo "# Test Coverage Checklist" > test-checklist.md
echo "" >> test-checklist.md
echo "Generated from: $API_FILE" >> test-checklist.md
echo "" >> test-checklist.md

laag "$API_FILE" | tail -n +3 | while read -r line; do
  echo "- [ ] $line" >> test-checklist.md
done

echo "Test checklist created: test-checklist.md"
```

**Usage:**

```bash
chmod +x create-test-checklist.sh
./create-test-checklist.sh api.yaml
```

**Output (test-checklist.md):**

```markdown
# Test Coverage Checklist

Generated from: api.yaml

- [ ] GET /users - List all users
- [ ] POST /users - Create a new user
- [ ] GET /users/{id} - Get user by ID
- [ ] PUT /users/{id} - Update user
- [ ] DELETE /users/{id} - Delete user
```

**Use Case:** Test planning, coverage tracking, QA workflows.

### Workflow 8: API Change Notifications

Monitor API changes and send notifications.

**Scenario:** Automatically detect when an API specification changes.

**Create a monitoring script:**

```bash
#!/bin/bash
# monitor-api.sh

API_FILE="$1"
SNAPSHOT_FILE=".api-snapshot.txt"

# Generate current snapshot
laag "$API_FILE" > /tmp/current-snapshot.txt

# Check if snapshot exists
if [ ! -f "$SNAPSHOT_FILE" ]; then
  echo "Creating initial snapshot..."
  cp /tmp/current-snapshot.txt "$SNAPSHOT_FILE"
  exit 0
fi

# Compare snapshots
if ! diff -q "$SNAPSHOT_FILE" /tmp/current-snapshot.txt > /dev/null; then
  echo "⚠️  API changes detected!"
  echo ""
  echo "Changes:"
  diff -u "$SNAPSHOT_FILE" /tmp/current-snapshot.txt

  # Update snapshot
  cp /tmp/current-snapshot.txt "$SNAPSHOT_FILE"

  # Send notification (example with email)
  # echo "API changes detected" | mail -s "API Update Alert" team@example.com

  exit 1
else
  echo "✅ No API changes detected"
  exit 0
fi
```

**Usage:**

```bash
chmod +x monitor-api.sh

# Run manually
./monitor-api.sh api.yaml

# Or add to cron for periodic checks
# crontab -e
# 0 * * * * /path/to/monitor-api.sh /path/to/api.yaml
```

**Use Case:** Change detection, automated alerts, API governance.

### Workflow 9: Chaining with Other Tools

Combine the CLI with other tools for advanced workflows.

**With jq (for JSON processing):**

```bash
# Convert YAML to JSON first, then process
laag api.yaml > structure.txt

# Or use the @laag/openapi library programmatically for JSON output
```

**With awk (for custom formatting):**

```bash
# Extract only paths
laag api.yaml | tail -n +3 | awk '{print $2}'

# Extract only methods
laag api.yaml | tail -n +3 | awk '{print $1}'

# Create a CSV
laag api.yaml | tail -n +3 | awk '{print $1","$2","$4}' > endpoints.csv
```

**With sed (for text transformation):**

```bash
# Convert to uppercase
laag api.yaml | sed 's/.*/\U&/'

# Remove operation IDs
laag api.yaml | sed 's/ - .*//'
```

**With curl (for remote files):**

```bash
# Download and analyze
curl -s https://example.com/api.yaml | laag /dev/stdin
```

**Use Case:** Custom reporting, data transformation, integration with existing tools.

### Workflow 10: Development Workflow Integration

Integrate the CLI into your development workflow.

**In package.json scripts:**

```json
{
  "scripts": {
    "api:analyze": "laag specs/api.yaml",
    "api:validate": "laag specs/api.yaml > /dev/null && echo '✅ API is valid'",
    "api:endpoints": "laag specs/api.yaml | tail -n +3",
    "api:docs": "./scripts/generate-docs.sh specs/api.yaml",
    "precommit": "npm run api:validate"
  }
}
```

**In Makefile:**

```makefile
.PHONY: analyze validate docs

analyze:
	@laag specs/api.yaml

validate:
	@laag specs/api.yaml > /dev/null && echo "✅ API is valid" || (echo "❌ API is invalid" && exit 1)

docs:
	@laag specs/api.yaml > docs/api-structure.txt
	@echo "Documentation updated"

test: validate
	@npm test
```

**Use Case:** Standardized workflows, team collaboration, automation.

### Workflow Tips

1. **Save output for later reference**: `laag api.yaml > reference.txt`
2. **Use exit codes in scripts**: `laag api.yaml && echo "Valid" || echo "Invalid"`
3. **Combine with version control**: Track API changes over time
4. **Automate repetitive tasks**: Create shell scripts for common operations
5. **Integrate with CI/CD**: Validate APIs in your build pipeline
6. **Use with watch tools**: Monitor file changes and re-analyze automatically
7. **Create custom reports**: Parse output with awk, sed, or other text tools
8. **Document your workflows**: Share scripts with your team

## CI/CD Integration

### Overview

Integrate the laag CLI into your CI/CD pipeline to automatically validate and analyze OpenAPI specifications as part of your build process. This ensures API specifications remain valid and helps catch issues early.

### Benefits of CI/CD Integration

- **Automatic Validation**: Catch invalid API specs before they reach production
- **Change Detection**: Identify API changes in pull requests
- **Documentation Generation**: Auto-generate API documentation on every build
- **Quality Gates**: Prevent merging code with invalid API specifications
- **Consistency**: Ensure all team members work with valid specifications

### GitHub Actions

#### Basic Validation Workflow

Create `.github/workflows/validate-api.yml`:

```yaml
name: Validate OpenAPI Specifications

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  validate:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install laag CLI
        run: npm install -g @laag/cli

      - name: Validate API specifications
        run: |
          for file in specs/*.yaml; do
            echo "Validating $file..."
            laag "$file" || exit 1
          done

      - name: Success message
        run: echo "✅ All API specifications are valid!"
```

#### Advanced Workflow with Artifacts

Create `.github/workflows/api-analysis.yml`:

```yaml
name: API Analysis

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  analyze:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm install -g @laag/cli

      - name: Analyze API specifications
        run: |
          mkdir -p analysis
          for file in specs/*.yaml; do
            basename="${file##*/}"
            echo "Analyzing $file..."
            laag "$file" > "analysis/${basename%.yaml}-analysis.txt"
          done

      - name: Upload analysis results
        uses: actions/upload-artifact@v3
        with:
          name: api-analysis
          path: analysis/
          retention-days: 30

      - name: Comment on PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const analysis = fs.readFileSync('analysis/api-analysis.txt', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## API Analysis Results\n\n\`\`\`\n${analysis}\n\`\`\``
            });
```

#### Workflow with Change Detection

Create `.github/workflows/api-changes.yml`:

```yaml
name: Detect API Changes

on:
  pull_request:
    branches: [main]
    paths:
      - 'specs/**/*.yaml'
      - 'specs/**/*.json'

jobs:
  detect-changes:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout PR branch
        uses: actions/checkout@v3

      - name: Checkout base branch
        uses: actions/checkout@v3
        with:
          ref: ${{ github.base_ref }}
          path: base

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install laag CLI
        run: npm install -g @laag/cli

      - name: Analyze current API
        run: laag specs/api.yaml > current-api.txt

      - name: Analyze base API
        run: laag base/specs/api.yaml > base-api.txt

      - name: Compare APIs
        id: compare
        run: |
          if diff -u base-api.txt current-api.txt > api-diff.txt; then
            echo "No changes detected"
            echo "changed=false" >> $GITHUB_OUTPUT
          else
            echo "Changes detected"
            echo "changed=true" >> $GITHUB_OUTPUT
          fi
        continue-on-error: true

      - name: Comment on PR with changes
        if: steps.compare.outputs.changed == 'true'
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const diff = fs.readFileSync('api-diff.txt', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## 🔄 API Changes Detected\n\n\`\`\`diff\n${diff}\n\`\`\``
            });
```

### GitLab CI

#### Basic Validation Pipeline

Create `.gitlab-ci.yml`:

```yaml
stages:
  - validate
  - analyze

validate-api:
  stage: validate
  image: node:18
  before_script:
    - npm install -g @laag/cli
  script:
    - |
      for file in specs/*.yaml; do
        echo "Validating $file..."
        laag "$file" || exit 1
      done
  only:
    - merge_requests
    - main

analyze-api:
  stage: analyze
  image: node:18
  before_script:
    - npm install -g @laag/cli
  script:
    - mkdir -p analysis
    - |
      for file in specs/*.yaml; do
        basename="${file##*/}"
        laag "$file" > "analysis/${basename%.yaml}-analysis.txt"
      done
  artifacts:
    paths:
      - analysis/
    expire_in: 30 days
  only:
    - main
```

#### Advanced Pipeline with Change Detection

```yaml
stages:
  - validate
  - compare
  - report

validate-api:
  stage: validate
  image: node:18
  before_script:
    - npm install -g @laag/cli
  script:
    - laag specs/api.yaml
  only:
    - merge_requests
    - main

compare-api:
  stage: compare
  image: node:18
  before_script:
    - npm install -g @laag/cli
    - apt-get update && apt-get install -y git
  script:
    - git fetch origin main
    - laag specs/api.yaml > current-api.txt
    - git checkout origin/main -- specs/api.yaml
    - laag specs/api.yaml > base-api.txt || echo "Base API not found"
    - diff -u base-api.txt current-api.txt > api-diff.txt || true
  artifacts:
    paths:
      - api-diff.txt
    expire_in: 7 days
  only:
    - merge_requests

report-changes:
  stage: report
  image: alpine:latest
  script:
    - |
      if [ -s api-diff.txt ]; then
        echo "API changes detected:"
        cat api-diff.txt
      else
        echo "No API changes detected"
      fi
  dependencies:
    - compare-api
  only:
    - merge_requests
```

### Jenkins

#### Declarative Pipeline

Create `Jenkinsfile`:

```groovy
pipeline {
    agent any

    tools {
        nodejs 'NodeJS 18'
    }

    stages {
        stage('Install CLI') {
            steps {
                sh 'npm install -g @laag/cli'
            }
        }

        stage('Validate API') {
            steps {
                script {
                    def apiFiles = findFiles(glob: 'specs/*.yaml')
                    apiFiles.each { file ->
                        echo "Validating ${file.path}..."
                        sh "laag ${file.path}"
                    }
                }
            }
        }

        stage('Analyze API') {
            steps {
                sh '''
                    mkdir -p analysis
                    for file in specs/*.yaml; do
                        basename="${file##*/}"
                        laag "$file" > "analysis/${basename%.yaml}-analysis.txt"
                    done
                '''
            }
        }

        stage('Archive Results') {
            steps {
                archiveArtifacts artifacts: 'analysis/*.txt', fingerprint: true
            }
        }
    }

    post {
        failure {
            echo 'API validation failed!'
        }
        success {
            echo 'API validation successful!'
        }
    }
}
```

#### Pipeline with Change Detection

```groovy
pipeline {
    agent any

    tools {
        nodejs 'NodeJS 18'
    }

    stages {
        stage('Setup') {
            steps {
                sh 'npm install -g @laag/cli'
            }
        }

        stage('Analyze Current') {
            steps {
                sh 'laag specs/api.yaml > current-api.txt'
            }
        }

        stage('Compare with Main') {
            when {
                not {
                    branch 'main'
                }
            }
            steps {
                script {
                    sh '''
                        git fetch origin main
                        git show origin/main:specs/api.yaml > base-api.yaml
                        laag base-api.yaml > base-api.txt || echo "Base not found"
                        diff -u base-api.txt current-api.txt > api-diff.txt || true
                    '''

                    def diff = readFile('api-diff.txt')
                    if (diff.trim()) {
                        echo "API Changes Detected:"
                        echo diff
                    } else {
                        echo "No API changes detected"
                    }
                }
            }
        }

        stage('Archive') {
            steps {
                archiveArtifacts artifacts: '*.txt', allowEmptyArchive: true
            }
        }
    }
}
```

### CircleCI

Create `.circleci/config.yml`:

```yaml
version: 2.1

jobs:
  validate-api:
    docker:
      - image: cimg/node:18.0
    steps:
      - checkout
      - run:
          name: Install laag CLI
          command: npm install -g @laag/cli
      - run:
          name: Validate API specifications
          command: |
            for file in specs/*.yaml; do
              echo "Validating $file..."
              laag "$file" || exit 1
            done
      - run:
          name: Analyze APIs
          command: |
            mkdir -p analysis
            for file in specs/*.yaml; do
              basename="${file##*/}"
              laag "$file" > "analysis/${basename%.yaml}-analysis.txt"
            done
      - store_artifacts:
          path: analysis
          destination: api-analysis

workflows:
  version: 2
  validate-and-analyze:
    jobs:
      - validate-api:
          filters:
            branches:
              only:
                - main
                - develop
```

### Azure Pipelines

Create `azure-pipelines.yml`:

```yaml
trigger:
  - main
  - develop

pool:
  vmImage: 'ubuntu-latest'

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '18.x'
    displayName: 'Install Node.js'

  - script: |
      npm install -g @laag/cli
    displayName: 'Install laag CLI'

  - script: |
      for file in specs/*.yaml; do
        echo "Validating $file..."
        laag "$file" || exit 1
      done
    displayName: 'Validate API Specifications'

  - script: |
      mkdir -p $(Build.ArtifactStagingDirectory)/analysis
      for file in specs/*.yaml; do
        basename="${file##*/}"
        laag "$file" > "$(Build.ArtifactStagingDirectory)/analysis/${basename%.yaml}-analysis.txt"
      done
    displayName: 'Analyze APIs'

  - task: PublishBuildArtifacts@1
    inputs:
      pathToPublish: '$(Build.ArtifactStagingDirectory)/analysis'
      artifactName: 'api-analysis'
    displayName: 'Publish Analysis Results'
```

### Travis CI

Create `.travis.yml`:

```yaml
language: node_js
node_js:
  - '18'

install:
  - npm install -g @laag/cli

script:
  - |
    for file in specs/*.yaml; do
      echo "Validating $file..."
      laag "$file" || exit 1
    done

after_success:
  - mkdir -p analysis
  - |
    for file in specs/*.yaml; do
      basename="${file##*/}"
      laag "$file" > "analysis/${basename%.yaml}-analysis.txt"
    done

deploy:
  provider: releases
  api_key: $GITHUB_TOKEN
  file_glob: true
  file: analysis/*.txt
  skip_cleanup: true
  on:
    tags: true
```

### Docker Integration

#### Dockerfile for CI

Create `Dockerfile.ci`:

```dockerfile
FROM node:18-alpine

# Install laag CLI
RUN npm install -g @laag/cli

# Set working directory
WORKDIR /workspace

# Copy API specifications
COPY specs/ ./specs/

# Validate and analyze
RUN for file in specs/*.yaml; do \
      echo "Validating $file..." && \
      laag "$file" || exit 1; \
    done

# Default command
CMD ["sh", "-c", "laag specs/*.yaml"]
```

#### Docker Compose for Local CI Testing

Create `docker-compose.ci.yml`:

```yaml
version: '3.8'

services:
  api-validator:
    build:
      context: .
      dockerfile: Dockerfile.ci
    volumes:
      - ./specs:/workspace/specs:ro
      - ./analysis:/workspace/analysis
    command: >
      sh -c "
        mkdir -p analysis &&
        for file in specs/*.yaml; do
          basename=\"\$${file##*/}\" &&
          laag \"\$$file\" > \"analysis/\$${basename%.yaml}-analysis.txt\"
        done
      "
```

### Best Practices for CI/CD Integration

1. **Cache Dependencies**: Cache npm packages to speed up builds

   ```yaml
   # GitHub Actions example
   - uses: actions/setup-node@v3
     with:
       node-version: '18'
       cache: 'npm'
   ```

2. **Fail Fast**: Exit immediately on validation errors

   ```bash
   laag api.yaml || exit 1
   ```

3. **Use Specific Versions**: Pin the CLI version for reproducibility

   ```bash
   npm install -g @laag/cli@2.0.0
   ```

4. **Store Artifacts**: Save analysis results for later review

   ```yaml
   # GitHub Actions
   - uses: actions/upload-artifact@v3
     with:
       name: api-analysis
       path: analysis/
   ```

5. **Add Status Badges**: Show validation status in your README

   ```markdown
   ![API Validation](https://github.com/user/repo/workflows/validate-api/badge.svg)
   ```

6. **Run on Relevant Changes**: Only run when API files change

   ```yaml
   on:
     push:
       paths:
         - 'specs/**'
   ```

7. **Parallel Execution**: Validate multiple files in parallel when possible

8. **Notification**: Send alerts on validation failures
   ```yaml
   # Slack notification example
   - name: Notify on failure
     if: failure()
     uses: 8398a7/action-slack@v3
     with:
       status: ${{ job.status }}
       text: 'API validation failed!'
   ```

### Troubleshooting CI/CD Issues

**Issue: CLI not found after installation**

Solution: Ensure the npm global bin directory is in PATH

```yaml
- run: echo "$(npm config get prefix)/bin" >> $GITHUB_PATH
```

**Issue: Permission errors**

Solution: Use npx instead of global installation

```bash
npx @laag/cli api.yaml
```

**Issue: File not found in CI**

Solution: Verify file paths are relative to repository root

```bash
ls -la specs/  # Debug: list files
laag specs/api.yaml  # Use full path
```

**Issue: Different behavior in CI vs local**

Solution: Use the same Node.js version locally and in CI

```bash
node --version  # Check version
```

## Output Parsing

### Understanding CLI Output Format

The laag CLI produces structured text output that can be easily parsed and processed by scripts and other tools.

#### Output Structure

```
Displaying API: {title} v{version}
Paths defined in this API:
{METHOD} {PATH} - {DESCRIPTION}
{METHOD} {PATH} - {DESCRIPTION}
...
```

**Components:**

- **Line 1**: Header with API title and version
- **Line 2**: Section header for paths
- **Line 3+**: Endpoint entries (one per line)

#### Endpoint Entry Format

Each endpoint line follows this pattern:

```
{METHOD} {PATH} - {DESCRIPTION}
```

- `{METHOD}`: HTTP method (GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD, TRACE)
- `{PATH}`: API endpoint path (e.g., `/users`, `/users/{id}`)
- `{DESCRIPTION}`: Operation summary or operation ID

### Parsing with Shell Tools

#### Using grep

**Extract specific HTTP methods:**

```bash
# Get all GET endpoints
laag api.yaml | grep "^GET"

# Get all POST endpoints
laag api.yaml | grep "^POST"

# Get multiple methods
laag api.yaml | grep -E "^(GET|POST)"
```

**Extract specific paths:**

```bash
# Get all /users endpoints
laag api.yaml | grep "/users"

# Get endpoints with path parameters
laag api.yaml | grep "{"

# Get endpoints without path parameters
laag api.yaml | grep -v "{"
```

**Case-insensitive search:**

```bash
laag api.yaml | grep -i "user"
```

#### Using awk

**Extract specific fields:**

```bash
# Extract only HTTP methods
laag api.yaml | tail -n +3 | awk '{print $1}'

# Extract only paths
laag api.yaml | tail -n +3 | awk '{print $2}'

# Extract only descriptions
laag api.yaml | tail -n +3 | awk -F' - ' '{print $2}'
```

**Create custom output formats:**

```bash
# Create CSV format
laag api.yaml | tail -n +3 | awk '{print $1","$2","$4}'

# Create tab-separated format
laag api.yaml | tail -n +3 | awk '{print $1"\t"$2"\t"$4}'

# Create JSON-like format
laag api.yaml | tail -n +3 | awk '{print "{\"method\":\""$1"\",\"path\":\""$2"\"}"}'
```

**Count endpoints:**

```bash
# Count total endpoints
laag api.yaml | tail -n +3 | wc -l

# Count by method
laag api.yaml | tail -n +3 | awk '{print $1}' | sort | uniq -c
```

#### Using sed

**Transform output:**

```bash
# Convert to uppercase
laag api.yaml | sed 's/.*/\U&/'

# Remove descriptions
laag api.yaml | sed 's/ - .*//'

# Add prefix to paths
laag api.yaml | tail -n +3 | sed 's|^\([A-Z]*\) \(/.*\)|\1 https://api.example.com\2|'

# Replace path parameters
laag api.yaml | sed 's/{[^}]*}/{id}/g'
```

#### Using cut

**Extract fields by delimiter:**

```bash
# Extract method and path only
laag api.yaml | tail -n +3 | cut -d' ' -f1,2

# Extract description only
laag api.yaml | tail -n +3 | cut -d'-' -f2-
```

### Parsing with Programming Languages

#### Bash Script

```bash
#!/bin/bash
# parse-api.sh

API_FILE="$1"

# Parse API info
API_INFO=$(laag "$API_FILE" | head -n 1)
API_TITLE=$(echo "$API_INFO" | sed 's/Displaying API: \(.*\) v.*/\1/')
API_VERSION=$(echo "$API_INFO" | sed 's/.*v\(.*\)/\1/')

echo "Title: $API_TITLE"
echo "Version: $API_VERSION"
echo ""

# Parse endpoints
echo "Endpoints:"
laag "$API_FILE" | tail -n +3 | while IFS= read -r line; do
  METHOD=$(echo "$line" | awk '{print $1}')
  PATH=$(echo "$line" | awk '{print $2}')
  DESCRIPTION=$(echo "$line" | awk -F' - ' '{print $2}')

  echo "  Method: $METHOD"
  echo "  Path: $PATH"
  echo "  Description: $DESCRIPTION"
  echo ""
done
```

#### Python Script

```python
#!/usr/bin/env python3
# parse-api.py

import subprocess
import sys
import re

def parse_api(api_file):
    # Run laag CLI
    result = subprocess.run(
        ['laag', api_file],
        capture_output=True,
        text=True
    )

    if result.returncode != 0:
        print(f"Error: {result.stderr}", file=sys.stderr)
        sys.exit(1)

    lines = result.stdout.strip().split('\n')

    # Parse header
    header = lines[0]
    match = re.match(r'Displaying API: (.*) v(.*)', header)
    if match:
        title = match.group(1)
        version = match.group(2)
    else:
        title = "Unknown"
        version = "Unknown"

    # Parse endpoints
    endpoints = []
    for line in lines[2:]:  # Skip first two lines
        parts = line.split(' - ', 1)
        if len(parts) == 2:
            method_path = parts[0].split(' ', 1)
            if len(method_path) == 2:
                method, path = method_path
                description = parts[1]
                endpoints.append({
                    'method': method,
                    'path': path,
                    'description': description
                })

    return {
        'title': title,
        'version': version,
        'endpoints': endpoints
    }

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: parse-api.py <api-file>")
        sys.exit(1)

    api_data = parse_api(sys.argv[1])

    print(f"Title: {api_data['title']}")
    print(f"Version: {api_data['version']}")
    print(f"Endpoints: {len(api_data['endpoints'])}")
    print()

    for endpoint in api_data['endpoints']:
        print(f"{endpoint['method']} {endpoint['path']}")
        print(f"  Description: {endpoint['description']}")
```

#### Node.js Script

```javascript
#!/usr/bin/env node
// parse-api.js

const { execSync } = require('child_process');
const fs = require('fs');

function parseApi(apiFile) {
  try {
    // Run laag CLI
    const output = execSync(`laag ${apiFile}`, { encoding: 'utf8' });
    const lines = output.trim().split('\n');

    // Parse header
    const headerMatch = lines[0].match(/Displaying API: (.*) v(.*)/);
    const title = headerMatch ? headerMatch[1] : 'Unknown';
    const version = headerMatch ? headerMatch[2] : 'Unknown';

    // Parse endpoints
    const endpoints = [];
    for (let i = 2; i < lines.length; i++) {
      const parts = lines[i].split(' - ');
      if (parts.length === 2) {
        const [method, path] = parts[0].split(' ');
        const description = parts[1];
        endpoints.push({ method, path, description });
      }
    }

    return { title, version, endpoints };
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Usage
if (process.argv.length !== 3) {
  console.log('Usage: parse-api.js <api-file>');
  process.exit(1);
}

const apiData = parseApi(process.argv[2]);

console.log(`Title: ${apiData.title}`);
console.log(`Version: ${apiData.version}`);
console.log(`Endpoints: ${apiData.endpoints.length}`);
console.log();

apiData.endpoints.forEach(endpoint => {
  console.log(`${endpoint.method} ${endpoint.path}`);
  console.log(`  Description: ${endpoint.description}`);
});
```

### Converting to Structured Formats

#### Convert to JSON

```bash
#!/bin/bash
# to-json.sh

API_FILE="$1"

# Get API info
API_INFO=$(laag "$API_FILE" | head -n 1)
API_TITLE=$(echo "$API_INFO" | sed 's/Displaying API: \(.*\) v.*/\1/')
API_VERSION=$(echo "$API_INFO" | sed 's/.*v\(.*\)/\1/')

# Start JSON
echo "{"
echo "  \"title\": \"$API_TITLE\","
echo "  \"version\": \"$API_VERSION\","
echo "  \"endpoints\": ["

# Parse endpoints
FIRST=true
laag "$API_FILE" | tail -n +3 | while IFS= read -r line; do
  METHOD=$(echo "$line" | awk '{print $1}')
  PATH=$(echo "$line" | awk '{print $2}')
  DESCRIPTION=$(echo "$line" | awk -F' - ' '{print $2}')

  if [ "$FIRST" = true ]; then
    FIRST=false
  else
    echo ","
  fi

  echo -n "    {"
  echo -n "\"method\": \"$METHOD\", "
  echo -n "\"path\": \"$PATH\", "
  echo -n "\"description\": \"$DESCRIPTION\""
  echo -n "}"
done

echo ""
echo "  ]"
echo "}"
```

#### Convert to CSV

```bash
#!/bin/bash
# to-csv.sh

API_FILE="$1"

# CSV header
echo "Method,Path,Description"

# Parse endpoints
laag "$API_FILE" | tail -n +3 | while IFS= read -r line; do
  METHOD=$(echo "$line" | awk '{print $1}')
  PATH=$(echo "$line" | awk '{print $2}')
  DESCRIPTION=$(echo "$line" | awk -F' - ' '{print $2}')

  echo "\"$METHOD\",\"$PATH\",\"$DESCRIPTION\""
done
```

#### Convert to Markdown Table

```bash
#!/bin/bash
# to-markdown.sh

API_FILE="$1"

# Get API info
API_INFO=$(laag "$API_FILE" | head -n 1)

echo "# $API_INFO"
echo ""
echo "| Method | Path | Description |"
echo "|--------|------|-------------|"

# Parse endpoints
laag "$API_FILE" | tail -n +3 | while IFS= read -r line; do
  METHOD=$(echo "$line" | awk '{print $1}')
  PATH=$(echo "$line" | awk '{print $2}')
  DESCRIPTION=$(echo "$line" | awk -F' - ' '{print $2}')

  echo "| $METHOD | $PATH | $DESCRIPTION |"
done
```

### Advanced Parsing Examples

#### Extract API Statistics

```bash
#!/bin/bash
# api-stats.sh

API_FILE="$1"

echo "API Statistics"
echo "=============="
echo ""

# Total endpoints
TOTAL=$(laag "$API_FILE" | tail -n +3 | wc -l)
echo "Total Endpoints: $TOTAL"

# Endpoints by method
echo ""
echo "By Method:"
laag "$API_FILE" | tail -n +3 | awk '{print $1}' | sort | uniq -c | while read count method; do
  echo "  $method: $count"
done

# Endpoints with path parameters
WITH_PARAMS=$(laag "$API_FILE" | tail -n +3 | grep -c "{")
echo ""
echo "With Path Parameters: $WITH_PARAMS"

# Unique paths
UNIQUE_PATHS=$(laag "$API_FILE" | tail -n +3 | awk '{print $2}' | sort -u | wc -l)
echo "Unique Paths: $UNIQUE_PATHS"
```

#### Generate Test Stubs

```bash
#!/bin/bash
# generate-tests.sh

API_FILE="$1"
OUTPUT_FILE="${2:-api-tests.js}"

cat > "$OUTPUT_FILE" << 'EOF'
const request = require('supertest');
const app = require('./app');

describe('API Tests', () => {
EOF

laag "$API_FILE" | tail -n +3 | while IFS= read -r line; do
  METHOD=$(echo "$line" | awk '{print $1}' | tr '[:upper:]' '[:lower:]')
  PATH=$(echo "$line" | awk '{print $2}')
  DESCRIPTION=$(echo "$line" | awk -F' - ' '{print $2}')

  cat >> "$OUTPUT_FILE" << EOF

  test('$METHOD $PATH - $DESCRIPTION', async () => {
    const response = await request(app)
      .$METHOD('$PATH')
      .expect(200);

    // Add assertions here
  });
EOF
done

echo "" >> "$OUTPUT_FILE"
echo "});" >> "$OUTPUT_FILE"

echo "Test stubs generated: $OUTPUT_FILE"
```

#### Create API Client Stub

```bash
#!/bin/bash
# generate-client.sh

API_FILE="$1"
OUTPUT_FILE="${2:-api-client.js}"

cat > "$OUTPUT_FILE" << 'EOF'
class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

EOF

laag "$API_FILE" | tail -n +3 | while IFS= read -r line; do
  METHOD=$(echo "$line" | awk '{print $1}' | tr '[:upper:]' '[:lower:]')
  PATH=$(echo "$line" | awk '{print $2}')
  DESCRIPTION=$(echo "$line" | awk -F' - ' '{print $2}')

  # Generate method name from path
  METHOD_NAME=$(echo "$PATH" | sed 's/[^a-zA-Z0-9]/_/g' | sed 's/^_//' | sed 's/_$//')

  cat >> "$OUTPUT_FILE" << EOF
  /**
   * $DESCRIPTION
   * $METHOD $PATH
   */
  async ${METHOD}_${METHOD_NAME}(params = {}) {
    const url = \`\${this.baseUrl}$PATH\`;
    // TODO: Implement request
    return fetch(url, { method: '${METHOD^^}' });
  }

EOF
done

echo "}" >> "$OUTPUT_FILE"

echo "API client generated: $OUTPUT_FILE"
```

### Parsing Best Practices

1. **Skip Header Lines**: Use `tail -n +3` to skip the first two lines
2. **Handle Spaces in Descriptions**: Use `-F' - '` with awk to split on " - "
3. **Validate Input**: Check if the file exists and CLI succeeds
4. **Handle Empty Output**: Check for empty results before processing
5. **Escape Special Characters**: Quote variables in shell scripts
6. **Use Consistent Delimiters**: Stick to standard delimiters for easier parsing
7. **Error Handling**: Capture and handle CLI errors appropriately
8. **Test with Various APIs**: Ensure your parser works with different API structures

### Troubleshooting Parsing Issues

**Issue: Descriptions with hyphens break parsing**

Solution: Use `-F' - '` with awk to split only on the first " - "

```bash
awk -F' - ' '{print $2}'  # Correct
awk -F'-' '{print $2}'    # Incorrect - splits on all hyphens
```

**Issue: Paths with spaces**

Solution: Quote the entire line when processing

```bash
while IFS= read -r line; do
  # Process "$line"
done
```

**Issue: Special characters in descriptions**

Solution: Escape or quote properly

```bash
DESCRIPTION=$(echo "$line" | awk -F' - ' '{print $2}' | sed 's/"/\\"/g')
```

**Issue: Empty lines in output**

Solution: Filter empty lines

```bash
laag api.yaml | grep -v "^$"
```

## Troubleshooting

### Common Issues and Solutions

#### CLI Not Found

**Problem:** `laag: command not found`

**Solutions:**

1. Verify installation:

   ```bash
   npm list -g @laag/cli
   ```

2. Check PATH:

   ```bash
   echo $PATH
   npm config get prefix
   ```

3. Reinstall globally:

   ```bash
   npm install -g @laag/cli
   ```

4. Use npx instead:
   ```bash
   npx @laag/cli api.yaml
   ```

#### File Not Found

**Problem:** `Error: File 'api.yaml' not found.`

**Solutions:**

1. Check file exists:

   ```bash
   ls -la api.yaml
   ```

2. Use absolute path:

   ```bash
   laag /full/path/to/api.yaml
   ```

3. Check current directory:
   ```bash
   pwd
   ls
   ```

#### Invalid YAML/JSON

**Problem:** `YAMLException: bad indentation...`

**Solutions:**

1. Validate YAML syntax:

   ```bash
   # Using yamllint
   yamllint api.yaml

   # Using Python
   python -c "import yaml; yaml.safe_load(open('api.yaml'))"
   ```

2. Validate JSON syntax:

   ```bash
   # Using jq
   jq . api.json

   # Using Python
   python -m json.tool api.json
   ```

3. Check file encoding:
   ```bash
   file api.yaml
   ```

#### Permission Errors

**Problem:** `EACCES: permission denied`

**Solutions:**

1. Check file permissions:

   ```bash
   ls -la api.yaml
   ```

2. Fix permissions:

   ```bash
   chmod 644 api.yaml
   ```

3. Run with appropriate user:
   ```bash
   sudo laag api.yaml  # Not recommended
   ```

#### Node.js Version Issues

**Problem:** `Error: Node.js version 18.0.0 or higher required`

**Solutions:**

1. Check Node.js version:

   ```bash
   node --version
   ```

2. Upgrade Node.js:

   ```bash
   # Using nvm
   nvm install 18
   nvm use 18

   # Using package manager
   # See nodejs.org for instructions
   ```

### Getting Help

- **CLI Help**: `laag --help`
- **GitHub Issues**: [github.com/bschwarz/laag/issues](https://github.com/bschwarz/laag/issues)
- **Documentation**: Check the [main documentation](./README.md)
- **Community**: Join discussions on GitHub

## Advanced Usage

### Using with Watch Tools

Monitor API files and re-analyze on changes:

```bash
# Using watchexec
watchexec -w specs/ laag specs/api.yaml

# Using nodemon
nodemon --watch specs/ --exec "laag specs/api.yaml"

# Using entr
ls specs/*.yaml | entr laag specs/api.yaml
```

### Integration with Other Tools

#### With Postman

Generate a collection from CLI output (requires additional processing):

```bash
# Export endpoints list
laag api.yaml > endpoints.txt

# Process with custom script to create Postman collection
./create-postman-collection.sh endpoints.txt > collection.json
```

#### With Swagger UI

Use CLI for quick validation before serving with Swagger UI:

```bash
#!/bin/bash
if laag api.yaml > /dev/null 2>&1; then
  echo "✅ API is valid, starting Swagger UI..."
  docker run -p 80:8080 -e SWAGGER_JSON=/api.yaml -v $(pwd):/api swaggerapi/swagger-ui
else
  echo "❌ API is invalid, fix errors first"
  exit 1
fi
```

#### With API Documentation Generators

Validate before generating documentation:

```bash
# Validate with laag, then generate docs
laag api.yaml && redoc-cli bundle api.yaml
```

### Performance Tips

1. **Cache Results**: Save CLI output to avoid repeated parsing

   ```bash
   laag api.yaml > .api-cache.txt
   cat .api-cache.txt  # Use cached version
   ```

2. **Parallel Processing**: Process multiple files in parallel

   ```bash
   find specs/ -name "*.yaml" | xargs -P 4 -I {} laag {}
   ```

3. **Selective Analysis**: Only analyze changed files
   ```bash
   git diff --name-only | grep "\.yaml$" | xargs -I {} laag {}
   ```

### Future Features

The CLI is under active development. Planned features include:

- JSON output format
- Detailed validation reports
- Schema analysis
- Security scheme inspection
- Component listing
- Interactive mode
- Configuration file support
- Plugin system

Stay tuned for updates!

## Conclusion

The laag CLI provides a simple yet powerful way to analyze OpenAPI specifications from the command line. Whether you're validating APIs, integrating into CI/CD pipelines, or building custom workflows, the CLI offers the flexibility and ease of use you need.

For more advanced features like sample generation, code generation, or document manipulation, explore the [`@laag/openapi`](./API_REFERENCE_OPENAPI.md) library for programmatic access.

Happy API analyzing!
