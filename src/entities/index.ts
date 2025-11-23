/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: gestionvideoauteur
 * Interface for AuthorVideoManagement
 */
export interface AuthorVideoManagement {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  videoTitleDe?: string;
  /** @wixFieldType text */
  videoDescriptionDe?: string;
  /** @wixFieldType text */
  videoDescriptionEn?: string;
  /** @wixFieldType text */
  videoTitleEn?: string;
  /** @wixFieldType text */
  videoTitle?: string;
  /** @wixFieldType text */
  videoDescription?: string;
  /** @wixFieldType text */
  videoType?: string;
  /** @wixFieldType url */
  videoUrl?: string;
  /** @wixFieldType image */
  thumbnailImage?: string;
  /** @wixFieldType boolean */
  isActive?: boolean;
  /** @wixFieldType video */
  video?: string;
}


/**
 * Collection ID: musicshowcase
 * Interface for MusicShowcase
 */
export interface MusicShowcase {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  descriptionDe?: string;
  /** @wixFieldType text */
  trackTitleEn?: string;
  /** @wixFieldType text */
  descriptionEn?: string;
  /** @wixFieldType text */
  trackTitleDe?: string;
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
  /** @wixFieldType rich_content */
  richcontent?: any;
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
  exampleSentenceEn?: string;
  /** @wixFieldType text */
  traductionDe?: string;
  /** @wixFieldType text */
  traductionEn?: string;
  /** @wixFieldType text */
  exampleSentenceDe?: string;
  /** @wixFieldType text */
  definitionEn?: string;
  /** @wixFieldType text */
  definitionDe?: string;
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
  descriptionDe?: string;
  /** @wixFieldType text */
  resourceName?: string;
  /** @wixFieldType text */
  descriptionEn?: string;
  /** @wixFieldType text */
  resourceNameDe?: string;
  /** @wixFieldType text */
  resourceNameEn?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType url */
  fileUrl?: string;
  /** @wixFieldType text */
  resourceType?: string;
  /** @wixFieldType date @format YYYY-MM-DD */
  publicationDate?: string;
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
  descriptionDe?: string;
  /** @wixFieldType url */
  pdfUrl?: string;
  /** @wixFieldType text */
  descriptionEn?: string;
  /** @wixFieldType text */
  excerptDe?: string;
  /** @wixFieldType text */
  excerptEn?: string;
  /** @wixFieldType text */
  titleDe?: string;
  /** @wixFieldType text */
  titleEn?: string;
  /** @wixFieldType text */
  bookGenre?: string;
  /** @wixFieldType text */
  excerpt?: string;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  publicationType?: string;
  /** @wixFieldType text */
  author?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType date @format YYYY-MM-DD */
  publicationDate?: string;
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
  spiritualContextDe?: string;
  /** @wixFieldType text */
  chantTitleEn?: string;
  /** @wixFieldType text */
  spiritualContextEn?: string;
  /** @wixFieldType text */
  translationDe?: string;
  /** @wixFieldType text */
  translationEn?: string;
  /** @wixFieldType text */
  chantTitleDe?: string;
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
