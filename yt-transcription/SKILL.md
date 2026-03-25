---
name: yt-transcription
description: >
  Fetch transcripts from YouTube videos using the Innertube API. Use when a user
  provides a YouTube URL or video ID and wants to extract captions, subtitles, or
  transcript text. Supports multiple languages, auto-generated and manual captions,
  and outputs as plain text, SRT, or JSON. No API keys or external dependencies required.
license: MIT
compatibility: Requires Bun runtime (https://bun.sh)
metadata:
  author: muneebhashone
  version: "1.0.0"
---

# YouTube Transcript Fetcher

Fetch transcripts from YouTube videos via the Innertube API. Zero external dependencies.

## Usage

```bash
bun run index.ts <youtube-url-or-video-id> [options]
```

### Options

- `--format <txt|srt|json>` — Output format (default: `txt`)
- `--lang <code>` — Language code, e.g. `en`, `es`, `fr` (default: auto-detect)
- `--output <path>` — Output file path (default: `<videoId>.<format>`)

### Examples

```bash
# Fetch transcript as plain text
bun run index.ts https://www.youtube.com/watch?v=dQw4w9WgXcQ

# Export as SRT subtitles
bun run index.ts dQw4w9WgXcQ --format srt

# Fetch Spanish transcript
bun run index.ts dQw4w9WgXcQ --lang es --output transcript.txt

# Export as structured JSON with metadata and timestamps
bun run index.ts dQw4w9WgXcQ --format json
```

## How it works

1. Fetches the YouTube video page to extract the `INNERTUBE_API_KEY` and session cookies
2. Calls the Innertube player endpoint with an Android client context to get caption track URLs
3. Fetches and parses the caption XML into structured transcript segments

## Supported URL formats

- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/shorts/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- Raw 11-character video ID

## Limitations

- Uses YouTube's undocumented Innertube API — may break if YouTube changes internals
- May be rate-limited or IP-blocked with heavy usage
- Only works with videos that have captions (manual or auto-generated)
