# Changelog

All notable changes to the laag library collection will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Complete TypeScript rewrite with full type safety
- Modern ESM and CommonJS dual module support
- Browser-compatible bundles with tree-shaking
- Comprehensive error handling with typed errors
- Bun-based build system and testing
- Automated release management
- Cross-platform compatibility testing

### Changed

- **BREAKING**: Migrated from JavaScript to TypeScript
- **BREAKING**: Minimum Node.js version is now 18.0.0
- Improved API design with better type safety
- Enhanced error messages with context and suggestions
- Modernized build pipeline with Bun

### Deprecated

- Legacy CommonJS-only builds (still supported but deprecated)

### Removed

- Support for Node.js versions below 18.0.0

### Fixed

- Various type safety issues in the original JavaScript implementation
- Inconsistent error handling across packages

### Security

- Updated all dependencies to latest secure versions
- Added automated security scanning in CI/CD

## [2.0.0] - TBD

### Added

- Initial TypeScript implementation
- Modern build system with Bun
- Comprehensive test suite
- Cross-platform compatibility
- Automated publishing pipeline

## [1.0.3-alpha.0] - Previous Release

### Added

- Initial JavaScript implementation
- Basic OpenAPI and RAML support
- Lerna monorepo structure

---

## Release Process

### Versioning Strategy

- **Major** (X.0.0): Breaking changes, API changes
- **Minor** (X.Y.0): New features, backward compatible
- **Patch** (X.Y.Z): Bug fixes, backward compatible
- **Prerelease** (X.Y.Z-alpha.N, X.Y.Z-beta.N): Development versions

### Release Commands

```bash
# Patch release (bug fixes)
bun run release:patch

# Minor release (new features)
bun run release:minor

# Major release (breaking changes)
bun run release:major

# Beta release
bun run release:beta

# Alpha release
bun run release:alpha

# Dry run (test without publishing)
bun run release:dry
```

### Manual Release

```bash
# Set specific version
bun run release --version=2.1.0

# Set version with tag
bun run release --version=2.1.0-beta.1 --tag=beta

# Dry run
bun run release --version=2.1.0 --dry-run
```
