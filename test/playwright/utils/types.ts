/**
 * TypeScript types for Playwright Drupal utilities
 */

export interface DrushCommandOptions {
  /** Working directory for command execution */
  cwd?: string;
  /** Timeout in milliseconds (default: 30000) */
  timeout?: number;
  /** How to handle stdio (default: 'pipe') */
  stdio?: 'pipe' | 'ignore' | 'inherit';
}

export interface DrushStatusResponse {
  'drupal-version'?: string;
  'site-uri'?: string;
  'db-driver'?: string;
  'db-hostname'?: string;
  'db-port'?: string;
  'db-username'?: string;
  'db-name'?: string;
  'install-profile'?: string;
  'config-sync'?: string;
  'files'?: string;
  'temp'?: string;
  [key: string]: any;
}

export interface DdevContext {
  /** Whether currently running inside a DDEV container */
  inContainer: boolean;
  /** Whether DDEV is available on the host */
  ddevAvailable: boolean;
  /** Whether current project is configured for DDEV */
  isDdevProject: boolean;
}
