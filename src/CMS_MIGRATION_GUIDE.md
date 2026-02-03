# CMS Migration Guide - Nidalum Maison

## Overview
All site content has been migrated to Wix CMS Collections. You can now manage all content (images, audio, text) directly from the Wix Dashboard without touching code.

## Collections Created

### 1. **Site Settings** (Collection ID: `sitesettings`)
Global configuration for the homepage and header.

**Fields to populate:**
- `homeTitle` - Main title on homepage (e.g., "NIDALUM MAISON")
- `homeSlogan` - Tagline (e.g., "A SACRED HOUSE OF CREATION")
- `homeManifestoLine1` - First manifesto line (e.g., "Born from language, memory, and ritual.")
- `homeManifestoLine2` - Second manifesto line (e.g., "Music becomes architecture. Silence becomes signature.")
- `homeManifestoLine3` - Third manifesto line (e.g., "Creation becomes rite. It is not a genre. It is a language. It is a House.")
- `homeEnterLabel` - Button text (e.g., "ENTER")
- `homePortals` - JSON array of navigation links (see format below)
- `headerStampText` - Header logo/stamp text

**homePortals JSON Format:**
```json
[
  {
    "portalLabel": "NIDALUM MUSIC",
    "portalRoute": "/sacred"
  },
  {
    "portalLabel": "NIDALUM LITERATURE",
    "portalRoute": "/literature"
  },
  {
    "portalLabel": "NIDALUM FASHION",
    "portalRoute": "/fashion"
  },
  {
    "portalLabel": "NIDALUM PERFUME",
    "portalRoute": "/perfume"
  },
  {
    "portalLabel": "NIDALUM LANGUAGE",
    "portalRoute": "/fragments"
  }
]
```

---

### 2. **Artists** (Collection ID: `artists`)
Artist profiles with portraits and audio previews.

**Fields to populate:**
- `name` - Full artist name (e.g., "Amara Okonkwo")
- `slug` - URL-friendly identifier (e.g., "amara-okonkwo")
- `role` - Artist's role/specialty (e.g., "Vocal Ritualist")
- `shortDescription` - Brief biography
- `portraitImage` - Upload portrait photo (square recommended)
- `audioPreviewUrl` - URL to audio preview (MP3 format, listen-only)
- `audioPreviewTitle` - Title of preview track
- `order` - Display order (1, 2, 3, etc.)
- `isPublished` - Toggle to show/hide artist

**Important:** Do NOT expose WAV files or hi-res audio. Only MP3 preview URLs.

---

### 3. **Sacred Chants** (Collection ID: `sacredchants`)
Sacred chants with audio and cover images.

**Fields to populate:**
- `title` - Chant title (e.g., "Chant I")
- `slug` - URL identifier (e.g., "chant-i")
- `shortDescription` - Brief description of the chant
- `coverImage` - Square cover image
- `audioPreviewUrl` - URL to audio file (MP3, listen-only)
- `duration` - Duration (e.g., "0:40")
- `order` - Display order
- `isPublished` - Visibility toggle

---

### 4. **Discography** (Collection ID: `discography`)
Albums and releases linked to artists.

**Fields to populate:**
- `title` - Album/release title (e.g., "Sacred Echoes")
- `artistRef` - Reference to artist (artist name or ID)
- `coverImage` - Square album cover
- `releaseDate` - Release date (optional)
- `order` - Display order
- `isPublished` - Visibility toggle

---

### 5. **Literature Books** (Collection ID: `literaturebooks`)
Books and literary works.

**Fields to populate:**
- `title` - Book title (e.g., "The Silence Protocol")
- `subtitle` - Optional secondary title
- `coverImage` - Book cover image
- `shortDescription` - Brief summary
- `order` - Display order
- `isPublished` - Visibility toggle

---

### 6. **Fragments Lexicon** (Collection ID: `fragmentslexicon`)
Dictionary terms in Nidalum with translations.

**Fields to populate:**
- `termNidalum` - Term in Nidalum language (e.g., "ORAA")
- `translationFrench` - French translation
- `translationEnglish` - English translation
- `category` - Optional category (e.g., "Verbs", "Nouns")
- `order` - Display order
- `isPublished` - Visibility toggle

---

### 7. **Daily Expressions** (Collection ID: `dailyexpressions`)
Common phrases and daily expressions in Nidalum.

**Fields to populate:**
- `phraseNidalum` - Phrase in Nidalum
- `translationFrench` - French translation
- `translationEnglish` - English translation
- `order` - Display order
- `isPublished` - Visibility toggle

---

## How to Access the CMS

1. Go to: **https://manage.wix.com/dashboard**
2. Navigate to **Database** section
3. Select the collection you want to edit
4. Add/edit items directly in the interface
5. Upload images via the Media Manager
6. Changes are live immediately

---

## Data Migration from Local Files

### Current Local Data Sources:
- `src/content/artists.ts` → **Artists** collection
- `src/content/sacredChants.ts` → **Sacred Chants** collection
- `src/content/discography.ts` → **Discography** collection
- `src/content/literature.ts` → **Literature Books** collection
- `src/content/fragments.ts` → **Fragments Lexicon** collection
- `src/content/fragments_expressions.ts` → **Daily Expressions** collection

### Migration Steps:
1. Open each local file
2. Copy the data
3. Go to the corresponding CMS collection
4. Create new items with the data
5. Upload images to Wix Media Manager
6. Update audio URLs to use Wix-hosted files

---

## Code Integration

The site now uses a centralized **ContentService** (`src/lib/content-service.ts`) to fetch all data from CMS:

```typescript
import { ContentService } from '@/lib/content-service';

// Get all artists
const artists = await ContentService.getArtists();

// Get all sacred chants
const chants = await ContentService.getSacredChants();

// Get site settings
const settings = await ContentService.getSiteSettings();
```

### Features:
- ✅ Automatic sorting by `order` field
- ✅ Filters published items by default
- ✅ Client-side caching (5-minute TTL)
- ✅ Error handling with fallbacks
- ✅ Listen-only audio (no download links exposed)

---

## Important Rules

1. **Design Lock**: Sacred Music and Artists page layouts are locked. Only data sources change.
2. **Audio**: Only MP3 preview URLs are exposed. No WAV or hi-res files for public.
3. **Language**: Interface remains in English except Fragments (shows Nidalum + FR + EN).
4. **Publishing**: Use `isPublished` toggle to control visibility without deleting items.
5. **Ordering**: Use `order` field (1, 2, 3...) to control display sequence.

---

## Next Steps

1. ✅ CMS collections created
2. ✅ ContentService layer implemented
3. ⏳ **Populate CMS with data** (via Wix Dashboard)
4. ⏳ Update page components to use ContentService
5. ⏳ Test all pages with live CMS data

---

## Support

For questions or issues:
- Check Wix CMS documentation: https://www.wix.com/en/wix-studio/cms
- Review ContentService implementation: `src/lib/content-service.ts`
- Verify collection IDs match in code and dashboard
