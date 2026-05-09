import ScrollToTop from "@site/components/ScrollToTop";
import TrailingSlashEnforcer from "@site/components/TrailingSlashEnforcer";
import WcDniManager from "@site/components/layout/WcDniManager";
import AppRoutes from "./AppRoutes";

export default function AppRouterContent() {
  return (
    <>
      <ScrollToTop />
      <TrailingSlashEnforcer />
      <WcDniManager />
      <AppRoutes />
    </>
  );
}
