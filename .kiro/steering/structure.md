# Project Structure

## Repository Layout
```
laag/
├── packages/                    # Bun workspace packages
│   ├── core/                   # Shared core functionality (v2.0+)
│   ├── openapi/                # OpenAPI/Swagger library (v2.0+)
│   ├── smithy/                 # AWS Smithy library (v1.0-alpha)
│   ├── raml/                   # RAML library (v1.0-alpha, in development)
│   └── cli/                    # Command-line interface (v2.0+)
├── scripts/                    # Build and release scripts
├── coverage/                   # Test coverage reports
├── .husky/                     # Git hooks configuration
├── .kiro/                      # Kiro AI assistant configuration
└── node_modules/               # Dependencies
```

## Package Structure
Each package follows a consistent structure:
```
packages/{format}/
├── package.json                # Package configuration
├── src/                        # TypeScript source files
│   ├── index.ts               # Main entry point
│   ├── {format}.ts            # Main class implementation
│   └── types.ts               # Type definitions
├── dist/                       # Built library files
│   ├── esm/                   # ESM build
│   ├── cjs/                   # CommonJS build
│   ├── browser/               # Browser bundle
│   └── types/                 # Type declarations
├── __tests__/                  # Test files
│   ├── {format}.test.ts       # Main tests
│   ├── integration.test.ts    # Integration tests
│   └── fixtures/              # Test fixtures
├── examples/                   # Usage examples
│   ├── basic-usage.ts         # Basic examples
│   ├── code-generation.ts     # Code generation examples (Smithy)
│   └── models/                # Sample model files
└── README.md                   # Package documentation
```

## Naming Conventions
- **Packages**: `@laag/{format}` for published packages (e.g., @laag/openapi, @laag/smithy)
- **Main files**: `{format}.ts` in src directory (e.g., openapi.ts, smithy.ts)
- **Test files**: `{format}.test.ts`, `integration.test.ts`, `{feature}.test.ts`
- **Classes**: PascalCase (e.g., `Openapi`, `Smithy`, `LaagBase`)
- **Methods**: camelCase with descriptive names
- **Types**: PascalCase with descriptive suffixes (e.g., `SmithyModel`, `ValidationResult`)
- **Extensions**: Use `getExtensions()` pattern for x-* properties

## File Organization Rules
- Keep TypeScript source in `src/` directory
- Built artifacts go in `dist/` directory (esm, cjs, browser, types)
- Place all tests in `__tests__/` directory
- Provide working examples in `examples/` directory
- Use consistent README structure across packages
- Maintain separate package.json for each package with proper metadata
- Include fixtures and sample models in `__tests__/fixtures/` or `examples/models/`