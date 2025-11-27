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
  /** @wixFieldType image */
  programImage?: string;
  /** @wixFieldType text */
  programLevel?: string;
  /** @wixFieldType text */
  programDuration?: string;
  /** @wixFieldType url */
  enrollmentLink?: string;
  /** @wixFieldType boolean */
  isAvailable?: boolean;
}


/**
 * Collection ID: alphabetnidalum
 * Interface for NidalumAlphabet
 */
export interface NidalumAlphabet {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  letter?: string;
  /** @wixFieldType text */
  pronunciation?: string;
  /** @wixFieldType text */
  meaning?: string;
  /** @wixFieldType image */
  glyphImage?: string;
  /** @wixFieldType number */
  alphabeticalOrder?: number;
  /** @wixFieldType text */
  letterType?: string;
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
  /** @wixFieldType image */
  thumbnailImage?: string;
  /** @wixFieldType boolean */
  isActive?: boolean;
  /** @wixFieldType video */
  video?: string;
}


/**
 * Collection ID: grammairenidalum
 * Interface for RglesdeGrammaireNidalum
 */
export interface RglesdeGrammaireNidalum {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  ruleTitle?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  explanation?: string;
  /** @wixFieldType text */
  nidalumExample?: string;
  /** @wixFieldType text */
  exampleTranslation?: string;
  /** @wixFieldType text */
  additionalNotes?: string;
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
  /** @wixFieldType image */
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
  /** @wixFieldType image */
  image?: string;
  /** @wixFieldType text */
  timeframe?: string;
  /** @wixFieldType text */
  significance?: string;
}


/**
 * Collection ID: phonetiquenidalum
 * Interface for NidalumPhonetics
 */
export interface NidalumPhonetics {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  character?: string;
  /** @wixFieldType text */
  type?: string;
  /** @wixFieldType text */
  pronunciationGuide?: string;
  /** @wixFieldType text */
  exampleWord?: string;
  /** @wixFieldType url */
  audioPronunciation?: string;
  /** @wixFieldType image */
  visualRepresentation?: string;
  /** @wixFieldType text */
  notes?: string;
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
