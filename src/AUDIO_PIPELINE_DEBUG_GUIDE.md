# Audio Pipeline Debug Guide

## Overview
This guide explains the audio resolution pipeline for the Artist Portfolio page and how to verify that audio playback is working correctly in production.

## Architecture

### 1. Audio Resolution Pipeline

**File: `/src/lib/audio-resolver.ts`**
- Detects Wix media references (strings starting with "wix:")
- Identifies media objects with url/fileUrl properties
- Prioritizes audio candidates: `artist.audio` > `artist.audioFile` > `artist.audioUrl`
- Provides logging utilities for debugging

**File: `/src/lib/media-service.ts`**
- Converts Wix media references to playable HTTPS URLs
- Handles direct HTTPS URLs (pass-through)
- Calls backend function `/api/media/get-download-url` for Wix references
- Includes fallback URL construction for wix: references

**File: `/src/components/pages/ArtistPortfolioPage.tsx`**
- Loads artists from CMS
- Resolves audio URLs for each artist during load
- Stores resolved URLs in component state
- Passes resolved URLs to ModernAudioPlayer

**File: `/src/components/ModernAudioPlayer.tsx`**
- Plays resolved HTTPS URLs
- Logs all audio events: onLoadStart, onCanPlay, onError, onPlay, onPause, onEnded, onDurationChange
- Provides detailed error messages with error codes

## Verification Steps

### Step 1: Check Console Logs During Page Load

Open the Artist Portfolio page and check the browser console for these log groups:

```
[ARTIST PORTFOLIO] Artists loaded: [...]
[ARTIST PORTFOLIO] Artist Name - Audio candidate found
[AUDIO RESOLVER] Artist Name
  Raw candidate: <value>
  Is Wix ref: <boolean>
  Media ref: <string or null>
  Final playable URL: https://...
  Is HTTPS: true
```

**Expected Output:**
- Raw candidate should show the original value from CMS (wix: reference or URL)
- Final playable URL should be an HTTPS URL
- Is HTTPS should be `true`

### Step 2: Verify Direct URL Playback

1. Copy the resolved HTTPS URL from the console
2. Open a new browser tab
3. Paste the URL into the address bar
4. The audio file should either:
   - Play in the browser's audio player, OR
   - Download the audio file

**If this fails:**
- The URL is not publicly accessible
- Check CORS headers
- Verify the file exists on the server

### Step 3: Test Audio Player Playback

1. Go to the Artist Portfolio page
2. Find an artist with audio
3. Click the Play button
4. Check the console for these events in order:

```
[AUDIO PLAYER] Audio source set to: https://...
[AUDIO PLAYER] Audio element readyState: 2 (or higher)
[AUDIO PLAYER] Audio element networkState: 2 (or higher)
[AUDIO PLAYER] onLoadStart event fired
[AUDIO PLAYER] onCanPlay event fired - audio is ready to play
[AUDIO PLAYER] onPlay event fired - playback started
```

**Expected Behavior:**
- Audio plays audibly through speakers/headphones
- Progress bar advances
- Duration displays correctly
- No error messages appear

### Step 4: Test Modal Audio Playback

1. Click on an artist card to open the modal
2. Check console for:
```
[ARTIST PORTFOLIO MODAL] Artist Name: Opening with audio URL: https://...
```
3. Click Play in the modal
4. Verify audio plays with same event sequence as Step 3

## Debugging Audio Issues

### Issue: No Audio URL Resolved

**Symptoms:**
- Console shows: `[ARTIST PORTFOLIO] Artist Name - Audio candidate found` but no resolved URL
- Player shows "Aucun fichier audio disponible"

**Debug Steps:**
1. Check raw candidate value in console
2. If it's a wix: reference, verify backend endpoint exists: `/api/media/get-download-url`
3. Check browser Network tab for failed requests to backend
4. Verify CORS headers on backend response

### Issue: Audio Plays but No Sound

**Symptoms:**
- Player shows "En lecture..." but no audio output
- All events fire correctly

**Debug Steps:**
1. Check browser volume settings
2. Check system volume
3. Verify audio file format (MP3, WAV, OGG supported)
4. Check browser console for any CORS errors
5. Test with a known working audio URL

### Issue: Error Event Fires

**Symptoms:**
- Console shows: `[AUDIO PLAYER] onError event fired`
- Error code and message displayed

**Debug Steps:**
1. Check error code:
   - `1` = MEDIA_ERR_ABORTED (loading aborted)
   - `2` = MEDIA_ERR_NETWORK (network error)
   - `3` = MEDIA_ERR_DECODE (decoding error)
   - `4` = MEDIA_ERR_SRC_NOT_SUPPORTED (source not supported)

