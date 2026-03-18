import HomeEditor from "@site/components/admin/editors/HomeEditor";
import AboutEditor from "@site/components/admin/editors/AboutEditor";
import ContactEditor from "@site/components/admin/editors/ContactEditor";
import PracticeAreasEditor from "@site/components/admin/editors/PracticeAreasEditor";
import PracticeAreaPageEditor from "@site/components/admin/editors/PracticeAreaPageEditor";
import { Textarea } from "@/components/ui/textarea";

interface PageContentEditorProps {
  pageKey: string;
  content: unknown;
  onChange: (content: unknown) => void;
  pageType?: string;
}

export default function PageContentEditor({ pageKey, content, onChange, pageType }: PageContentEditorProps) {
  // Normalize: strip trailing slash (except root "/") so "/about/" matches "/about"
  const raw = typeof pageKey === "string" ? pageKey : "";
  const urlPath = raw === "/" ? raw : raw.replace(/\/+$/, "");

  if (urlPath === "/" || urlPath === "/home")
    return <HomeEditor content={content as any} onChange={onChange as any} />;

  if (urlPath === "/about")
    return <AboutEditor content={content as any} onChange={onChange as any} />;

  if (urlPath === "/contact")
    return <ContactEditor content={content as any} onChange={onChange as any} />;

  if (urlPath === "/practice-areas")
    return <PracticeAreasEditor content={content as any} onChange={onChange as any} />;

  // Individual practice area pages — detected by URL prefix OR page_type + structured content
  if (
    urlPath.startsWith("/practice-areas/") ||
    (pageType === "practice" && content && !Array.isArray(content) && typeof content === "object")
  )
    return <PracticeAreaPageEditor content={content as any} onChange={onChange as any} />;

  // Fallback: raw JSON editor for unknown page types
  return (
    <Textarea
      value={JSON.stringify(content, null, 2)}
      onChange={(e) => {
        try {
          onChange(JSON.parse(e.target.value));
        } catch {
          // Allow typing invalid JSON temporarily
        }
      }}
      rows={20}
      className="font-mono text-sm"
    />
  );
}
