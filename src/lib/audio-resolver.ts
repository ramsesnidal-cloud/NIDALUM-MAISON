/**
 * Audio URL Resolver
 * Handles conversion of Wix Media Manager references to playable HTTPS URLs
 */

/**
 * Detects if a value is a Wix media reference
 * @param value - The value to check
 * @returns true if it's a wix: reference or media object
 */
export function isWixMediaRef(value: any): boolean {
  if (typeof value === 'string') {
    return value.startsWith('wix:') || value.includes('wix:');
  }
  
  if (typeof value === 'object' && value !== null) {
    // Check for media object structure
    if (value.url || value.fileUrl || value.mediaKey) {
      return true;
    }
    // Check for nested arrays (Wix media manager format)
    if (Array.isArray(value)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Checks if a URL is a direct HTTPS URL (playable)
 * @param url - The URL to check
 * @returns true if it's a direct HTTPS URL
 */
export function isDirectHttpsUrl(url: any): boolean {
  if (typeof url !== 'string') return false;
  return url.startsWith('https://') && !url.includes('wix:');
}

/**
 * Extracts media reference from various formats
 * @param value - The value to extract from
 * @returns The media reference string or null
 */
export function extractMediaRef(value: any): string | null {
  if (typeof value === 'string' && value.startsWith('wix:')) {
    return value;
  }
  
  if (typeof value === 'object' && value !== null) {
    // Check for direct URL in object
    if (value.url && typeof value.url === 'string') {
      return value.url;
    }
    if (value.fileUrl && typeof value.fileUrl === 'string') {
      return value.fileUrl;
    }
    if (value.mediaKey && typeof value.mediaKey === 'string') {
      return value.mediaKey;
    }
  }
  
  return null;
}

/**
 * Resolves audio URL with priority order
 * Priority: artist.audio > artist.audioFile > artist.audioUrl
 * @param candidates - Object with audio candidates
 * @returns Resolved URL or null
 */
export function resolveAudioCandidate(candidates: {
  audio?: any;
  audioFile?: any;
  audioUrl?: any;
}): {
  raw: any;
  isWixRef: boolean;
  mediaRef: string | null;
} | null {
  // Priority order
  const priority = [candidates.audio, candidates.audioFile, candidates.audioUrl];
  
  for (const candidate of priority) {
    if (candidate) {
      return {
        raw: candidate,
        isWixRef: isWixMediaRef(candidate),
        mediaRef: extractMediaRef(candidate)
      };
    }
  }
  
  return null;
}

/**
 * Logs audio resolution details for debugging
 * @param artistName - Artist name for logging context
 * @param candidate - The resolved candidate
 * @param finalUrl - The final playable URL (if resolved)
 */
export function logAudioResolution(
  artistName: string,
  candidate: any,
  finalUrl?: string
): void {
  console.group(`[AUDIO RESOLVER] ${artistName}`);
  console.log('Raw candidate:', candidate);
  console.log('Is Wix ref:', isWixMediaRef(candidate));
  console.log('Media ref:', extractMediaRef(candidate));
  if (finalUrl) {
    console.log('Final playable URL:', finalUrl);
    console.log('Is HTTPS:', finalUrl.startsWith('https://'));
  }
  console.groupEnd();
}
