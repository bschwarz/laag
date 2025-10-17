# @laag/cli

Command-line interface for the laag library collection. Analyze and inspect OpenAPI/Swagger documents from the command line.

## Installation

```bash
# Install globally
npm install -g @laag/cli

# Or use with npx (no installation required)
npx @laag/cli <openapi-file>
```

## Usage

### Basic Usage

```bash
# Analyze an OpenAPI file
laag api.yaml

# Works with JSON files too
laag openapi.json

# Using npx
npx @laag/cli petstore.yaml
```

### Command Line Options

```bash
laag [options] <openapi-file>

Options:
  --help, -h     Show help message
  --version, -v  Show version information

Arguments:
  <openapi-file>  Path to OpenAPI/Swagger document (YAML or JSON)
```

### Examples

#### Analyze a Petstore API

```bash
laag examples/petstore.yaml
```

Output:

```
Displaying API: Swagger Petstore v1.0.0
Paths defined in this API:
GET /pets - listPets
POST /pets - createPets
GET /pets/{petId} - showPetById
```

#### Get Help

```bash
laag --help
```

#### Check Version

```bash
laag --version
```

## Supported File Formats

- **YAML**: `.yaml`, `.yml` files
- **JSON**: `.json` files
- **OpenAPI 3.x**: Full support for OpenAPI 3.0+ specifications
- **Swagger 2.x**: Basic support for Swagger 2.0 specifications

## Output Information

The CLI displays the following information about your API:

1. **API Title and Version**: From the `info` section
2. **Available Endpoints**: All paths with their HTTP methods and operation IDs
3. **Operation Descriptions**: Brief description of each endpoint when available

## Error Handling

The CLI provides helpful error messages for common issues:

```bash
# File not found
$ laag nonexistent.yaml
Error: File 'nonexistent.yaml' not found.

# Invalid usage
$ laag
Usage: laag <path-to-openapi-file>
Use --help for more information.

# Multiple files (not supported)
$ laag file1.yaml file2.yaml
Error: Please provide exactly one OpenAPI file path.
Usage: laag <path-to-openapi-file>
Use --help for more information.
```

## Integration with @laag Libraries

The CLI is built on top of the `@laag/openapi` library, providing the same robust parsing and validation capabilities:

- Type-safe OpenAPI document parsing
- Comprehensive error handling
- Support for OpenAPI extensions
- Validation of document structure

## Development

### Local Development

```bash
# Clone the repository
git clone https://github.com/bschwarz/laag.git
cd laag/packages/cli

# Install dependencies
npm install

# Run locally
node laag-cli.js examples/petstore.yaml
```

### Building from Source

```bash
# From the workspace root
npm run build

# Test the CLI
cd packages/cli
node laag-cli.js --help
```

## Examples Directory

The CLI works great with the example files in the repository:

```bash
# Analyze the simple petstore example
laag examples/data/petstore-simple.json

# Try with a more complex API
laag examples/data/complex-api.yaml
```

## Troubleshooting

### Common Issues

1. **Module not found errors**

   ```bash
   # Make sure you're using Node.js 18+ and have installed dependencies
   node --version  # Should be 18.0.0 or higher
   npm install
   ```

2. **YAML parsing errors**

   ```bash
   # Ensure your YAML file is valid
   # The CLI will show specific parsing errors if the file is malformed
   ```

3. **Permission errors**
   ```bash
   # On Unix systems, you might need to make the CLI executable
   chmod +x laag-cli.js
   ```

### Getting Help

- Use `laag --help` for command-line help
- Check the [main repository](https://github.com/bschwarz/laag) for issues and documentation
- Review the [OpenAPI specification](https://spec.openapis.org/oas/v3.1.0) for document format questions

## Related Packages

- [`@laag/core`](../core/README.md) - Core utilities and base classes
- [`@laag/openapi`](../openapi/README.md) - OpenAPI document parsing and manipulation
- [`@laag/raml`](../raml/README.md) - RAML document support (coming soon)

## License

MIT - see [LICENSE](../../LICENSE) for details.

## Contributing

Contributions are welcome! Please see the [main repository](https://github.com/bschwarz/laag) for contribution guidelines.
