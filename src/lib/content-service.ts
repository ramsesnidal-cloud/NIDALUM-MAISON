import { BaseCrudService } from '@/integrations';

// Type definitions for CMS collections
export interface SiteSettings {
  _id: string;
  homeTitle?: string;
  homeSlogan?: string;
  homeManifestoLine1?: string;
  homeManifestoLine2?: string;
  homeManifestoLine3?: string;
  homeEnterLabel?: string;
  homePortals?: string; // JSON string
  headerStampText?: string;
}

export interface Artist {
  _id: string;
  name?: string;
  slug?: string;
  role?: string;
  shortDescription?: string;
  portraitImage?: string;
  audioPreviewUrl?: string;
  audioPreviewTitle?: string;
  order?: number;
  isPublished?: boolean;
}

export interface SacredChant {
  _id: string;
  title?: string;
  slug?: string;
  shortDescription?: string;
  coverImage?: string;
  audioPreviewUrl?: string;
  duration?: string;
  order?: number;
  isPublished?: boolean;
}

export interface Discography {
  _id: string;
  title?: string;
  artistRef?: string;
  coverImage?: string;
  releaseDate?: string;
  order?: number;
  isPublished?: boolean;
}

export interface LiteratureBook {
  _id: string;
  title?: string;
  subtitle?: string;
  coverImage?: string;
  shortDescription?: string;
  order?: number;
  isPublished?: boolean;
}

export interface FragmentsLexicon {
  _id: string;
  termNidalum?: string;
  translationFrench?: string;
  translationEnglish?: string;
  category?: string;
  order?: number;
  isPublished?: boolean;
}

export interface DailyExpression {
  _id: string;
  phraseNidalum?: string;
  translationFrench?: string;
  translationEnglish?: string;
  order?: number;
  isPublished?: boolean;
}

// Cache for client-side data
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 30 * 1000; // 30 seconds - reduced for faster updates

function isCacheValid(key: string): boolean {
  const cached = cache.get(key);
  if (!cached) return false;
  return Date.now() - cached.timestamp < CACHE_DURATION;
}

function getFromCache(key: string) {
  const cached = cache.get(key);
  return cached?.data;
}

function setCache(key: string, data: any) {
  cache.set(key, { data, timestamp: Date.now() });
}

