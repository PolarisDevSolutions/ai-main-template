-- =============================================
-- CMS Starter — Full Database Schema
-- Run this entire script in a new Supabase project
-- =============================================

-- 0. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. TABLES
-- =============================================

CREATE TABLE public.pages (
  id uuid PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  title text NOT NULL,
  url_path text NOT NULL UNIQUE,
  page_type text NOT NULL DEFAULT 'standard'
    CHECK (page_type IN ('standard', 'practice', 'landing')),
  content jsonb DEFAULT '[]'::jsonb,
  meta_title text,
  meta_description text,
  canonical_url text,
  og_title text,
  og_description text,
  og_image text,
  noindex boolean DEFAULT false,
  schema_type text,
  schema_data jsonb,
  status text NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published')),
  published_at timestamptz,
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.templates (
  id uuid PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  name text NOT NULL,
  page_type text NOT NULL
    CHECK (page_type IN ('standard', 'practice', 'landing', 'post')),
  default_content jsonb DEFAULT '[]'::jsonb,
  default_meta_title text,
  default_meta_description text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.redirects (
  id uuid PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  from_path text NOT NULL UNIQUE,
  to_path text NOT NULL,
  status_code integer NOT NULL DEFAULT 301
    CHECK (status_code IN (301, 302)),
  enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  settings_key text NOT NULL UNIQUE DEFAULT 'global',
  site_name text,
  logo_url text,
  logo_alt text,
  phone_number text,
  phone_display text,
  phone_availability text,
  apply_phone_globally boolean DEFAULT true,
  header_cta_text text,
  header_cta_url text,
  navigation_items jsonb DEFAULT '[]'::jsonb,
  footer_about_links jsonb DEFAULT '[]'::jsonb,
  footer_practice_links jsonb DEFAULT '[]'::jsonb,
  address_line1 text,
  address_line2 text,
  map_embed_url text,
  social_links jsonb DEFAULT '[]'::jsonb,
  copyright_text text,
  footer_tagline_html text,
  site_noindex boolean DEFAULT false,
  ga4_measurement_id text,
  google_ads_id text,
  google_ads_conversion_label text,
  head_scripts text,
  footer_scripts text,
  site_url text DEFAULT '',
  global_schema text,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid
);

CREATE TABLE public.media (
  id uuid PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  file_name text NOT NULL,
  file_path text NOT NULL,
  public_url text NOT NULL,
  file_size integer,
  mime_type text,
  alt_text text,
  uploaded_by uuid,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.cms_users (
  id uuid PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  user_id uuid NOT NULL,
  email text NOT NULL,
  role text NOT NULL DEFAULT 'editor'
    CHECK (role IN ('admin', 'editor')),
  created_at timestamptz DEFAULT now(),
  created_by uuid
);

CREATE TABLE public.page_revisions (
  id uuid PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  page_id uuid NOT NULL REFERENCES public.pages(id),
  title text NOT NULL,
  url_path text NOT NULL,
  page_type text NOT NULL,
  content jsonb DEFAULT '[]'::jsonb,
  meta_title text,
  meta_description text,
  canonical_url text,
  og_title text,
  og_description text,
  og_image text,
  noindex boolean DEFAULT false,
  status text NOT NULL,
  created_at timestamptz DEFAULT now(),
  created_by uuid
);

CREATE TABLE public.post_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  featured_image text,
  category_id uuid REFERENCES public.post_categories(id),
  content jsonb DEFAULT '[]'::jsonb,
  body text DEFAULT '',
  meta_title text,
  meta_description text,
  canonical_url text,
  og_title text,
  og_description text,
  og_image text,
  noindex boolean DEFAULT false,
  status text DEFAULT 'draft'
    CHECK (status IN ('draft', 'published')),
  published_at timestamptz,
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.blog_sidebar_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attorney_image text NOT NULL DEFAULT '',
  award_images jsonb NOT NULL DEFAULT '[]'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.search_replace_audit (
  id uuid PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  operation_id uuid NOT NULL,
  table_name text NOT NULL,
  row_id uuid NOT NULL,
  field_path text NOT NULL,
  old_value text NOT NULL,
  new_value text NOT NULL,
  user_id uuid NOT NULL,
  rolled_back boolean DEFAULT false,
  rolled_back_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- =============================================
-- 2. HELPER FUNCTIONS
-- =============================================

-- Returns true if the current user is an admin in cms_users.
-- SECURITY DEFINER so it can bypass RLS to check its own table.
CREATE OR REPLACE FUNCTION public.is_cms_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.cms_users
    WHERE user_id = auth.uid() AND role = 'admin'
  );
$$;

-- =============================================
-- 3. TRIGGER FUNCTIONS
-- =============================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_posts_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_blog_sidebar_settings_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- =============================================
-- 3. TRIGGERS
-- =============================================

CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON public.pages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER posts_updated_at_trigger
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.update_posts_updated_at();

CREATE TRIGGER blog_sidebar_settings_updated_at
  BEFORE UPDATE ON public.blog_sidebar_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_blog_sidebar_settings_updated_at();

-- =============================================
-- 4. VIEWS
-- =============================================

CREATE OR REPLACE VIEW public.site_settings_public AS
SELECT
  id, settings_key, site_name, logo_url, logo_alt,
  phone_number, phone_display, phone_availability, apply_phone_globally,
  header_cta_text, header_cta_url, navigation_items,
  footer_about_links, footer_practice_links,
  address_line1, address_line2, map_embed_url,
  social_links, copyright_text, footer_tagline_html,
  site_noindex, ga4_measurement_id, google_ads_id,
  google_ads_conversion_label, head_scripts, footer_scripts,
  site_url, updated_at
FROM site_settings;

-- =============================================
-- 5. ROW LEVEL SECURITY
-- =============================================

ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_sidebar_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_replace_audit ENABLE ROW LEVEL SECURITY;

-- Pages
CREATE POLICY "Public read published pages" ON public.pages
  FOR SELECT USING (status = 'published');
CREATE POLICY "Authenticated users can read all pages" ON public.pages
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert pages" ON public.pages
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update pages" ON public.pages
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete pages" ON public.pages
  FOR DELETE TO authenticated USING (true);

-- Templates
CREATE POLICY "Public read templates" ON public.templates
  FOR SELECT USING (true);
CREATE POLICY "Auth manage templates" ON public.templates
  FOR ALL USING (auth.role() = 'authenticated');

-- Redirects
CREATE POLICY "Public read enabled redirects" ON public.redirects
  FOR SELECT USING (enabled = true);
CREATE POLICY "Auth manage redirects" ON public.redirects
  FOR ALL USING (auth.role() = 'authenticated');

-- Site Settings
CREATE POLICY "Public read site settings" ON public.site_settings
  FOR SELECT USING (true);
CREATE POLICY "Auth manage site settings" ON public.site_settings
  FOR ALL USING (auth.role() = 'authenticated');

-- Media
CREATE POLICY "Public read media" ON public.media
  FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert media" ON public.media
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update media" ON public.media
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete media" ON public.media
  FOR DELETE TO authenticated USING (true);

-- CMS Users
-- All authenticated users may read (needed for the role-lookup hook)
CREATE POLICY "Auth read cms users" ON public.cms_users
  FOR SELECT USING (auth.role() = 'authenticated');
-- Only admins may insert / update / delete CMS user records
CREATE POLICY "Admin insert cms users" ON public.cms_users
  FOR INSERT WITH CHECK (public.is_cms_admin());
CREATE POLICY "Admin update cms users" ON public.cms_users
  FOR UPDATE USING (public.is_cms_admin()) WITH CHECK (public.is_cms_admin());
CREATE POLICY "Admin delete cms users" ON public.cms_users
  FOR DELETE USING (public.is_cms_admin());

-- Page Revisions
CREATE POLICY "Auth read page revisions" ON public.page_revisions
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage page revisions" ON public.page_revisions
  FOR ALL USING (auth.role() = 'authenticated');

-- Post Categories
CREATE POLICY "post_categories_public_read" ON public.post_categories
  FOR SELECT USING (true);
CREATE POLICY "post_categories_auth_all" ON public.post_categories
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Posts
CREATE POLICY "posts_public_read_published" ON public.posts
  FOR SELECT USING (status = 'published' OR auth.role() = 'authenticated');
CREATE POLICY "posts_auth_all" ON public.posts
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Blog Sidebar Settings
CREATE POLICY "Anyone can read blog_sidebar_settings" ON public.blog_sidebar_settings
  FOR SELECT USING (true);
CREATE POLICY "Authenticated users can update blog_sidebar_settings" ON public.blog_sidebar_settings
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Search Replace Audit
CREATE POLICY "Auth read audit" ON public.search_replace_audit
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access audit" ON public.search_replace_audit
  FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- 6. STORAGE BUCKET
-- =============================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media', 'media', true, 52428800,
  '["image/jpeg","image/png","image/gif","image/webp","image/svg+xml"]'::jsonb
)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can read media files" ON storage.objects
  FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Authenticated users can upload media" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media');
CREATE POLICY "Authenticated users can update media files" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'media') WITH CHECK (bucket_id = 'media');
CREATE POLICY "Authenticated users can delete media files" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'media');

-- =============================================
-- 7. SEED DATA (required for app to function)
-- =============================================

-- App expects exactly one global settings row
INSERT INTO public.site_settings (settings_key) VALUES ('global')
ON CONFLICT (settings_key) DO NOTHING;

-- App expects exactly one blog sidebar settings row
INSERT INTO public.blog_sidebar_settings
  SELECT gen_random_uuid(), '', '[]'::jsonb, now()
  WHERE NOT EXISTS (SELECT 1 FROM public.blog_sidebar_settings);
