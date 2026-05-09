import { BrowserRouter } from "react-router-dom";
import { createRoot, hydrateRoot } from "react-dom/client";
import { QueryClient } from "@tanstack/react-query";
import AppProviders from "@site/app/AppProviders";
import AppRouterContent from "@site/app/AppRouterContent";
import {
  getInjectedPageData,
  normalizeUrlPath,
} from "@site/lib/pageDataInjection";

const queryClient = new QueryClient();
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const initialPath = normalizeUrlPath(window.location.pathname);
const initialSiteSettings = getInjectedPageData(initialPath)?.siteSettings;

const app = (
  <AppProviders
    queryClient={queryClient}
    initialSiteSettings={initialSiteSettings}
  >
    <BrowserRouter>
      <AppRouterContent />
    </BrowserRouter>
  </AppProviders>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