// ContentService - Centralized CMS data fetching
export const ContentService = {
  // Site Settings
  async getSiteSettings(): Promise<SiteSettings | null> {
    const cacheKey = 'site-settings';
    if (isCacheValid(cacheKey)) {
      return getFromCache(cacheKey);
    }

    try {
      const result = await BaseCrudService.getAll<SiteSettings>('sitesettings', [], { limit: 1 });
      const settings = result.items?.[0] || null;
      if (settings) {
        setCache(cacheKey, settings);
      }
      return settings;
    } catch (error) {
      console.error('Error fetching site settings:', error);
      return null;
    }
  },

  // Artists
  async getArtists(published = true): Promise<Artist[]> {
    const cacheKey = `artists-${published}`;
    if (isCacheValid(cacheKey)) {
      return getFromCache(cacheKey);
    }

    try {
      const result = await BaseCrudService.getAll<Artist>('artists', [], { limit: 100 });
      let artists = result.items || [];
      
      if (published) {
        artists = artists.filter(a => a.isPublished !== false);
      }
      
      artists.sort((a, b) => (a.order || 0) - (b.order || 0));
      setCache(cacheKey, artists);
      return artists;
    } catch (error) {
      console.error('Error fetching artists:', error);
      return [];
    }
  },

  async getArtistBySlug(slug: string): Promise<Artist | null> {
    try {
      const artists = await this.getArtists();
      return artists.find(a => a.slug === slug) || null;
    } catch (error) {
      console.error('Error fetching artist by slug:', error);
      return null;
    }
  },

  // Sacred Chants
  async getSacredChants(published = true): Promise<SacredChant[]> {
    const cacheKey = `sacred-chants-${published}`;
    if (isCacheValid(cacheKey)) {
      return getFromCache(cacheKey);
    }

    try {
      const result = await BaseCrudService.getAll<SacredChant>('sacredchants', [], { limit: 100 });
      let chants = result.items || [];
      
      if (published) {
        chants = chants.filter(c => c.isPublished !== false);
      }
      
      chants.sort((a, b) => (a.order || 0) - (b.order || 0));
      setCache(cacheKey, chants);
      return chants;
    } catch (error) {
      console.error('Error fetching sacred chants:', error);
      return [];
    }
  },

  async getSacredChantBySlug(slug: string): Promise<SacredChant | null> {
    try {
      const chants = await this.getSacredChants();
      return chants.find(c => c.slug === slug) || null;
    } catch (error) {
      console.error('Error fetching sacred chant by slug:', error);
      return null;
    }
  },

  // Discography
  async getDiscography(published = true): Promise<Discography[]> {
    const cacheKey = `discography-${published}`;
    if (isCacheValid(cacheKey)) {
      return getFromCache(cacheKey);
    }

    try {
      const result = await BaseCrudService.getAll<Discography>('discography', [], { limit: 100 });
      let items = result.items || [];
      
      if (published) {
        items = items.filter(i => i.isPublished !== false);
      }
      
      items.sort((a, b) => (a.order || 0) - (b.order || 0));
      setCache(cacheKey, items);
      return items;
    } catch (error) {
      console.error('Error fetching discography:', error);
      return [];
    }
  },

  // Literature Books
  async getLiteratureBooks(published = true): Promise<LiteratureBook[]> {
    const cacheKey = `literature-books-${published}`;
    if (isCacheValid(cacheKey)) {
      return getFromCache(cacheKey);
    }

    try {
      const result = await BaseCrudService.getAll<LiteratureBook>('literaturebooks', [], { limit: 100 });
      let books = result.items || [];
      
      if (published) {
        books = books.filter(b => b.isPublished !== false);
      }
      
      books.sort((a, b) => (a.order || 0) - (b.order || 0));
      setCache(cacheKey, books);
      return books;
    } catch (error) {
      console.error('Error fetching literature books:', error);
      return [];
    }
  },

  // Fragments Lexicon
  async getFragmentsLexicon(published = true): Promise<FragmentsLexicon[]> {
    const cacheKey = `fragments-lexicon-${published}`;
    if (isCacheValid(cacheKey)) {
      return getFromCache(cacheKey);
    }

    try {
      const result = await BaseCrudService.getAll<FragmentsLexicon>('fragmentslexicon', [], { limit: 100 });
      let items = result.items || [];
      
      if (published) {
        items = items.filter(i => i.isPublished !== false);
      }
      
      items.sort((a, b) => (a.order || 0) - (b.order || 0));
      setCache(cacheKey, items);
      return items;
    } catch (error) {
      console.error('Error fetching fragments lexicon:', error);
      return [];
    }
  },

  // Daily Expressions
  async getDailyExpressions(published = true): Promise<DailyExpression[]> {
    const cacheKey = `daily-expressions-${published}`;
    if (isCacheValid(cacheKey)) {
      return getFromCache(cacheKey);
    }

    try {
      const result = await BaseCrudService.getAll<DailyExpression>('dailyexpressions', [], { limit: 100 });
      let items = result.items || [];
      
      if (published) {
        items = items.filter(i => i.isPublished !== false);
      }
      
      items.sort((a, b) => (a.order || 0) - (b.order || 0));
      setCache(cacheKey, items);
      return items;
    } catch (error) {
      console.error('Error fetching daily expressions:', error);
      return [];
    }
  },

  // Cache clearing
  clearCache() {
    cache.clear();
  },

  clearCacheForKey(key: string) {
    cache.delete(key);
  },
};
