import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Index from "@site/pages/Index";
import AboutUs from "@site/pages/AboutUs";
import PracticeAreas from "@site/pages/PracticeAreas";
import PracticeAreaPage from "@site/pages/PracticeAreaPage";
import ContactPage from "@site/pages/ContactPage";
import BlogIndex from "@site/pages/BlogIndex";
import BlogPost from "@site/pages/BlogPost";
import DynamicPage from "@site/pages/DynamicPage";

const AdminRoutes = lazy(() => import("@site/pages/AdminRoutes"));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about/" element={<AboutUs />} />
      <Route path="/practice-areas/" element={<PracticeAreas />} />
      <Route path="/practice-areas/:slug/" element={<PracticeAreaPage />} />
      <Route path="/contact/" element={<ContactPage />} />
      <Route path="/blog/" element={<BlogIndex />} />
      <Route path="/blog/:slug/" element={<BlogPost />} />
      <Route
        path="/admin/*"
        element={
          <Suspense fallback={null}>
            <AdminRoutes />
          </Suspense>
        }
      />
      <Route path="*" element={<DynamicPage />} />
    </Routes>
  );
}
