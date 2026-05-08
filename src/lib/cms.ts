// ============================================================================
// CMS DATA LAYER
// ----------------------------------------------------------------------------
// Centralized types and CRUD helpers for all CMS content.
// All public pages and admin pages should import from here, never hit Supabase
// directly for content.
// ============================================================================

import { supabase } from './supabase';

// ---------- Types ----------

export interface Offer {
  id: number;
  sort_order: number;
  visible: boolean;
  title_en: string;
  title_ar: string;
  subtitle_en: string | null;
  subtitle_ar: string | null;
  price_en: string | null;
  price_ar: string | null;
  discount_en: string | null;
  discount_ar: string | null;
  features_en: string[];
  features_ar: string[];
  image_url: string | null;
  popular: boolean;
  popular_label_en: string | null;
  popular_label_ar: string | null;
  whatsapp_message: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Service {
  id: number;
  sort_order: number;
  visible: boolean;
  title_en: string;
  title_ar: string;
  icon_name: string;
  features_en: string[];
  features_ar: string[];
  image_url: string | null;
  rating: number | null;
  reviews_count: number | null;
  created_at?: string;
  updated_at?: string;
}

export interface Testimonial {
  id: number;
  sort_order: number;
  visible: boolean;
  text_en: string;
  text_ar: string;
  author_en: string;
  author_ar: string;
  location_en: string | null;
  location_ar: string | null;
  rating: number;
  created_at?: string;
  updated_at?: string;
}

export interface HeroSlide {
  id: number;
  sort_order: number;
  visible: boolean;
  title_en: string;
  title_ar: string;
  subtitle_en: string | null;
  subtitle_ar: string | null;
  cta_text_en: string | null;
  cta_text_ar: string | null;
  cta_link: string | null;
  image_url: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface SiteSetting {
  key: string;
  value_en: string | null;
  value_ar: string | null;
  description: string | null;
}

export type ContentTable = 'offers' | 'services' | 'testimonials' | 'hero_slides';

// ---------- Public-side fetchers (used by Home, Offers, Services, etc.) ----------

export async function fetchOffers(): Promise<Offer[]> {
  const { data, error } = await supabase
    .from('offers')
    .select('*')
    .eq('visible', true)
    .order('sort_order', { ascending: true });
  if (error) {
    console.error('fetchOffers error:', error);
    return [];
  }
  return (data ?? []) as Offer[];
}

export async function fetchServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('visible', true)
    .order('sort_order', { ascending: true });
  if (error) {
    console.error('fetchServices error:', error);
    return [];
  }
  return (data ?? []) as Service[];
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('visible', true)
    .order('sort_order', { ascending: true });
  if (error) {
    console.error('fetchTestimonials error:', error);
    return [];
  }
  return (data ?? []) as Testimonial[];
}

export async function fetchHeroSlides(): Promise<HeroSlide[]> {
  const { data, error } = await supabase
    .from('hero_slides')
    .select('*')
    .eq('visible', true)
    .order('sort_order', { ascending: true });
  if (error) {
    console.error('fetchHeroSlides error:', error);
    return [];
  }
  return (data ?? []) as HeroSlide[];
}

export async function fetchSiteSettings(): Promise<Record<string, SiteSetting>> {
  const { data, error } = await supabase.from('site_settings').select('*');
  if (error) {
    console.error('fetchSiteSettings error:', error);
    return {};
  }
  const map: Record<string, SiteSetting> = {};
  (data ?? []).forEach((s) => {
    map[s.key] = s as SiteSetting;
  });
  return map;
}

// ---------- Admin CRUD (used by /analytics admin pages) ----------

export async function adminListAll<T>(table: ContentTable): Promise<T[]> {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return (data ?? []) as T[];
}

export async function adminGet<T>(table: ContentTable, id: number): Promise<T | null> {
  const { data, error } = await supabase.from(table).select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data as T | null;
}

export async function adminUpsert(table: ContentTable, row: Record<string, unknown>) {
  // strip id when undefined to let Postgres assign new
  const payload = { ...row };
  if (payload.id === undefined || payload.id === null) {
    delete payload.id;
  }
  const { data, error } = await supabase
    .from(table)
    .upsert(payload, { onConflict: 'id' })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function adminDelete(table: ContentTable, id: number) {
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw error;
}

export async function adminReorder(table: ContentTable, idsInOrder: number[]) {
  // Update sort_order one by one. Small N, simple approach.
  const updates = idsInOrder.map((id, idx) =>
    supabase.from(table).update({ sort_order: idx + 1 }).eq('id', id)
  );
  const results = await Promise.all(updates);
  results.forEach((r) => {
    if (r.error) throw r.error;
  });
}

// ---------- Site settings admin ----------

export async function adminUpdateSetting(
  key: string,
  value_en: string | null,
  value_ar: string | null
) {
  const { error } = await supabase
    .from('site_settings')
    .upsert({ key, value_en, value_ar }, { onConflict: 'key' });
  if (error) throw error;
}

// ---------- Image upload ----------

export async function uploadImage(file: File, folder: string = 'general'): Promise<string> {
  const ext = file.name.split('.').pop() || 'jpg';
  const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error: uploadErr } = await supabase.storage
    .from('cms-images')
    .upload(filename, file, { cacheControl: '3600', upsert: false });
  if (uploadErr) throw uploadErr;

  const { data } = supabase.storage.from('cms-images').getPublicUrl(filename);
  return data.publicUrl;
}

export async function deleteImage(publicUrl: string) {
  // Public URL format: https://<project>.supabase.co/storage/v1/object/public/cms-images/<path>
  const marker = '/cms-images/';
  const idx = publicUrl.indexOf(marker);
  if (idx < 0) return;
  const path = publicUrl.substring(idx + marker.length);
  await supabase.storage.from('cms-images').remove([path]);
}
