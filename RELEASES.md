# Release Guide

Quick reference for releasing packages in the laag monorepo.

## Individual Package Releases

### OpenAPI Package (@laag/openapi)

```bash
# Patch release (bug fixes)
bun run release:openapi:patch

# Minor release (new features)
bun run release:openapi:minor

# Major release (breaking changes)
bun run release:openapi:major

# Custom version
bun run scripts/release-package.ts @laag/openapi --version=2.1.0

# Beta release
bun run scripts/release-package.ts @laag/openapi --prerelease --tag=beta

# Dry run
bun run scripts/release-package.ts @laag/openapi --patch --dry-run
```

### Core Package (@laag/core)

```bash
bun run release:core:patch
bun run release:core:minor
bun run release:core:major
```

### RAML Package (@laag/raml)

```bash
bun run release:raml:patch
bun run release:raml:minor
bun run release:raml:major
```

### CLI Package (@laag/cli)

```bash
bun run release:cli:patch
bun run release:cli:minor
bun run release:cli:major
```

## Unified Releases (All Packages)

```bash
# Release all packages with same version
bun run release:patch     # All packages get patch bump
bun run release:minor     # All packages get minor bump
bun run release:major     # All packages get major bump
bun run release:beta      # All packages get beta release
bun run release:alpha     # All packages get alpha release
```

## GitHub Actions

Use the web interface for releases:

1. Go to **Actions** → **Release Individual Package**
2. Select package and version type
3. Run workflow

## Quick Commands

```bash
# Check package info
bun run scripts/release-package.ts @laag/openapi --info

# List all packages
bun run scripts/release.ts --list

# Validate publishing setup
bun run validate:publishing

# Test compatibility
bun run test:compatibility

# Test integration
bun run test:integration
```

## Version Strategy

- **Patch** (2.0.X): Bug fixes, documentation
- **Minor** (2.X.0): New features, backward compatible
- **Major** (X.0.0): Breaking changes
- **Prerelease** (2.0.0-alpha.X): Development versions

## Dependencies

Release order is automatically handled:

1. @laag/core (no dependencies)
2. @laag/openapi (depends on core)
3. @laag/raml (depends on core)
4. @laag/cli (depends on openapi)

## Tags

- **latest**: Stable releases (default)
- **beta**: Beta testing releases
- **alpha**: Early development releases

Install specific tags:

```bash
npm install @laag/openapi@beta
npm install @laag/openapi@alpha
```
