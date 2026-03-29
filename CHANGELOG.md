# Changelog

All notable changes to the laag library collection will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.3] - 2026-02-04

### Added

- **@laag/smithy v1.0.0** - Complete AWS Smithy model support with:
  - Full TypeScript implementation with comprehensive type definitions
  - Shape management (services, operations, structures, resources)
  - Trait support (standard and custom traits)
  - Code generation (TypeScript, JavaScript, Python)
  - Selector support for querying shapes
  - Model validation according to Smithy specification
  - HTTP binding extraction

### Fixed

- CI test failures due to missing build artifacts in test jobs
- Integration tests now properly build packages before running

### Security

- Updated js-yaml from 4.1.0 to 4.1.1 to fix prototype pollution vulnerability (GHSA-mh29-5h37-fv8m)
- Added resolution for js-yaml to force version 4.1.1+ across all transitive dependencies

## [Unreleased]

### Added

- Complete TypeScript rewrite with full type safety
- Modern ESM and CommonJS dual module support
- Browser-compatible bundles with tree-shaking
- Comprehensive error handling with typed errors
- Bun-based build system and testing
- Automated release management with individual package support
- Cross-platform compatibility testing
- Sample generation methods (JSON, Python, JavaScript, TypeScript, curl)
- Individual package release capabilities
- GitHub Actions workflows for automated publishing

### Changed

- **BREAKING**: Migrated from JavaScript to TypeScript
- **BREAKING**: Minimum Node.js version is now 18.0.0
- Improved API design with better type safety
- Enhanced error messages with context and suggestions
- Modernized build pipeline with Bun

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