2. For MEDIA_ERR_NETWORK (code 2):
   - Verify URL is accessible
   - Check CORS headers
   - Verify SSL certificate (if HTTPS)

3. For MEDIA_ERR_DECODE (code 3):
   - Verify audio file format
   - Check file integrity
   - Try different format

4. For MEDIA_ERR_SRC_NOT_SUPPORTED (code 4):
   - Verify audio format is supported
   - Check MIME type headers

## Console Log Reference

### Audio Resolver Logs
```
[AUDIO RESOLVER] Artist Name
  Raw candidate: <the original value from CMS>
  Is Wix ref: <true if wix: reference>
  Media ref: <extracted reference or null>
  Final playable URL: <resolved HTTPS URL>
  Is HTTPS: <true if URL is HTTPS>
```

### Artist Portfolio Logs
```
[ARTIST PORTFOLIO] Artists loaded: [...]
[ARTIST PORTFOLIO] Artist Name - Audio candidate found
[ARTIST PORTFOLIO] Artist Name - Using direct HTTPS URL
[ARTIST PORTFOLIO] Artist Name - Resolved Wix reference to: https://...
[ARTIST PORTFOLIO] Artist Name - Failed to resolve audio: <error>
[ARTIST PORTFOLIO MODAL] Artist Name: Opening with audio URL: https://...
```

### Audio Player Logs
```
[AUDIO PLAYER] Audio source set to: https://...
[AUDIO PLAYER] Audio element readyState: <0-4>
[AUDIO PLAYER] Audio element networkState: <0-3>
[AUDIO PLAYER] onLoadStart event fired
[AUDIO PLAYER] onCanPlay event fired - audio is ready to play
[AUDIO PLAYER] onPlay event fired - playback started
[AUDIO PLAYER] onPause event fired - playback paused
[AUDIO PLAYER] onEnded event fired - playback completed
[AUDIO PLAYER] onDurationChange event fired, duration: <seconds>
[AUDIO PLAYER] Audio playback started successfully
[AUDIO PLAYER] Play error: <error>
[AUDIO PLAYER] Error name: <NotAllowedError|NotSupportedError|AbortError>
[AUDIO PLAYER] Error message: <error message>
```

## Production Verification Checklist

- [ ] Open Artist Portfolio page
- [ ] Check console for resolved HTTPS URLs
- [ ] Copy resolved URL and verify it plays in new tab
- [ ] Click Play on at least 2 artists with audio
- [ ] Verify audio plays audibly
- [ ] Check all console events fire in correct order
- [ ] Test modal audio playback
- [ ] Verify no error messages appear
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile devices

## Backend Endpoint (Required for Wix References)

**Endpoint:** `POST /api/media/get-download-url`

**Request:**
```json
{
  "fileRef": "wix:audio://v1/..."
}
```

**Response:**
```json
{
  "url": "https://static.wixstatic.com/media/..."
}
```

**Implementation Note:**
This endpoint should use `wix-media-backend` mediaManager.getDownloadUrl(fileRef) to convert Wix references to temporary download URLs.

## Files Modified

1. `/src/lib/audio-resolver.ts` - NEW - Audio reference detection and resolution
2. `/src/lib/media-service.ts` - NEW - Wix media reference to HTTPS URL conversion
3. `/src/components/ModernAudioPlayer.tsx` - MODIFIED - Added detailed logging
4. `/src/components/pages/ArtistPortfolioPage.tsx` - MODIFIED - Added audio resolution pipeline

## Testing with Sample Data

To test the audio pipeline without real audio files:

1. Create test artists with audio URLs:
   - Direct HTTPS URL: `https://example.com/audio.mp3`
   - Wix reference: `wix:audio://v1/hash~mv2/filename.mp3`

2. Monitor console logs to verify resolution

3. Use browser DevTools Network tab to verify requests

## Troubleshooting Commands

### View all audio-related logs
```javascript
// In browser console
console.log(document.querySelectorAll('[class*="AUDIO"]'))
```

### Check audio element state
```javascript
// In browser console
const audio = document.querySelector('audio');
console.log({
  src: audio.src,
  readyState: audio.readyState,
  networkState: audio.networkState,
  duration: audio.duration,
  currentTime: audio.currentTime,
  error: audio.error
});
```

### Test URL directly
```javascript
// In browser console
const audio = new Audio();
audio.crossOrigin = 'anonymous';
audio.src = 'https://your-url-here.mp3';
audio.play();
```
