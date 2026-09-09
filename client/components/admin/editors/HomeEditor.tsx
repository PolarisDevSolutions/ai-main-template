import type { HomePageContent } from "@/lib/cms/homePageTypes";
import SharedHeroEditor from "./SharedHeroEditor";
import { Section, ArrayEditor, ImageField, RichTextField, HeadingField, Input, Label, Textarea } from "./EditorShared";
import { Switch } from "@/components/ui/switch";

interface HomeEditorProps {
  content: HomePageContent;
  onChange: (c: HomePageContent) => void;
}

export default function HomeEditor({ content, onChange }: HomeEditorProps) {
  const update = <K extends keyof HomePageContent>(key: K, value: HomePageContent[K]) => {
    onChange({ ...content, [key]: value });
  };

  return (
    <div className="space-y-6">
      <HeroSection content={content} update={update} />
      <PartnerLogosSection content={content} update={update} />
      <AboutSectionEditor content={content} update={update} />
      <PracticeAreasIntroSection content={content} update={update} />
      <PracticeAreasItemsSection content={content} update={update} />
      <ServicesOutroSection content={content} update={update} />
      <WhyNeedUsSection content={content} update={update} />
      {/* Testimonials section removed from frontend — keep data intact */}
      <FeaturedProjectsSection content={content} update={update} />
      <ProcessSection content={content} update={update} />
      <GoogleReviewsSection content={content} update={update} />
      <FaqSectionEditor content={content} update={update} />
      <ContactSectionEditor content={content} update={update} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
type Updater = <K extends keyof HomePageContent>(key: K, value: HomePageContent[K]) => void;
type SectionProps = { content: HomePageContent; update: Updater };

function useHeadingTag(content: HomePageContent, update: Updater) {
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
        onChange={(hero) => update("hero", hero as HomePageContent["hero"])}
      />
      <div className="grid gap-4 border-t pt-4">
        <div>
          <Label>Tagline below H1</Label>
          <Input value={content.hero.tagline} onChange={(e) => update("hero", { ...content.hero, tagline: e.target.value })} />
        </div>
        <h4 className="font-medium">Hero Form</h4>
        <FormFields value={content.hero.form} onChange={(form) => update("hero", { ...content.hero, form })} />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function PartnerLogosSection({ content, update }: SectionProps) {
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Partner Logos" defaultOpen={false}>
      <div className="grid gap-4 mb-4">
        <HeadingField
          label="Section Title"
          value={content.partnerLogosTitle}
          onChange={(v) => update("partnerLogosTitle", v)}
          tag={ht.get("partnerLogos.title") === "h2" ? "h3" : ht.get("partnerLogos.title")}
          onTagChange={(t) => ht.set("partnerLogos.title", t)}
        />
      </div>
      <ArrayEditor
        items={content.partnerLogos}
        onChange={(items) => update("partnerLogos", items)}
        itemLabel="Logo"
        newItem={() => ({ src: "", alt: "" })}
        renderItem={(item, _, upd) => (
          <div className="grid gap-3">
            <ImageField label="Logo Image" value={item.src} onChange={(url) => upd({ ...item, src: url })} folder="logos" />
            <div>
              <Label>Alt Text</Label>
              <Input value={item.alt} onChange={(e) => upd({ ...item, alt: e.target.value })} />
            </div>
          </div>
        )}
      />
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function AboutSectionEditor({ content, update }: SectionProps) {
  const about = content.about;
  const set = (patch: Partial<typeof about>) => update("about", { ...about, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="About Section" defaultOpen={false}>
      <div className="grid gap-4">
        <div>
          <Label>Section Label</Label>
          <Input value={about.sectionLabel} onChange={(e) => set({ sectionLabel: e.target.value })} />
        </div>
        <HeadingField
          label="Heading"
          value={about.heading}
          onChange={(v) => set({ heading: v })}
          tag={ht.get("about.heading")}
          onTagChange={(t) => ht.set("about.heading", t)}
        />
        <RichTextField label="Description" value={about.description} onChange={(v) => set({ description: v })} />
        <div>
          <Label>About Link</Label>
          <Input value={about.contactLink || ""} onChange={(e) => set({ contactLink: e.target.value })} />
        </div>
        <p className="text-xs text-gray-500 italic">Phone number is managed in Site Settings &gt; Contact Info</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Contact Label</Label>
            <Input value={about.contactLabel} onChange={(e) => set({ contactLabel: e.target.value })} />
          </div>
          <div>
            <Label>Contact Text</Label>
            <Input value={about.contactText} onChange={(e) => set({ contactText: e.target.value })} />
          </div>
        </div>
        <ImageField label="Attorney Image" value={about.attorneyImage} onChange={(url) => set({ attorneyImage: url })} folder="team" />
        <div>
          <Label>Attorney Image Alt</Label>
          <Input value={about.attorneyImageAlt} onChange={(e) => set({ attorneyImageAlt: e.target.value })} />
        </div>

        <h4 className="font-medium mt-2">Features</h4>
        <ArrayEditor
          items={about.features}
          onChange={(items) => set({ features: items })}
          itemLabel="Feature"
          newItem={() => ({ number: String(about.features.length + 1), title: "", description: "" })}
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
          items={about.stats}
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
function PracticeAreasIntroSection({ content, update }: SectionProps) {
  const intro = content.practiceAreasIntro;
  const set = (patch: Partial<typeof intro>) => update("practiceAreasIntro", { ...intro, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Practice Areas Intro" defaultOpen={false}>
      <div className="grid gap-4">
        <HeadingField
          label="Title"
          value={intro.sectionLabel}
          onChange={(v) => set({ sectionLabel: v })}
          tag={ht.get("practiceAreasIntro.sectionLabel")}
          onTagChange={(t) => ht.set("practiceAreasIntro.sectionLabel", t)}
        />
        <div>
          <Label>Heading</Label>
          <Input value={intro.heading} onChange={(e) => set({ heading: e.target.value })} />
        </div>
        <RichTextField label="Description" value={intro.description} onChange={(description) => set({ description })} />
        <div className="grid gap-4 md:grid-cols-3">
          <div><Label>Button Eyebrow</Label><Input value={intro.buttonEyebrow} onChange={(e) => set({ buttonEyebrow: e.target.value })} /></div>
          <div><Label>Button Label</Label><Input value={intro.buttonLabel} onChange={(e) => set({ buttonLabel: e.target.value })} /></div>
          <div><Label>Button Link</Label><Input value={intro.buttonLink} onChange={(e) => set({ buttonLink: e.target.value })} /></div>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function PracticeAreasItemsSection({ content, update }: SectionProps) {
  return (
    <Section title="Practice Areas Grid" defaultOpen={false}>
      <ArrayEditor
        items={content.practiceAreas}
        onChange={(items) => update("practiceAreas", items)}
        itemLabel="Practice Area"
        newItem={() => ({ title: "", description: "", image: "", imageAlt: "", link: "", linkLabel: "" })}
        renderItem={(item, _, upd) => (
          <div className="grid gap-3">
            <div>
              <Label>Title</Label>
              <Input value={item.title} onChange={(e) => upd({ ...item, title: e.target.value })} />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={item.description} onChange={(e) => upd({ ...item, description: e.target.value })} rows={3} />
            </div>
            <ImageField label="Image" value={item.image} onChange={(url) => upd({ ...item, image: url })} folder="practice-areas" />
            <div>
              <Label>Image Alt Text</Label>
              <Input value={item.imageAlt} onChange={(e) => upd({ ...item, imageAlt: e.target.value })} placeholder="Describe the image" />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div><Label>Link Label</Label><Input value={item.linkLabel || ""} onChange={(e) => upd({ ...item, linkLabel: e.target.value })} /></div>
              <div><Label>Link</Label><Input value={item.link} onChange={(e) => upd({ ...item, link: e.target.value })} /></div>
            </div>
          </div>
        )}
      />
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function ServicesOutroSection({ content, update }: SectionProps) {
  return (
    <Section title="Services Outro" defaultOpen={false}>
      <RichTextField
        label="Text and links"
        value={content.servicesOutro.text}
        onChange={(text) => update("servicesOutro", { text })}
      />
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function WhyNeedUsSection({ content, update }: SectionProps) {
  const section = content.whyNeedUs;
  const set = (patch: Partial<typeof section>) => update("whyNeedUs", { ...section, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Why You Need Us" defaultOpen={false}>
      <div className="grid gap-4">
        <HeadingField
          label="Title"
          value={section.heading}
          onChange={(v) => set({ heading: v })}
          tag={ht.get("whyNeedUs.heading")}
          onTagChange={(t) => ht.set("whyNeedUs.heading", t)}
        />
        <RichTextField label="Brief Intro" value={section.intro} onChange={(v) => set({ intro: v })} />
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>CTA Button Label</Label>
            <Input value={section.buttonLabel} onChange={(e) => set({ buttonLabel: e.target.value })} />
          </div>
          <div>
            <Label>CTA Button Link</Label>
            <Input value={section.buttonLink} onChange={(e) => set({ buttonLink: e.target.value })} placeholder="/kontakt/" />
          </div>
        </div>
        <h4 className="font-medium">Feature Cards</h4>
        <ArrayEditor
          items={section.cards}
          onChange={(items) => set({ cards: items })}
          itemLabel="Card"
          newItem={() => ({ title: "", description: "" })}
          renderItem={(item, _, upd) => (
            <div className="grid gap-3">
              <div>
                <Label>Title</Label>
                <Input value={item.title} onChange={(e) => upd({ ...item, title: e.target.value })} />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea value={item.description} onChange={(e) => upd({ ...item, description: e.target.value })} rows={3} />
              </div>
            </div>
          )}
        />
        <RichTextField label="Closing Paragraph" value={section.closingParagraph} onChange={(v) => set({ closingParagraph: v })} />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function TestimonialsSection({ content, update }: SectionProps) {
  const t = content.testimonials;
  const set = (patch: Partial<typeof t>) => update("testimonials", { ...t, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Testimonials" defaultOpen={false}>
      <div className="grid gap-4">
        <div>
          <Label>Section Label</Label>
          <Input value={t.sectionLabel} onChange={(e) => set({ sectionLabel: e.target.value })} />
        </div>
        <HeadingField
          label="Heading"
          value={t.heading}
          onChange={(v) => set({ heading: v })}
          tag={ht.get("testimonials.heading")}
          onTagChange={(t2) => ht.set("testimonials.heading", t2)}
        />
        <ImageField label="Background Image" value={t.backgroundImage} onChange={(url) => set({ backgroundImage: url })} folder="backgrounds" />
        <div>
          <Label>Background Image Alt Text</Label>
          <Input value={t.backgroundImageAlt || ""} onChange={(e) => set({ backgroundImageAlt: e.target.value })} placeholder="Describe the background image" />
        </div>
        <ArrayEditor
          items={t.items}
          onChange={(items) => set({ items })}
          itemLabel="Testimonial"
          newItem={() => ({ text: "", author: "", ratingImage: "", ratingImageAlt: "" })}
          renderItem={(item, _, upd) => (
            <div className="grid gap-3">
              <div>
                <Label>Author</Label>
                <Input value={item.author} onChange={(e) => upd({ ...item, author: e.target.value })} />
              </div>
              <RichTextField label="Text" value={item.text} onChange={(v) => upd({ ...item, text: v })} />
              <ImageField label="Rating Image" value={item.ratingImage} onChange={(url) => upd({ ...item, ratingImage: url })} folder="logos" />
              <div>
                <Label>Rating Image Alt Text</Label>
                <Input value={item.ratingImageAlt || ""} onChange={(e) => upd({ ...item, ratingImageAlt: e.target.value })} placeholder="e.g. 5 star rating" />
              </div>
            </div>
          )}
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function FeaturedProjectsSection({ content, update }: SectionProps) {
  const section = content.featuredProjects;
  const set = (patch: Partial<typeof section>) => update("featuredProjects", { ...section, ...patch });

  return (
    <Section title="Featured Projects" defaultOpen={false}>
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <Label>Show section publicly</Label>
          <Switch checked={section.enabled} onCheckedChange={(enabled) => set({ enabled })} />
        </div>
        <div><Label>Section Label</Label><Input value={section.sectionLabel} onChange={(e) => set({ sectionLabel: e.target.value })} /></div>
        <div><Label>Heading</Label><Input value={section.heading} onChange={(e) => set({ heading: e.target.value })} /></div>
        <ArrayEditor
          items={section.projects}
          onChange={(projects) => set({ projects })}
          itemLabel="Project"
          newItem={() => ({ name: "", industry: "", goal: "", work: "", image: "", imageAlt: "", link: "", result: "", measurementPeriod: "" })}
          renderItem={(item, _, upd) => (
            <div className="grid gap-3">
              <div className="grid gap-3 md:grid-cols-2">
                <div><Label>Project / Client</Label><Input value={item.name} onChange={(e) => upd({ ...item, name: e.target.value })} /></div>
                <div><Label>Industry</Label><Input value={item.industry} onChange={(e) => upd({ ...item, industry: e.target.value })} /></div>
              </div>
              <RichTextField label="Goal or problem" value={item.goal} onChange={(goal) => upd({ ...item, goal })} />
              <RichTextField label="Work delivered" value={item.work} onChange={(work) => upd({ ...item, work })} />
              <ImageField label="Image" value={item.image} onChange={(image) => upd({ ...item, image })} folder="projects" />
              <div><Label>Image Alt</Label><Input value={item.imageAlt} onChange={(e) => upd({ ...item, imageAlt: e.target.value })} /></div>
              <div><Label>Optional Link</Label><Input value={item.link} onChange={(e) => upd({ ...item, link: e.target.value })} /></div>
              <RichTextField label="Optional measured result" value={item.result} onChange={(result) => upd({ ...item, result })} />
              <div><Label>Measurement Period</Label><Input value={item.measurementPeriod} onChange={(e) => upd({ ...item, measurementPeriod: e.target.value })} /></div>
            </div>
          )}
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function ProcessSection({ content, update }: SectionProps) {
  const p = content.process;
  const set = (patch: Partial<typeof p>) => update("process", { ...p, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Process Steps" defaultOpen={false}>
      <div className="grid gap-4">
        <div>
          <Label>Section Label</Label>
          <Input value={p.sectionLabel} onChange={(e) => set({ sectionLabel: e.target.value })} />
        </div>
        <HeadingField
          label="Heading Line 1"
          value={p.headingLine1}
          onChange={(v) => set({ headingLine1: v })}
          tag={ht.get("process.heading")}
          onTagChange={(t) => ht.set("process.heading", t)}
        />
        <div>
          <Label>Heading Line 2</Label>
          <Input value={p.headingLine2} onChange={(e) => set({ headingLine2: e.target.value })} />
        </div>
        <ArrayEditor
          items={p.steps}
          onChange={(items) => set({ steps: items })}
          itemLabel="Step"
          newItem={() => ({ number: "", title: "", description: "" })}
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
function GoogleReviewsSection({ content, update }: SectionProps) {
  const r = content.googleReviews;
  const set = (patch: Partial<typeof r>) => update("googleReviews", { ...r, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Google Reviews" defaultOpen={false}>
      <div className="grid gap-4">
        <div>
          <Label>Section Label</Label>
          <Input value={r.sectionLabel} onChange={(e) => set({ sectionLabel: e.target.value })} />
        </div>
        <HeadingField
          label="Heading"
          value={r.heading}
          onChange={(v) => set({ heading: v })}
          tag={ht.get("googleReviews.heading")}
          onTagChange={(t) => ht.set("googleReviews.heading", t)}
        />
        <RichTextField label="Description" value={r.description} onChange={(v) => set({ description: v })} />
        <ArrayEditor
          items={r.reviews}
          onChange={(items) => set({ reviews: items })}
          itemLabel="Review"
          newItem={() => ({ text: "", author: "", ratingImage: "", ratingImageAlt: "", sourceUrl: "" })}
          renderItem={(item, _, upd) => (
            <div className="grid gap-3">
              <div>
                <Label>Author</Label>
                <Input value={item.author} onChange={(e) => upd({ ...item, author: e.target.value })} />
              </div>
              <RichTextField label="Review Text" value={item.text} onChange={(v) => upd({ ...item, text: v })} />
              <ImageField label="Rating Image" value={item.ratingImage} onChange={(url) => upd({ ...item, ratingImage: url })} folder="logos" />
              <div>
                <Label>Rating Image Alt Text</Label>
                <Input value={item.ratingImageAlt || ""} onChange={(e) => upd({ ...item, ratingImageAlt: e.target.value })} placeholder="e.g. 5 star rating" />
              </div>
              <div>
                <Label>Source URL</Label>
                <Input value={item.sourceUrl || ""} onChange={(e) => upd({ ...item, sourceUrl: e.target.value })} />
              </div>
            </div>
          )}
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function FaqSectionEditor({ content, update }: SectionProps) {
  const faq = content.faq;
  const set = (patch: Partial<typeof faq>) => update("faq", { ...faq, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="FAQ Section" defaultOpen={false}>
      <div className="grid gap-4">
        <HeadingField
          label="Heading"
          value={faq.heading}
          onChange={(v) => set({ heading: v })}
          tag={ht.get("faq.heading")}
          onTagChange={(t) => ht.set("faq.heading", t)}
        />
        <RichTextField label="Description" value={faq.description} onChange={(v) => set({ description: v })} />
        <ArrayEditor
          items={faq.items}
          onChange={(items) => set({ items })}
          itemLabel="FAQ"
          newItem={() => ({ question: "", answer: "" })}
          renderItem={(item, _, upd) => (
            <div className="grid gap-3">
              <div>
                <Label>Question</Label>
                <Input value={item.question} onChange={(e) => upd({ ...item, question: e.target.value })} />
              </div>
              <RichTextField label="Answer" value={item.answer} onChange={(v) => upd({ ...item, answer: v })} />
            </div>
          )}
        />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
function FormFields({
  value,
  onChange,
  showExtendedFields = false,
}: {
  value: HomePageContent["hero"]["form"] | HomePageContent["contact"]["form"];
  onChange: (value: any) => void;
  showExtendedFields?: boolean;
}) {
  const set = (patch: Record<string, string>) => onChange({ ...value, ...patch });

  return (
    <div className="grid gap-4">
      <div className="grid gap-3 md:grid-cols-2">
        <div><Label>First Name Placeholder</Label><Input value={value.firstNamePlaceholder} onChange={(e) => set({ firstNamePlaceholder: e.target.value })} /></div>
        <div><Label>Last Name Placeholder</Label><Input value={value.lastNamePlaceholder} onChange={(e) => set({ lastNamePlaceholder: e.target.value })} /></div>
        <div><Label>Email Placeholder</Label><Input value={value.emailPlaceholder} onChange={(e) => set({ emailPlaceholder: e.target.value })} /></div>
        <div><Label>Phone Placeholder</Label><Input value={value.phonePlaceholder} onChange={(e) => set({ phonePlaceholder: e.target.value })} /></div>
        {showExtendedFields && "websitePlaceholder" in value && (
          <>
            <div><Label>Website Placeholder</Label><Input value={value.websitePlaceholder} onChange={(e) => set({ websitePlaceholder: e.target.value })} /></div>
            <div><Label>Project Placeholder</Label><Input value={value.projectPlaceholder} onChange={(e) => set({ projectPlaceholder: e.target.value })} /></div>
          </>
        )}
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <div><Label>Consent Before Link</Label><Input value={value.consentBefore} onChange={(e) => set({ consentBefore: e.target.value })} /></div>
        <div><Label>Privacy Link Label</Label><Input value={value.privacyLabel} onChange={(e) => set({ privacyLabel: e.target.value })} /></div>
        <div><Label>Privacy Link</Label><Input value={value.privacyLink} onChange={(e) => set({ privacyLink: e.target.value })} /></div>
      </div>
      <div><Label>Consent After Link</Label><Input value={value.consentAfter} onChange={(e) => set({ consentAfter: e.target.value })} /></div>
      <div className="grid gap-3 md:grid-cols-2">
        <div><Label>Submit Label</Label><Input value={value.submitLabel} onChange={(e) => set({ submitLabel: e.target.value })} /></div>
        <div><Label>Submitting Label</Label><Input value={value.submittingLabel} onChange={(e) => set({ submittingLabel: e.target.value })} /></div>
        <div><Label>Success Message</Label><Input value={value.successMessage} onChange={(e) => set({ successMessage: e.target.value })} /></div>
        <div><Label>Error Message</Label><Input value={value.errorMessage} onChange={(e) => set({ errorMessage: e.target.value })} /></div>
        <div><Label>Required Field Message</Label><Input value={value.requiredMessage} onChange={(e) => set({ requiredMessage: e.target.value })} /></div>
        <div><Label>Email Error Message</Label><Input value={value.emailMessage} onChange={(e) => set({ emailMessage: e.target.value })} /></div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
function ContactSectionEditor({ content, update }: SectionProps) {
  const c = content.contact;
  const set = (patch: Partial<typeof c>) => update("contact", { ...c, ...patch });
  const ht = useHeadingTag(content, update);

  return (
    <Section title="Contact Section" defaultOpen={false}>
      <div className="grid gap-4">
        <div>
          <Label>Section Label</Label>
          <Input value={c.sectionLabel} onChange={(e) => set({ sectionLabel: e.target.value })} />
        </div>
        <HeadingField
          label="Heading"
          value={c.heading}
          onChange={(v) => set({ heading: v })}
          tag={ht.get("contact.heading")}
          onTagChange={(t) => ht.set("contact.heading", t)}
        />
        <RichTextField label="Description" value={c.description} onChange={(v) => set({ description: v })} />
        <ImageField label="Section Image" value={c.image} onChange={(url) => set({ image: url })} folder="team" />
        <div>
          <Label>Image Alt Text</Label>
          <Input value={c.imageAlt} onChange={(e) => set({ imageAlt: e.target.value })} placeholder="Describe the image" />
        </div>
        <p className="text-xs text-gray-500 italic">Phone and address are managed in Site Settings &gt; Contact Info</p>
        <div>
          <Label>Form Heading</Label>
          <Input value={c.formHeading} onChange={(e) => set({ formHeading: e.target.value })} />
        </div>
        <h4 className="font-medium">Contact Form</h4>
        <FormFields value={c.form} onChange={(form) => set({ form })} showExtendedFields />
      </div>
    </Section>
  );
}
