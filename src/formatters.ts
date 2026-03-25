import type { TranscriptResult } from "./transcript";

function formatTimestamp(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.round((seconds % 1) * 1000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")},${String(ms).padStart(3, "0")}`;
}

export function formatTxt(result: TranscriptResult): string {
  return result.segments.map((s) => s.text).join(" ");
}

export function formatSrt(result: TranscriptResult): string {
  return result.segments
    .map((s, i) => {
      const start = formatTimestamp(s.start);
      const end = formatTimestamp(s.start + s.duration);
      return `${i + 1}\n${start} --> ${end}\n${s.text}\n`;
    })
    .join("\n");
}

export function formatJson(result: TranscriptResult): string {
  return JSON.stringify(result, null, 2);
}

export type Format = "txt" | "srt" | "json";

const formatters: Record<Format, (r: TranscriptResult) => string> = {
  txt: formatTxt,
  srt: formatSrt,
  json: formatJson,
};

export function format(result: TranscriptResult, fmt: Format): string {
  const fn = formatters[fmt];
  if (!fn) {
    throw new Error(`Unknown format "${fmt}". Supported: txt, srt, json`);
  }
  return fn(result);
}
