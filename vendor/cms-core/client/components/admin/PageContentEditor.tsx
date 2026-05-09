import HomeEditor from "@site/components/admin/editors/HomeEditor";
import AboutEditor from "@site/components/admin/editors/AboutEditor";
import ContactEditor from "@site/components/admin/editors/ContactEditor";
import PracticeAreasEditor from "@site/components/admin/editors/PracticeAreasEditor";
import PracticeAreaPageEditor from "@site/components/admin/editors/PracticeAreaPageEditor";
import type { StructuredPageKind } from "@site/lib/pageIdentity";
import { Textarea } from "@/components/ui/textarea";

interface PageContentEditorProps {
  pageKind: StructuredPageKind;
  content: unknown;
  onChange: (content: unknown) => void;
}

export default function PageContentEditor({ pageKind, content, onChange }: PageContentEditorProps) {
  if (pageKind === "home") {
    return <HomeEditor content={content as any} onChange={onChange as any} />;
  }

  if (pageKind === "about") {
    return <AboutEditor content={content as any} onChange={onChange as any} />;
  }

  if (pageKind === "contact") {
    return <ContactEditor content={content as any} onChange={onChange as any} />;
  }

  if (pageKind === "practice-areas") {
    return <PracticeAreasEditor content={content as any} onChange={onChange as any} />;
  }

  if (pageKind === "practice-area") {
    return <PracticeAreaPageEditor content={content as any} onChange={onChange as any} />;
  }

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
