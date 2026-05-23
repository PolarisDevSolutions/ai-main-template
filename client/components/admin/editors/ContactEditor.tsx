import type { ContactPageContent } from "@/lib/cms/contactPageTypes";
import SharedHeroEditor from "./SharedHeroEditor";
import { Section, ArrayEditor, RichTextField, HeadingField, Input, Label, Textarea } from "./EditorShared";

interface ContactEditorProps {
  content: ContactPageContent;
  onChange: (c: ContactPageContent) => void;
}

export default function ContactEditor({ content, onChange }: ContactEditorProps) {
  const update = <K extends keyof ContactPageContent>(key: K, value: ContactPageContent[K]) => {
    onChange({ ...content, [key]: value });
  };

  return (
    <div className="space-y-6">
      <HeroSection content={content} update={update} />
      <IntroSection content={content} update={update} />
      <ContactMethodsSection content={content} update={update} />
      <FormSection content={content} update={update} />
      <OfficeHoursSection content={content} update={update} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
type Updater = <K extends keyof ContactPageContent>(key: K, value: ContactPageContent[K]) => void;
type SectionProps = { content: ContactPageContent; update: Updater };

function useHeadingTag(content: ContactPageContent, update: Updater) {
  return {
    get: (key: string) => content.headingTags?.[key] ?? "h2",
    set: (key: string, tag: string) =>
      update("headingTags", { ...content.headingTags, [key]: tag }),
  };
}

/* ------------------------------------------------------------------ */
function HeroSection({ content, update }: SectionProps) {
  return (
    <Section title="Hero Section">
      <SharedHeroEditor
        hero={content.hero}
        onChange={(hero) => update("hero", hero)}
      />
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function IntroSection({ content, update }: SectionProps) {
  const intro = content.intro;
  const set = (patch: Partial<typeof intro>) => update("intro", { ...intro, ...patch });

  return (
    <Section title="Kontakt - Intro" defaultOpen={false}>
      <div className="grid gap-4">
        <div>
          <Label>Title</Label>
          <Input value={intro.title} onChange={(e) => set({ title: e.target.value })} />
        </div>
        <RichTextField label="Content" value={intro.content} onChange={(v) => set({ content: v })} />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function ContactMethodsSection({ content, update }: SectionProps) {
  return (
    <Section title="Contact Methods" defaultOpen={false}>
      <ArrayEditor
        items={content.contactMethods.methods}
        onChange={(items) => update("contactMethods", { methods: items })}
        itemLabel="Method"
        newItem={() => ({ icon: "Phone", title: "", detail: "", email: "", subDetail: "" })}
        renderItem={(item, _, upd) => (
          <div className="grid gap-3">
            <div className="grid grid-cols-4 gap-3">
              <div>
                <Label>Icon</Label>
                <Input value={item.icon} onChange={(e) => upd({ ...item, icon: e.target.value })} placeholder="Lucide icon name" />
              </div>
              <div className="col-span-3">
                <Label>Title</Label>
                <Input value={item.title} onChange={(e) => upd({ ...item, title: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>{item.icon === "Mail" ? "Email Address" : "Detail"}</Label>
                <Input
                  value={item.icon === "Mail" ? item.email ?? "" : item.detail}
                  onChange={(e) =>
                    upd({
                      ...item,
                      ...(item.icon === "Mail"
                        ? { email: e.target.value }
                        : { detail: e.target.value }),
                    })
                  }
                />
              </div>
              <div>
                <Label>Sub-Detail</Label>
                <Input value={item.subDetail} onChange={(e) => upd({ ...item, subDetail: e.target.value })} />
              </div>
            </div>
          </div>
        )}
      />
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function FormSection({ content, update }: SectionProps) {
  const form = content.form;
  const set = (patch: Partial<typeof form>) => update("form", { ...form, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Contact Form" defaultOpen={false}>
      <div className="grid gap-4">
        <HeadingField
          label="Heading"
          value={form.heading}
          onChange={(v) => set({ heading: v })}
          tag={ht.get("form.heading")}
          onTagChange={(t) => ht.set("form.heading", t)}
        />
        <RichTextField label="Subtext" value={form.subtext} onChange={(v) => set({ subtext: v })} />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function OfficeHoursSection({ content, update }: SectionProps) {
  const oh = content.officeHours;
  const set = (patch: Partial<typeof oh>) => update("officeHours", { ...oh, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Office Hours" defaultOpen={false}>
      <div className="grid gap-4">
        <HeadingField
          label="Heading"
          value={oh.heading}
          onChange={(v) => set({ heading: v })}
          tag={ht.get("officeHours.heading")}
          onTagChange={(t) => ht.set("officeHours.heading", t)}
        />
        <ArrayEditor
          items={oh.items}
          onChange={(items) => set({ items })}
          itemLabel="Schedule"
          newItem={() => ({ day: "", hours: "" })}
          renderItem={(item, _, upd) => (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Day</Label>
                <Input value={item.day} onChange={(e) => upd({ ...item, day: e.target.value })} />
              </div>
              <div>
                <Label>Hours</Label>
                <Input value={item.hours} onChange={(e) => upd({ ...item, hours: e.target.value })} />
              </div>
            </div>
          )}
        />
        <div>
          <Label>Note</Label>
          <Textarea value={oh.note} onChange={(e) => set({ note: e.target.value })} rows={2} />
        </div>
      </div>
    </Section>
  );
}
