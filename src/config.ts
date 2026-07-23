export const SITE_URL = "https://inkprep.app";
export const SITE_NAME = "Inkprep";

// Contact / legal
export const SUPPORT_EMAIL = "tattooinkprep@gmail.com";
export const LEGAL_ENTITY = "Guillermo Andújar Martínez"; // data controller (GDPR)

// Store links — single source of truth.
// iOS is live on the App Store; Android (Google Play) is planned later —
// flip PLAY_STORE_AVAILABLE and set the real URL when it ships.
export const APP_STORE_URL = "https://apps.apple.com/us/app/tattoo-inkprep/id6779962402";
export const APP_STORE_AVAILABLE = true;

export const PLAY_STORE_URL = "#";
export const PLAY_STORE_AVAILABLE = false;

// Analytics — loaded ONLY after the user accepts the consent banner.
// Recommended: Plausible (cookieless, EU-hosted). Leave ANALYTICS_DOMAIN empty
// to ship the consent banner without yet wiring a provider; set it when ready.
export const ANALYTICS_DOMAIN = ""; // e.g. "inkprep.app"
export const ANALYTICS_SRC = "https://plausible.io/js/script.js";
