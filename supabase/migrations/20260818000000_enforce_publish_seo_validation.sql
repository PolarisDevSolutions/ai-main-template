create or replace function public.validate_page_before_publish()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.status = 'published' then
    if nullif(btrim(new.title), '') is null then
      raise exception 'Naslov je obavezan pre objave stranice.';
    end if;
    if nullif(btrim(new.url_path), '') is null then
      raise exception 'URL putanja je obavezna pre objave stranice.';
    end if;
    if nullif(btrim(new.meta_title), '') is null then
      raise exception 'SEO naslov je obavezan pre objave stranice.';
    end if;
    if nullif(btrim(new.meta_description), '') is null then
      raise exception 'Meta opis je obavezan pre objave stranice.';
    end if;
    if new.content is null or new.content in ('null'::jsonb, '{}'::jsonb, '[]'::jsonb) or length(new.content::text) < 80 then
      raise exception 'Stranica mora imati sadržaj pre objave.';
    end if;
    if lower(new.content::text) ~ '(lorem ipsum|your firm headline|this is an example faq|page headline|enter a description here)' then
      raise exception 'Uklonite placeholder sadržaj pre objave stranice.';
    end if;
    if nullif(btrim(new.canonical_url), '') is not null and new.canonical_url !~ '^https://[^[:space:]]+$' then
      raise exception 'Canonical URL mora biti validan HTTPS URL.';
    end if;
  end if;

  return new;
end;
$$;

create or replace function public.validate_post_before_publish()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.status = 'published' then
    if nullif(btrim(new.title), '') is null then
      raise exception 'Naslov je obavezan pre objave članka.';
    end if;
    if nullif(btrim(new.slug), '') is null then
      raise exception 'Slug je obavezan pre objave članka.';
    end if;
    if nullif(btrim(new.meta_title), '') is null then
      raise exception 'SEO naslov je obavezan pre objave članka.';
    end if;
    if nullif(btrim(new.meta_description), '') is null then
      raise exception 'Meta opis je obavezan pre objave članka.';
    end if;
    if length(btrim(regexp_replace(coalesce(new.body, ''), '<[^>]*>', ' ', 'g'))) < 100 then
      raise exception 'Članak mora imati sadržaj pre objave.';
    end if;
    if lower(coalesce(new.body, '')) ~ '(lorem ipsum|this is an example|page headline|enter a description here)' then
      raise exception 'Uklonite placeholder sadržaj pre objave članka.';
    end if;
    if nullif(btrim(new.canonical_url), '') is not null and new.canonical_url !~ '^https://[^[:space:]]+$' then
      raise exception 'Canonical URL mora biti validan HTTPS URL.';
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists validate_page_publish_trigger on public.pages;
create trigger validate_page_publish_trigger
  before insert or update on public.pages
  for each row execute function public.validate_page_before_publish();

drop trigger if exists validate_post_publish_trigger on public.posts;
create trigger validate_post_publish_trigger
  before insert or update on public.posts
  for each row execute function public.validate_post_before_publish();
