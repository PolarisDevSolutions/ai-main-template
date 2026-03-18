import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { refreshWhatConvertsDni } from "@site/lib/whatconvertsRefresh";

/**
 * Invisible component that triggers a WhatConverts DNI rescan
 * whenever the SPA route changes. Must live inside <BrowserRouter>.
 */
export default function WcDniManager() {
  const location = useLocation();

  useEffect(() => {
    refreshWhatConvertsDni("route-change");
  }, [location.pathname]);

  return null;
}
