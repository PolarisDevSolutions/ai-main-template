import { QueryClient } from "@tanstack/react-query";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import AppProviders from "@site/app/AppProviders";
import AppRouterContent from "@site/app/AppRouterContent";
import {
  setServerPageData,
  type InjectedPageData,
} from "@site/lib/pageDataInjection";

interface RenderPageOptions {
  url: string;
  initialData: InjectedPageData;
}

export function renderPage({ url, initialData }: RenderPageOptions) {
  const helmetContext: Record<string, any> = {};
  const queryClient = new QueryClient();

  setServerPageData(initialData);

  try {
    const html = renderToString(
      <AppProviders
        queryClient={queryClient}
        initialSiteSettings={initialData.siteSettings}
        helmetContext={helmetContext}
      >
        <StaticRouter location={url}>
          <AppRouterContent />
        </StaticRouter>
      </AppProviders>,
    );

    return {
      html,
      helmet: helmetContext.helmet,
    };
  } finally {
    setServerPageData(null);
  }
}
