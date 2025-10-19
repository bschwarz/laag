# Project Structure

## Repository Layout
```
laag/
├── packages/                    # Lerna monorepo packages
│   ├── openapi/                # OpenAPI/Swagger library
│   ├── raml/                   # RAML library (in development)
│   ├── smithy/                 # Smithy library (planned)
│   └── core/                   # Shared core functionality
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
├── lib/                        # Compiled/built library files
│   └── laag-{format}.js       # Main library file
├── __tests__/                  # Test files
│   ├── laag-{format}.test.js  # Main tests
│   └── laag-{format}-component.test.js # Component tests
├── examples/                   # Usage examples
│   ├── read-example.js        # Reading examples
│   ├── write-example.js       # Writing examples
│   └── *.json/*.raml          # Sample specification files
├── src/                        # Source files (if applicable)
└── README.md                   # Package documentation
```

## Naming Conventions
- **Packages**: `@laag/{format}` for published packages, `{format}` for internal
- **Main files**: `laag-{format}.js` in lib directory
- **Test files**: `laag-{format}.test.js` and `laag-{format}-component.test.js`
- **Classes**: PascalCase (e.g., `Openapi`, `Core`)
- **Methods**: camelCase with descriptive names
- **Extensions**: Use `getExtensions()` pattern for x-* properties

## File Organization Rules
- Keep main library logic in `lib/` directory
- Place all tests in `__tests__/` directory
- Provide working examples in `examples/` directory
- Use consistent README structure across packages
- Maintain separate package.json for each package with proper metadata