/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: Import1
 * Interface for RpertoireLinguistiqueNidalumSectionQuotidienne
 */
export interface RpertoireLinguistiqueNidalumSectionQuotidienne {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  usageExample?: string;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  nidalum?: string;
  /** @wixFieldType text */
  phonetic?: string;
  /** @wixFieldType text */
  root?: string;
  /** @wixFieldType text */
  french?: string;
  /** @wixFieldType text */
  english?: string;
  /** @wixFieldType text */
  definition?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  german?: string;
}


/**
 * Collection ID: academieprogrammes
 * Interface for ProgrammesdelAcadmie
 */
export interface ProgrammesdelAcadmie {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  programName?: string;
  /** @wixFieldType text */
  programDescription?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  programImage?: string;
  /** @wixFieldType text */
  programLevel?: string;
  /** @wixFieldType text */
  programDuration?: string;
  /** @wixFieldType url */
  enrollmentLink?: string;
  /** @wixFieldType boolean */
  isAvailable?: boolean;
  /** @wixFieldType text */
  name_fr?: string;
  /** @wixFieldType text */
  name_en?: string;
  /** @wixFieldType text */
  name_de?: string;
  /** @wixFieldType text */
  description_fr?: string;
  /** @wixFieldType text */
  description_en?: string;
  /** @wixFieldType text */
  description_de?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  image?: string;
  /** @wixFieldType text */
  level_fr?: string;
  /** @wixFieldType text */
  level_en?: string;
  /** @wixFieldType text */
  level_de?: string;
  /** @wixFieldType text */
  duration_fr?: string;
  /** @wixFieldType text */
  duration_en?: string;
  /** @wixFieldType text */
  duration_de?: string;
  /** @wixFieldType url */
  enroll_url?: string;
  /** @wixFieldType text */
  institute?: string;
}


/**
 * Collection ID: artistportfolio
 * Interface for ArtistPortfolio
 */
export interface ArtistPortfolio {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType url */
  audioUrl?: string;
  /** @wixFieldType text */
  artistName?: string;
  /** @wixFieldType text */
  artistBio?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  artistImage?: string;
  /** @wixFieldType text */
  artistSpecialty?: string;
  /** @wixFieldType text */
  nidalumName?: string;
  /** @wixFieldType url */
  url?: string;
}


/**
 * Collection ID: contactmessages
 * Interface for ContactMessages
 */
export interface ContactMessages {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  subject?: string;
  /** @wixFieldType text */
  message?: string;
  /** @wixFieldType datetime */
  submissionDate?: Date | string;
}


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
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
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
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
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
 * Collection ID: newslettersubscribers
 * Interface for NewsletterSubscribers
 */
export interface NewsletterSubscribers {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  firstName?: string;
  /** @wixFieldType text */
  lastName?: string;
  /** @wixFieldType datetime */
  subscriptionDate?: Date | string;
  /** @wixFieldType boolean */
  isActive?: boolean;
}


/**
 * Collection ID: nidalumlexicon
 * Interface for NidalumApprendrelaLangue
 */
export interface NidalumApprendrelaLangue {
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
  /** @wixFieldType text */
  motNidalum?: string;
  /** @wixFieldType text */
  definition1?: string;
  /** @wixFieldType text */
  categorie?: string;
  /** @wixFieldType text */
  theme1?: string;
  /** @wixFieldType text */
  guideDePrononciation?: string;
  /** @wixFieldType text */
  exemple?: string;
  /** @wixFieldType text */
  etymologie?: string;
  /** @wixFieldType text */
  expression?: string;
  /** @wixFieldType text */
  traductionFr?: string;
  /** @wixFieldType text */
  nidalum?: string;
  /** @wixFieldType text */
  phonetic?: string;
  /** @wixFieldType text */
  root?: string;
  /** @wixFieldType text */
  french?: string;
  /** @wixFieldType text */
  english?: string;
  /** @wixFieldType text */
  german?: string;
  /** @wixFieldType text */
  letter?: string;
  /** @wixFieldType text */
  symbol?: string;
  /** @wixFieldType text */
  name_nidalum?: string;
  /** @wixFieldType text */
  audio_url?: string;
  /** @wixFieldType number */
  order?: number;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  context?: string;
  /** @wixFieldType text */
  linked_words?: string;
  /** @wixFieldType text */
  rule_slug?: string;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  examples_nidalum?: string;
  /** @wixFieldType text */
  examples_translation?: string;
  /** @wixFieldType text */
  level?: string;
  /** @wixFieldType text */
  related_categories?: string;
  /** @wixFieldType text */
  mot_nidalum?: string;
  /** @wixFieldType text */
  exercise_slug?: string;
  /** @wixFieldType text */
  type?: string;
  /** @wixFieldType text */
  instructions?: string;
  /** @wixFieldType text */
  content_json?: string;
  /** @wixFieldType text */
  answers_json?: string;
  /** @wixFieldType number */
  lesson_id?: number;
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
  /** @wixFieldType date */
  publicationDate?: Date | string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  thumbnailImage?: string;
}


/**
 * Collection ID: origineschronologie
 * Interface for OriginsandChronology
 */
export interface OriginsandChronology {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  image?: string;
  /** @wixFieldType text */
  timeframe?: string;
  /** @wixFieldType text */
  significance?: string;
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
  /** @wixFieldType date */
  publicationDate?: Date | string;
  /** @wixFieldType text */
  isbn?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
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
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  chantImage?: string;
  /** @wixFieldType text */
  theme?: string;
  /** @wixFieldType audio */
  audio?: string;
  /** @wixFieldType text */
  text?: string;
}


/**
 * Collection ID: videoshowcase
 * Interface for VideoShowcase
 */
export interface VideoShowcase {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  videoTitle?: string;
  /** @wixFieldType text */
  videoDescription?: string;
  /** @wixFieldType url */
  videoUrl?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  thumbnailImage?: string;
  /** @wixFieldType date */
  releaseDate?: Date | string;
}
