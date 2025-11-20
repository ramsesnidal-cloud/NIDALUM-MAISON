/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: musicshowcase
 * Interface for MusicShowcase
 */
export interface MusicShowcase {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  trackTitle?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType url */
  audioUrl?: string;
  /** @wixFieldType image */
  coverImage?: string;
  /** @wixFieldType text */
  artistName?: string;
  /** @wixFieldType text */
  genre?: string;
  /** @wixFieldType audio */
  audio?: string;
  /** @wixFieldType audio */
  audio1?: string;
}


/**
 * Collection ID: nidalumlexicon
 * Interface for NidalumLexicon
 */
export interface NidalumLexicon {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  nidalumWord?: string;
  /** @wixFieldType text */
  definition?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  theme?: string;
  /** @wixFieldType text */
  pronunciationGuide?: string;
  /** @wixFieldType text */
  exampleSentence?: string;
  /** @wixFieldType text */
  etymology?: string;
  /** @wixFieldType text */
  expression_nidalum?: string;
  /** @wixFieldType text */
  traduction_fr?: string;
}


/**
 * Collection ID: officialresources
 * Interface for OfficialResources
 */
export interface OfficialResources {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  resourceName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType url */
  fileUrl?: string;
  /** @wixFieldType text */
  resourceType?: string;
  /** @wixFieldType date */
  publicationDate?: Date | string;
  /** @wixFieldType image */
  thumbnailImage?: string;
}


/**
 * Collection ID: publications
 * Interface for Publications
 */
export interface Publications {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  publicationType?: string;
  /** @wixFieldType text */
  author?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType date */
  publicationDate?: Date | string;
  /** @wixFieldType text */
  isbn?: string;
  /** @wixFieldType image */
  coverImage?: string;
  /** @wixFieldType url */
  purchaseLink?: string;
}


/**
 * Collection ID: ritualchants
 * Interface for RitualChants
 */
export interface RitualChants {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  chantTitle?: string;
  /** @wixFieldType text */
  originalText?: string;
  /** @wixFieldType text */
  translation?: string;
  /** @wixFieldType text */
  spiritualContext?: string;
  /** @wixFieldType image */
  chantImage?: string;
  /** @wixFieldType text */
  theme?: string;
  /** @wixFieldType audio */
  audio?: string;
  /** @wixFieldType text */
  text?: string;
}
