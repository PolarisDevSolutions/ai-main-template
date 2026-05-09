import type { SharedHeroContent } from "@site/lib/cms/sharedHero";
import { Input, Label, RichTextField } from "./EditorShared";

interface SharedHeroEditorProps {
  hero: SharedHeroContent;
  onChange: (hero: SharedHeroContent) => void;
}

export default function SharedHeroEditor({
  hero,
  onChange,
}: SharedHeroEditorProps) {
  const set = (patch: Partial<SharedHeroContent>) => onChange({ ...hero, ...patch });

  return (
    <div className="grid gap-4">
      <div>
        <Label>Label (H1)</Label>
        <Input
          value={hero.h1Title}
          onChange={(e) => set({ h1Title: e.target.value })}
          placeholder="Primary hero label rendered as the page H1"
        />
      </div>

      <div>
        <Label>Highlighted Text</Label>
        <Input
          value={hero.highlightedText}
          onChange={(e) => set({ highlightedText: e.target.value })}
          placeholder="Accent-colored words on the first line"
        />
      </div>

      <div>
        <Label>Headline</Label>
        <Input
          value={hero.headline}
          onChange={(e) => set({ headline: e.target.value })}
          placeholder="Main hero headline"
        />
      </div>

      <RichTextField
        label="Description"
        value={hero.description}
        onChange={(value) => set({ description: value })}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <Label>Trust Text 1</Label>
          <Input
            value={hero.trustText1}
            onChange={(e) => set({ trustText1: e.target.value })}
          />
        </div>
        <div>
          <Label>Trust Text 2</Label>
          <Input
            value={hero.trustText2}
            onChange={(e) => set({ trustText2: e.target.value })}
          />
        </div>
        <div>
          <Label>Trust Text 3</Label>
          <Input
            value={hero.trustText3}
            onChange={(e) => set({ trustText3: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Label>Form Title</Label>
        <Input
          value={hero.formTitle}
          onChange={(e) => set({ formTitle: e.target.value })}
          placeholder="Title above the right-side contact form"
        />
      </div>

      <div>
        <Label>CTA Phone Label</Label>
        <Input
          value={hero.phoneLabel}
          onChange={(e) => set({ phoneLabel: e.target.value })}
          placeholder="Label above the phone number"
        />
      </div>

      <p className="text-xs italic text-gray-500">
        Phone number is managed in Site Settings &gt; Contact Info.
      </p>
    </div>
  );
}
