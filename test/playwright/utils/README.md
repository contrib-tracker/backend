# Playwright Drush Utilities

This directory contains utilities for running Drush commands within Playwright tests, with automatic DDEV context detection.

## Features

- **Automatic DDEV Detection**: Determines whether the test is running inside a DDEV container or on the host
- **Context-Aware Command Execution**: Automatically prefixes commands with `ddev` when needed
- **TypeScript Support**: Full TypeScript definitions and IntelliSense support
- **Common Drush Commands**: Pre-built helper functions for frequently used Drush operations
- **Flexible API**: Both async and sync execution options

## Quick Start

```typescript
import { drush } from './utils';

// Clear Drupal cache
await drush.clearCache();

// Get Drupal status
const status = await drush.status();

// Enable a module
await drush.enableModule('my_module');

// Execute custom drush command
await drush.exec('config:get system.site name');
```

## API Reference

### Context Detection Functions

#### `isRunningInDdevContainer(): boolean`
Determines if the current process is running inside a DDEV container.

#### `isDdevAvailable(): boolean`
Checks if DDEV is available and running on the host system.

#### `isDdevProject(): boolean`
Checks if the current project has DDEV configured.

### Command Execution Functions

#### `runDrushCommand(command: string, options?: DrushCommandOptions): Promise<string>`
Executes a drush command with appropriate DDEV context (async).

#### `runDrushCommandSync(command: string, options?: DrushCommandOptions): string`
Executes a drush command with appropriate DDEV context (sync).

**Options:**
- `cwd?: string` - Working directory for command execution
- `timeout?: number` - Timeout in milliseconds (default: 30000)
- `stdio?: 'pipe' | 'ignore' | 'inherit'` - How to handle stdio (default: 'pipe')

### Pre-built Drush Commands

The `drush` object provides convenient methods for common operations:

```typescript
// Cache operations
await drush.clearCache();

// Status and information
await drush.status();

// Module management
await drush.enableModule('module_name');
await drush.disableModule('module_name');

// Configuration management
await drush.configImport();
await drush.configExport();
await drush.configGet('system.site', 'name');
await drush.configSet('system.site', 'name', 'My Site');

// Database operations
await drush.updateDatabase();

// Custom commands
await drush.exec('custom:command --option=value');
await drush.execSync('custom:command --option=value');
```

## How It Works

The utilities automatically detect the execution context:

1. **Inside DDEV Container**: Runs `drush` commands directly
2. **On Host with DDEV**: Prefixes commands with `ddev` (e.g., `ddev drush cr`)
3. **Fallback**: Attempts to run `drush` directly (may fail if not available)

### Detection Logic

The system checks for:
- DDEV environment variables (`DDEV_PROJECT`, `DDEV_HOSTNAME`, etc.)
- Container indicators in `/proc/1/cgroup`
- DDEV-specific files and directories
- `.ddev` directory in project hierarchy

## Usage in Playwright Tests

### Basic Usage

```typescript
import { test } from '@playwright/test';
import { drush } from './utils';

test('my test', async ({ page }) => {
  // Clear cache before test
  await drush.clearCache();

  // Enable required modules
  await drush.enableModule('my_test_module');

  // Navigate and test
  await page.goto('/my-page');
  // ... test logic
});
```

### Test Setup/Teardown

```typescript
test.beforeEach(async () => {
  await drush.clearCache();
  await drush.configImport();
});

test.afterEach(async () => {
  await drush.disableModule('test_module');
});
```

### Error Handling

```typescript
test('robust test with error handling', async () => {
  try {
    await drush.enableModule('my_module');
  } catch (error) {
    console.warn('Could not enable module:', error.message);
    // Continue with test or skip
  }
});
```

## Files

- `drush.ts` - Main utility functions and command wrappers
- `types.ts` - TypeScript type definitions
- `index.ts` - Main exports
- `example.ts` - Example usage and tests
- `tsconfig.json` - TypeScript configuration

## Requirements

- Node.js with TypeScript support
- Playwright testing framework
- DDEV (when running on host)
- Drush (available in DDEV container or host)

## Contributing

When adding new drush commands to the `drush` object:

1. Add the method to the `drush` object in `drush.ts`
2. Update TypeScript types if needed
3. Add example usage to `example.ts`
4. Update this README

## Troubleshooting

**Command fails with "drush not found":**
- Ensure you're running in a DDEV environment or have drush installed locally
- Check that DDEV is running: `ddev status`

**TypeScript errors:**
- Ensure `@types/node` is installed: `npm install --save-dev @types/node`
- Check that `tsconfig.json` includes the utils directory

**Permission errors:**
- Ensure DDEV containers have proper permissions
- Try restarting DDEV: `ddev restart`
