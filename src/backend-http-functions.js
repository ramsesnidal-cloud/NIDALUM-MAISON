/**
 * Backend HTTP Functions for Media Management
 * These functions are deployed to Wix backend and handle media operations
 */

import { mediaManager } from 'wix-media-backend';

/**
 * POST function to convert Wix media references to playable download URLs
 * Endpoint: POST /_functions/media_get_download_url
 * 
 * @param {Object} request - The HTTP request object
 * @param {Object} request.body - The request body
 * @param {string} request.body.fileRef - The Wix media reference (e.g., "wix:audio://...")
 * @returns {Promise<Object>} JSON response with downloadUrl
 */
export async function post_media_get_download_url(request) {
  try {
    const body = request.body;
    
    if (!body || !body.fileRef) {
      return {
        status: 400,
        body: {
          error: 'Missing fileRef in request body'
        }
      };
    }

    const fileRef = body.fileRef;
    console.log('[BACKEND] Received fileRef:', fileRef);

    // Call Wix Media Manager to get the download URL
    const downloadUrl = await mediaManager.getDownloadUrl(fileRef);
    
    console.log('[BACKEND] Generated download URL:', downloadUrl);

    return {
      status: 200,
      body: {
        downloadUrl: downloadUrl
      }
    };
  } catch (error) {
    console.error('[BACKEND] Error getting download URL:', error);
    
    return {
      status: 500,
      body: {
        error: 'Failed to generate download URL',
        message: error.message
      }
    };
  }
}
