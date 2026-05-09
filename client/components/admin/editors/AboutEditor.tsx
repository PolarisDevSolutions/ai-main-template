import type { AboutPageContent } from "@/lib/cms/aboutPageTypes";
import SharedHeroEditor from "./SharedHeroEditor";
import { Section, ArrayEditor, ImageField, RichTextField, HeadingField, Input, Label, Textarea } from "./EditorShared";

interface AboutEditorProps {
  content: AboutPageContent;
  onChange: (c: AboutPageContent) => void;
}

export default function AboutEditor({ content, onChange }: AboutEditorProps) {
  const update = <K extends keyof AboutPageContent>(key: K, value: AboutPageContent[K]) => {
    onChange({ ...content, [key]: value });
  };

  return (
    <div className="space-y-6">
      <HeroSection content={content} update={update} />
      <StorySection content={content} update={update} />
      <MissionVisionSection content={content} update={update} />
      <TeamSection content={content} update={update} />
      <ValuesSection content={content} update={update} />
      <WhyChooseUsSection content={content} update={update} />
      <CTASection content={content} update={update} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
type Updater = <K extends keyof AboutPageContent>(key: K, value: AboutPageContent[K]) => void;
type SectionProps = { content: AboutPageContent; update: Updater };

function useHeadingTag(content: AboutPageContent, update: Updater) {
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
function StorySection({ content, update }: SectionProps) {
  const story = content.story;
  const set = (patch: Partial<typeof story>) => update("story", { ...story, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Our Story" defaultOpen={false}>
      <div className="grid gap-4">
        <div>
          <Label>Section Label</Label>
          <Input value={story.sectionLabel} onChange={(e) => set({ sectionLabel: e.target.value })} />
        </div>
        <HeadingField
          label="Heading"
          value={story.heading}
          onChange={(v) => set({ heading: v })}
          tag={ht.get("story.heading")}
          onTagChange={(t) => ht.set("story.heading", t)}
        />
        <RichTextField label="Description" value={story.description} onChange={(v) => set({ description: v })} />
        <p className="text-xs text-gray-500 italic">Phone number is managed in Site Settings &gt; Contact Info</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Contact Label</Label>
            <Input value={story.contactLabel} onChange={(e) => set({ contactLabel: e.target.value })} />
          </div>
          <div>
            <Label>Contact Text</Label>
            <Input value={story.contactText} onChange={(e) => set({ contactText: e.target.value })} />
          </div>
        </div>
        <ImageField label="Attorney Image" value={story.attorneyImage} onChange={(url) => set({ attorneyImage: url })} folder="team" />
        <div>
          <Label>Attorney Image Alt</Label>
          <Input value={story.attorneyImageAlt} onChange={(e) => set({ attorneyImageAlt: e.target.value })} />
        </div>

        <h4 className="font-medium mt-2">Features</h4>
        <ArrayEditor
          items={story.features}
          onChange={(items) => set({ features: items })}
          itemLabel="Feature"
          newItem={() => ({ number: String(story.features.length + 1), title: "", description: "" })}
          renderItem={(item, _, upd) => (
            <div className="grid gap-3">
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <Label>Number</Label>
                  <Input value={item.number} onChange={(e) => upd({ ...item, number: e.target.value })} />
                </div>
                <div className="col-span-3">
                  <Label>Title</Label>
                  <Input value={item.title} onChange={(e) => upd({ ...item, title: e.target.value })} />
                </div>
              </div>
              <RichTextField label="Description" value={item.description} onChange={(v) => upd({ ...item, description: v })} />
            </div>
          )}
        />

        <h4 className="font-medium mt-2">Stats</h4>
        <ArrayEditor
          items={story.stats}
          onChange={(items) => set({ stats: items })}
          itemLabel="Stat"
          newItem={() => ({ value: "", label: "" })}
          renderItem={(item, _, upd) => (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Value</Label>
                <Input value={item.value} onChange={(e) => upd({ ...item, value: e.target.value })} />
              </div>
              <div>
                <Label>Label</Label>
                <Input value={item.label} onChange={(e) => upd({ ...item, label: e.target.value })} />
              </div>
            </div>
          )}
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function MissionVisionSection({ content, update }: SectionProps) {
  const mv = content.missionVision;
  const set = (patch: Partial<typeof mv>) => update("missionVision", { ...mv, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Mission & Vision" defaultOpen={false}>
      <div className="grid gap-4">
        <h4 className="font-medium">Mission</h4>
        <HeadingField
          label="Heading"
          value={mv.mission.heading}
          onChange={(v) => set({ mission: { ...mv.mission, heading: v } })}
          tag={ht.get("mission.heading")}
          onTagChange={(t) => ht.set("mission.heading", t)}
        />
        <RichTextField label="Text" value={mv.mission.text} onChange={(v) => set({ mission: { ...mv.mission, text: v } })} />
        <hr />
        <h4 className="font-medium">Vision</h4>
        <HeadingField
          label="Heading"
          value={mv.vision.heading}
          onChange={(v) => set({ vision: { ...mv.vision, heading: v } })}
          tag={ht.get("vision.heading")}
          onTagChange={(t) => ht.set("vision.heading", t)}
        />
        <RichTextField label="Text" value={mv.vision.text} onChange={(v) => set({ vision: { ...mv.vision, text: v } })} />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function TeamSection({ content, update }: SectionProps) {
  const team = content.team;
  const set = (patch: Partial<typeof team>) => update("team", { ...team, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Team Members" defaultOpen={false}>
      <div className="grid gap-4">
        <div>
          <Label>Section Label</Label>
          <Input value={team.sectionLabel} onChange={(e) => set({ sectionLabel: e.target.value })} />
        </div>
        <HeadingField
          label="Heading"
          value={team.heading}
          onChange={(v) => set({ heading: v })}
          tag={ht.get("team.heading")}
          onTagChange={(t) => ht.set("team.heading", t)}
        />
        <ArrayEditor
          items={team.members}
          onChange={(items) => set({ members: items })}
          itemLabel="Member"
          newItem={() => ({ name: "", title: "", bio: "", image: "", imageAlt: "", specialties: [] })}
          renderItem={(item, _, upd) => (
            <div className="grid gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Name</Label>
                  <Input value={item.name} onChange={(e) => upd({ ...item, name: e.target.value })} />
                </div>
                <div>
                  <Label>Title</Label>
                  <Input value={item.title} onChange={(e) => upd({ ...item, title: e.target.value })} />
                </div>
              </div>
              <RichTextField label="Bio" value={item.bio} onChange={(v) => upd({ ...item, bio: v })} />
              <ImageField label="Photo" value={item.image} onChange={(url) => upd({ ...item, image: url })} folder="team" />
              <div>
                <Label>Photo Alt Text</Label>
                <Input value={item.imageAlt} onChange={(e) => upd({ ...item, imageAlt: e.target.value })} placeholder="Describe the photo" />
              </div>
              <div>
                <Label>Specialties (comma-separated)</Label>
                <Input
                  value={item.specialties.join(", ")}
                  onChange={(e) => upd({ ...item, specialties: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
                />
              </div>
            </div>
          )}
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function ValuesSection({ content, update }: SectionProps) {
  const values = content.values;
  const set = (patch: Partial<typeof values>) => update("values", { ...values, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Our Values" defaultOpen={false}>
      <div className="grid gap-4">
        <div>
          <Label>Section Label</Label>
          <Input value={values.sectionLabel} onChange={(e) => set({ sectionLabel: e.target.value })} />
        </div>
        <HeadingField
          label="Heading"
          value={values.heading}
          onChange={(v) => set({ heading: v })}
          tag={ht.get("values.heading")}
          onTagChange={(t) => ht.set("values.heading", t)}
        />
        <div>
          <Label>Subtitle</Label>
          <Input value={values.subtitle} onChange={(e) => set({ subtitle: e.target.value })} />
        </div>
        <ArrayEditor
          items={values.items}
          onChange={(items) => set({ items })}
          itemLabel="Value"
          newItem={() => ({ icon: "Star", title: "", description: "" })}
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
              <RichTextField label="Description" value={item.description} onChange={(v) => upd({ ...item, description: v })} />
            </div>
          )}
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function WhyChooseUsSection({ content, update }: SectionProps) {
  const wcu = content.whyChooseUs;
  const set = (patch: Partial<typeof wcu>) => update("whyChooseUs", { ...wcu, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Why Choose Us" defaultOpen={false}>
      <div className="grid gap-4">
        <div>
          <Label>Section Label</Label>
          <Input value={wcu.sectionLabel} onChange={(e) => set({ sectionLabel: e.target.value })} />
        </div>
        <HeadingField
          label="Heading"
          value={wcu.heading}
          onChange={(v) => set({ heading: v })}
          tag={ht.get("whyChooseUs.heading")}
          onTagChange={(t) => ht.set("whyChooseUs.heading", t)}
        />
        <RichTextField label="Description" value={wcu.description} onChange={(v) => set({ description: v })} />
        <ImageField label="Section Image" value={wcu.image} onChange={(url) => set({ image: url })} folder="about" />
        <div>
          <Label>Image Alt Text</Label>
          <Input value={wcu.imageAlt} onChange={(e) => set({ imageAlt: e.target.value })} />
        </div>
        <ArrayEditor
          items={wcu.items}
          onChange={(items) => set({ items })}
          itemLabel="Item"
          newItem={() => ({ number: String(wcu.items.length + 1), title: "", description: "" })}
          renderItem={(item, _, upd) => (
            <div className="grid gap-3">
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <Label>Number</Label>
                  <Input value={item.number} onChange={(e) => upd({ ...item, number: e.target.value })} />
                </div>
                <div className="col-span-3">
                  <Label>Title</Label>
                  <Input value={item.title} onChange={(e) => upd({ ...item, title: e.target.value })} />
                </div>
              </div>
              <RichTextField label="Description" value={item.description} onChange={(v) => upd({ ...item, description: v })} />
            </div>
          )}
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function CTASection({ content, update }: SectionProps) {
  const cta = content.cta;
  const set = (patch: Partial<typeof cta>) => update("cta", { ...cta, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Call to Action" defaultOpen={false}>
      <div className="grid gap-4">
        <HeadingField
          label="Heading"
          value={cta.heading}
          onChange={(v) => set({ heading: v })}
          tag={ht.get("cta.heading")}
          onTagChange={(t) => ht.set("cta.heading", t)}
        />
        <RichTextField label="Description" value={cta.description} onChange={(v) => set({ description: v })} />
        <p className="text-xs text-gray-500 italic">Phone number is managed in Site Settings &gt; Contact Info</p>
        <hr />
        <h4 className="font-medium">Secondary Button</h4>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Label</Label>
            <Input value={cta.secondaryButton.label} onChange={(e) => set({ secondaryButton: { ...cta.secondaryButton, label: e.target.value } })} />
          </div>
          <div>
            <Label>Sublabel</Label>
            <Input value={cta.secondaryButton.sublabel} onChange={(e) => set({ secondaryButton: { ...cta.secondaryButton, sublabel: e.target.value } })} />
          </div>
          <div>
            <Label>Link</Label>
            <Input value={cta.secondaryButton.link} onChange={(e) => set({ secondaryButton: { ...cta.secondaryButton, link: e.target.value } })} />
          </div>
        </div>
      </div>
    </Section>
  );
}
