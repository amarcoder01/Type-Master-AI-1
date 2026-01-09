import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initWebVitals } from "./lib/webvitals";
import { initAnalytics } from "./lib/analytics";
import { checkAndRecoverVersion, saveCurrentVersion, initVisibilityChangeListener } from "./lib/version-manager";
import { checkQueryCacheVersion } from "./lib/queryClient";

// Initialize analytics and web vitals
initWebVitals();
initAnalytics();

/**
 * Bootstrap the application with version check
 * 
 * This checks if there's a version mismatch between the currently loaded
 * code and what's stored in the browser. If there is, it clears caches
 * and reloads to ensure fresh content.
 */
async function bootstrap() {
  try {
    // Check for version mismatch and perform recovery if needed
    const needsReload = await checkAndRecoverVersion();
    
    if (needsReload) {
      console.log('[Bootstrap] Version mismatch detected, reloading...');
      // Small delay to ensure cleanup completes
      await new Promise(resolve => setTimeout(resolve, 100));
      window.location.reload();
      return; // Don't render - we're reloading
    }
    
    // Ensure version is saved
    saveCurrentVersion();
    
    // Check and clear query cache if version changed
    checkQueryCacheVersion();
    
    // Initialize visibility change listener for update detection
    initVisibilityChangeListener();
    
    // Render the app
    renderApp();
  } catch (error) {
    console.error('[Bootstrap] Error during version check:', error);
    // If version check fails, still render the app
    renderApp();
  }
}

function renderApp() {
  const container = document.getElementById("root");
  if (!container) {
    console.error('[Bootstrap] Root element not found');
    return;
  }
  
  const root = createRoot(container);
  root.render(<App />);
}

// Start the app
bootstrap();
