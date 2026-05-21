---
name: yt-transcription
description: Use when a user provides a YouTube URL, video ID, or shorts/embed link and wants the transcript, captions, subtitles, or spoken text extracted — including auto-generated captions, non-English captions, or SRT/JSON output with timestamps. Do not use for audio/video download, translation, or summarization.
---

# YouTube Transcript Fetcher

Fetch captions from any YouTube video via the Innertube API. No API key, no external dependencies.

## When to Use

- User pastes a YouTube URL or 11-char video ID and asks for the transcript, captions, or "what was said"
- User wants subtitles exported as `.srt` for editing or re-uploading
- User wants timestamped JSON for downstream NLP/search
- User specifies a non-default caption language (`es`, `fr`, etc.)

**Do NOT use for:** audio download, video download, translation, summarization (transcribe first with this skill, then summarize separately), or videos known to have captions disabled.

## Prerequisites

- Bun runtime installed (https://bun.sh)
- `yt-transcription` linked globally (`bun link` from the repo root) so the CLI is on `$PATH`
- Network access to `youtube.com`

## Quick Reference

| Goal | Command |
|------|---------|
| Plain text | `yt-transcription <url-or-id>` |
| SRT subtitles | `yt-transcription <id> --format srt` |
| Timestamped JSON | `yt-transcription <id> --format json` |
| Specific language | `yt-transcription <id> --lang es` |
| Custom output path | `yt-transcription <id> --output path.txt` |

### Options

- `--format <txt|srt|json>` — output format (default `txt`)
- `--lang <code>` — caption language code (default: auto-detect, prefers English)
- `--output <path>` — output file path (default `<videoId>.<format>`)

### Accepted URL forms

`youtube.com/watch?v=ID`, `youtu.be/ID`, `youtube.com/shorts/ID`, `youtube.com/embed/ID`, or a raw 11-char ID.

## Output Formats

- **txt** — one segment per line, no timestamps
- **srt** — standard SubRip with `HH:MM:SS,mmm` timestamps, ready for video players
- **json** — array of `{ start, duration, text }` objects plus video metadata

## How It Works

1. Loads the watch page to extract `INNERTUBE_API_KEY` and session cookies
2. Calls the Innertube player endpoint with an Android client context to retrieve caption track URLs
3. Fetches and parses the caption XML into structured segments

## Common Failures

| Symptom | Cause / Fix |
|---------|-------------|
| "No captions available" | Video has captions disabled — no workaround |
| "Language not found" | Requested `--lang` not published; retry without `--lang` to auto-pick |
| HTTP 429 / empty body | YouTube rate-limit or IP block — wait, retry, or change network |
| Parse / extraction errors | YouTube changed Innertube internals — the skill needs updating |

## Limitations

- Uses YouTube's undocumented Innertube API; may break when YouTube changes internals
- Subject to rate-limiting and IP-blocking under heavy use
- Cannot transcribe videos that have no captions at all (manual or auto-generated)
