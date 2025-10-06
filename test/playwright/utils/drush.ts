import { execSync, spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Determines if the current process is running inside a DDEV container.
 *
 * This function checks multiple indicators:
 * 1. Environment variables that DDEV sets in containers
 * 2. Presence of DDEV-specific files/directories
 * 3. Container-specific filesystem indicators
 */
export function isRunningInDdevContainer(): boolean {
  // Check for DDEV environment variables
  if (process.env.DDEV_PROJECT || process.env.DDEV_HOSTNAME || process.env.DDEV_SITENAME) {
    return true;
  }

  // Check for container-specific indicators
  if (process.env.CONTAINER) {
    return true;
  }

  // Check if we're in a container by looking at cgroup
  try {
    const cgroupContent = fs.readFileSync('/proc/1/cgroup', 'utf8');
    if (cgroupContent.includes('docker') || cgroupContent.includes('containerd')) {
      return true;
    }
  } catch (error) {
    // File doesn't exist or can't be read - likely not in a container
  }

  // Check for DDEV-specific files that would be present in container
  const ddevIndicators = [
    '/mnt/ddev_config',
    '/var/www/html/.ddev',
    '/etc/ddev'
  ];

  for (const indicator of ddevIndicators) {
    if (fs.existsSync(indicator)) {
      return true;
    }
  }

  return false;
}

/**
 * Determines if DDEV is available and running on the host system.
 * This is used when we're not inside a container but need to use DDEV commands.
 */
export function isDdevAvailable(): boolean {
  try {
    // Try to run 'ddev version' to see if DDEV is available
    execSync('ddev version', { stdio: 'ignore', timeout: 5000 });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Checks if the current project has DDEV configured by looking for .ddev directory.
 */
export function isDdevProject(): boolean {
  // Start from current directory and walk up to find .ddev directory
  let currentDir = process.cwd();
  const root = path.parse(currentDir).root;

  while (currentDir !== root) {
    const ddevPath = path.join(currentDir, '.ddev');
    if (fs.existsSync(ddevPath) && fs.statSync(ddevPath).isDirectory()) {
      return true;
    }
    currentDir = path.dirname(currentDir);
  }

  return false;
}

/**
 * Executes a drush command with appropriate DDEV context.
 *
 * @param command - The drush command to execute (without 'drush' prefix)
 * @param options - Additional options for command execution
 * @returns Promise that resolves with command output
 */
export async function runDrushCommand(
  command: string,
  options: {
    cwd?: string;
    timeout?: number;
    stdio?: 'pipe' | 'ignore' | 'inherit';
  } = {}
): Promise<string> {
  const { cwd = process.cwd(), timeout = 30000, stdio = 'pipe' } = options;

  let fullCommand: string;

  if (isRunningInDdevContainer()) {
    // We're inside a DDEV container, run drush directly
    fullCommand = `drush ${command}`;
  } else if (isDdevAvailable() && isDdevProject()) {
    // We're on the host with DDEV available and this is a DDEV project
    fullCommand = `ddev drush ${command}`;
  } else {
    // Fallback to direct drush execution (might fail if drush not available)
    fullCommand = `drush ${command}`;
  }

  return new Promise((resolve, reject) => {
    const child = spawn('sh', ['-c', fullCommand], {
      cwd,
      stdio: stdio === 'pipe' ? ['pipe', 'pipe', 'pipe'] : stdio,
    });

    let stdout = '';
    let stderr = '';

    if (stdio === 'pipe') {
      child.stdout?.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr?.on('data', (data) => {
        stderr += data.toString();
      });
    }

    const timeoutId = setTimeout(() => {
      child.kill('SIGTERM');
      reject(new Error(`Command timed out after ${timeout}ms: ${fullCommand}`));
    }, timeout);

    child.on('close', (code) => {
      clearTimeout(timeoutId);

      if (code === 0) {
        resolve(stdout.trim());
      } else {
        reject(new Error(`Command failed with code ${code}: ${fullCommand}\nStderr: ${stderr}`));
      }
    });

    child.on('error', (error) => {
      clearTimeout(timeoutId);
      reject(new Error(`Failed to execute command: ${fullCommand}\nError: ${error.message}`));
    });
  });
}

/**
 * Executes a drush command synchronously with appropriate DDEV context.
 *
 * @param command - The drush command to execute (without 'drush' prefix)
 * @param options - Additional options for command execution
 * @returns Command output as string
 */
export function runDrushCommandSync(
  command: string,
  options: {
    cwd?: string;
    timeout?: number;
    stdio?: 'pipe' | 'ignore' | 'inherit';
  } = {}
): string {
  const { cwd = process.cwd(), timeout = 30000, stdio = 'pipe' } = options;

  let fullCommand: string;

  if (isRunningInDdevContainer()) {
    // We're inside a DDEV container, run drush directly
    fullCommand = `drush ${command}`;
  } else if (isDdevAvailable() && isDdevProject()) {
    // We're on the host with DDEV available and this is a DDEV project
    fullCommand = `ddev drush ${command}`;
  } else {
    // Fallback to direct drush execution (might fail if drush not available)
    fullCommand = `drush ${command}`;
  }

  try {
    return execSync(fullCommand, {
      cwd,
      timeout,
      stdio: stdio === 'pipe' ? 'pipe' : stdio,
      encoding: 'utf8',
    }).toString().trim();
  } catch (error: any) {
    throw new Error(`Failed to execute drush command: ${fullCommand}\nError: ${error.message}`);
  }
}

/**
 * Common drush commands with built-in error handling and context awareness.
 */
export const drush = {
  /**
   * Clear all caches
   */
  clearCache: () => runDrushCommand('cr'),

  /**
   * Get Drupal status
   */
  status: () => runDrushCommand('status --format=json'),

  /**
   * Enable a module
   */
  enableModule: (moduleName: string) => runDrushCommand(`en ${moduleName} -y`),

  /**
   * Disable a module
   */
  disableModule: (moduleName: string) => runDrushCommand(`dis ${moduleName} -y`),

  /**
   * Import configuration
   */
  configImport: () => runDrushCommand('cim -y'),

  /**
   * Export configuration
   */
  configExport: () => runDrushCommand('cex -y'),

  /**
   * Run database updates
   */
  updateDatabase: () => runDrushCommand('updb -y'),

  /**
   * Get configuration value
   */
  configGet: (configName: string, key?: string) => {
    const command = key ? `cget ${configName} ${key}` : `cget ${configName}`;
    return runDrushCommand(command);
  },

  /**
   * Set configuration value
   */
  configSet: (configName: string, key: string, value: string) =>
    runDrushCommand(`cset ${configName} ${key} "${value}" -y`),

  /**
   * Execute arbitrary drush command
   */
  exec: (command: string) => runDrushCommand(command),

  /**
   * Execute arbitrary drush command synchronously
   */
  execSync: (command: string) => runDrushCommandSync(command),
};

export default drush;
