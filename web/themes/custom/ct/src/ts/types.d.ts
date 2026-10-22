// Globals provided by Drupal core libraries (core/drupal, core/once).
interface DrupalBehavior {
  attach: (context: Document | HTMLElement, settings: Record<string, unknown>) => void;
}

declare const Drupal: {
  behaviors: Record<string, DrupalBehavior>;
  t: (text: string) => string;
  checkPlain: (text: string) => string;
};

declare function once(
  id: string,
  selector: string | Element,
  context?: Document | HTMLElement,
): HTMLElement[];
