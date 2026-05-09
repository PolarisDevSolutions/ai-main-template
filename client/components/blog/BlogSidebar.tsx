import { useEffect, useState } from "react";
import { Phone, Calendar } from "lucide-react";
import CallBox from "@site/components/shared/CallBox";
import { useGlobalPhone } from "@site/contexts/SiteSettingsContext";
import type { InjectedBlogSidebarData } from "@site/lib/pageDataInjection";
import { getPublicEnv } from "@site/lib/runtimeEnv";

interface AwardImage {
  src: string;
  alt: string;
}

interface BlogSidebarProps {
  initialData?: InjectedBlogSidebarData | null;
}

export default function BlogSidebar({ initialData }: BlogSidebarProps) {
  const { phoneDisplay, phoneNumber, phoneLabel } = useGlobalPhone();
  const [attorneyImage, setAttorneyImage] = useState(initialData?.attorneyImage || "");
  const [awardImages, setAwardImages] = useState<AwardImage[]>(initialData?.awardImages || []);

  useEffect(() => {
    if (initialData) {
      setAttorneyImage(initialData.attorneyImage || "");
      setAwardImages(initialData.awardImages || []);
      return;
    }

    const fetchSidebarSettings = async () => {
      const supabaseUrl = getPublicEnv("VITE_SUPABASE_URL");
      const supabaseKey = getPublicEnv("VITE_SUPABASE_ANON_KEY");

      if (!supabaseUrl || !supabaseKey) {
        return;
      }

      try {
        const res = await fetch(
          `${supabaseUrl}/rest/v1/blog_sidebar_settings?select=attorney_image,award_images&limit=1`,
          {
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
            },
          },
        );

        if (!res.ok) {
          return;
        }

        const rows = await res.json();
        if (!Array.isArray(rows) || rows.length === 0) {
          return;
        }

        const settings = rows[0];
        setAttorneyImage(settings.attorney_image || "");
        setAwardImages(Array.isArray(settings.award_images) ? settings.award_images : []);
      } catch (err) {
        console.error("Error fetching sidebar settings:", err);
      }
    };

    fetchSidebarSettings();
  }, [initialData]);

  return (
    <aside className="space-y-6">
      {attorneyImage ? (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
          <img
            src={attorneyImage}
            alt="Attorney"
            className="w-full h-auto object-cover"
            width={400}
            height={500}
          />
        </div>
      ) : null}

      <CallBox
        icon={Phone}
        title={phoneLabel}
        subtitle={phoneDisplay}
        phone={phoneNumber}
        className="w-full md:w-full"
      />

      <CallBox
        icon={Calendar}
        title="Schedule Today"
        subtitle="Book a Consultation"
        link="/contact/"
        className="w-full md:w-full"
      />

      {awardImages.length > 0 ? (
        <div className="space-y-4 pt-2">
          <h3
            className="text-lg font-semibold text-gray-900"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Awards & Recognition
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {awardImages.map((award, index) => (
              <div
                key={award.src || index}
                className="bg-white border border-gray-100 rounded-md p-3 flex items-center justify-center"
              >
                <img
                  src={award.src}
                  alt={award.alt}
                  className="max-h-20 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </aside>
  );
}
