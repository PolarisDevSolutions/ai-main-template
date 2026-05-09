import type { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async/lib/index.esm.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import {
  SiteSettingsProvider,
  type SiteSettings,
} from "@site/contexts/SiteSettingsContext";

interface AppProvidersProps {
  children: ReactNode;
  queryClient: QueryClient;
  initialSiteSettings?: SiteSettings | null;
  helmetContext?: unknown;
}

export default function AppProviders({
  children,
  queryClient,
  initialSiteSettings,
  helmetContext,
}: AppProvidersProps) {
  return (
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <SiteSettingsProvider initialSettings={initialSiteSettings}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {children}
          </TooltipProvider>
        </SiteSettingsProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
