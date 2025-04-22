import Clarity from '@microsoft/clarity';

/**
 * Tags a button click event for Microsoft Clarity with a consistent format.
 * Format: "clicked_<button_name>"
 */
export function tagButtonClick(e: React.MouseEvent<HTMLElement>) {
  let name = e.currentTarget.getAttribute('aria-label') ||
             e.currentTarget.id ||
             (typeof e.currentTarget.textContent === 'string' && e.currentTarget.textContent.trim().split(/\s+/).join('_')) ||
             'button';
  name = name.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase();
  // Tag the button click
  // Clarity tag: clicked_<button_name>
  Clarity.setTag('event', `clicked_${name}`);
}

/**
 * Tags a feature usage event for Microsoft Clarity with a consistent format.
 * Format: "used_<feature_name>"
 */
export function tagFeatureUsage(featureName: string) {
  // Clarity tag: used_<feature_name>
  Clarity.setTag('event', `used_${featureName.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase()}`);
}

/**
 * Tags a page view event for Microsoft Clarity with a consistent format.
 * Format: "viewed_<page_name>"
 */
export function tagPageView(pageName: string) {
  // Clarity tag: viewed_<page_name>
  Clarity.setTag('event', `viewed_${pageName.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase()}`);
}

/**
 * Tags a rage click event for Microsoft Clarity.
 */
export function tagRageClick() {
  // Clarity tag: rage_click_detected
  Clarity.setTag('event', 'rage_click_detected');
}
