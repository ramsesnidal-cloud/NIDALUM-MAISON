/**
 * Media Service - Handles conversion of Wix media references to playable URLs
 * This service bridges the gap between Wix Media Manager references and playable HTTPS URLs
 */

/**
 * Converts a Wix media reference to a playable HTTPS URL
 * Handles various formats:
 * - wix: references (Wix Media Manager format)
 * - Direct HTTPS URLs (pass-through)
 * - Media objects with url/fileUrl properties
 * 
 * @param fileRef - The file reference (wix: string, URL, or media object)
 * @returns Promise<string> - A playable HTTPS URL
 */
export async function getPlayableAudioUrl(fileRef: any): Promise<string> {
  try {
    // If it's already a direct HTTPS URL, return it
    if (typeof fileRef === 'string' && fileRef.startsWith('https://')) {
      console.log('[MEDIA SERVICE] Direct HTTPS URL detected:', fileRef);
      return fileRef;
    }

    // If it's a wix: reference, we need to convert it
    if (typeof fileRef === 'string' && fileRef.startsWith('wix:')) {
      console.log('[MEDIA SERVICE] Wix reference detected:', fileRef);
      
      // Call backend function to get download URL
      try {
        const response = await fetch('/api/media/get-download-url', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fileRef })
        });

        if (!response.ok) {
          throw new Error(`Backend error: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.url) {
          console.log('[MEDIA SERVICE] Converted to playable URL:', data.url);
          return data.url;
        }
      } catch (err) {
        console.error('[MEDIA SERVICE] Backend conversion failed:', err);
        // Fallback: try to construct a direct URL from the wix reference
        return constructFallbackUrl(fileRef);
      }
    }

    // If it's a media object, extract the URL
    if (typeof fileRef === 'object' && fileRef !== null) {
      if (fileRef.url && typeof fileRef.url === 'string') {
        console.log('[MEDIA SERVICE] Media object with URL:', fileRef.url);
        return fileRef.url;
      }
      if (fileRef.fileUrl && typeof fileRef.fileUrl === 'string') {
        console.log('[MEDIA SERVICE] Media object with fileUrl:', fileRef.fileUrl);
        return fileRef.fileUrl;
      }
    }

    // If we can't resolve it, throw an error
    throw new Error('Unable to resolve audio URL from provided reference');
  } catch (error) {
    console.error('[MEDIA SERVICE] Error resolving audio URL:', error);
    throw error;
  }
}

/**
 * Fallback URL construction for wix: references
 * Attempts to create a playable URL from the wix reference
 * @param wixRef - The wix: reference string
 * @returns A potentially playable URL
 */
function constructFallbackUrl(wixRef: string): string {
  // Wix media URLs typically follow this pattern:
  // wix:image://v1/[hash]~mv2/[filename]
  // We can try to construct a CDN URL from this
  
  console.log('[MEDIA SERVICE] Using fallback URL construction for:', wixRef);
  
  // Extract the hash and filename from wix reference
  const match = wixRef.match(/wix:audio:\/\/v1\/([^~]+)~mv2\/(.+)/);
  if (match) {
    const [, hash, filename] = match;
    // Construct a Wix CDN URL
    const fallbackUrl = `https://static.wixstatic.com/media/${hash}~mv2/${filename}`;
    console.log('[MEDIA SERVICE] Fallback URL:', fallbackUrl);
    return fallbackUrl;
  }
  
  // If pattern doesn't match, return the original reference
  // (it might still work in some contexts)
  return wixRef;
}

/**
 * Batch resolve multiple audio URLs
 * @param fileRefs - Array of file references
 * @returns Promise<string[]> - Array of playable URLs
 */
export async function getPlayableAudioUrls(fileRefs: any[]): Promise<string[]> {
  return Promise.all(fileRefs.map(ref => getPlayableAudioUrl(ref)));
}
