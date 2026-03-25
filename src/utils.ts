const VIDEO_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/;

const URL_PATTERNS = [
  /(?:youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]{11})/,
  /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
];

export function extractVideoId(input: string): string {
  const trimmed = input.trim();

  if (VIDEO_ID_REGEX.test(trimmed)) {
    return trimmed;
  }

  for (const pattern of URL_PATTERNS) {
    const match = trimmed.match(pattern);
    if (match) {
      return match[1];
    }
  }

  throw new Error(
    `Invalid YouTube URL or video ID: "${input}"\n` +
      "Supported formats:\n" +
      "  https://www.youtube.com/watch?v=VIDEO_ID\n" +
      "  https://youtu.be/VIDEO_ID\n" +
      "  https://www.youtube.com/shorts/VIDEO_ID\n" +
      "  https://www.youtube.com/embed/VIDEO_ID\n" +
      "  VIDEO_ID (11 characters)"
  );
}
