// Globals provided by Drupal core libraries (core/drupal, core/once, core/jquery).
interface DrupalBehavior {
  attach?: (context: Document | HTMLElement, settings: Record<string, unknown>) => void;
  detach?: (
    context: Document | HTMLElement,
    settings: Record<string, unknown>,
    trigger: string,
  ) => void;
}

declare const Drupal: {
  behaviors: Record<string, DrupalBehavior>;
  t: (text: string) => string;
  checkPlain: (text: string) => string;
  /** Helpers exposed by the contribution graph component, for tests. */
  ctContributionGraph?: Record<string, any>;
};

declare function once(
  id: string,
  selector: string | Element,
  context?: Document | HTMLElement,
): HTMLElement[];
