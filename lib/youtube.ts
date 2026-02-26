const MAX_IDS_PER_REQUEST = 50;

export type YouTubeVideoInfo = {
  id: string;
  title: string;
  thumbnailUrl: string;
};

type YouTubeSnippet = {
  title: string;
  thumbnails?: {
    default?: { url: string };
    medium?: { url: string };
    high?: { url: string };
    maxres?: { url: string };
  };
};

type YouTubeVideosResponse = {
  items?: Array<{ id: string; snippet?: YouTubeSnippet }>;
  error?: { code: number; message: string };
};

export async function fetchYouTubeVideos(
  videoIds: string[],
  apiKey: string,
  apiUrl: string = "https://www.googleapis.com/youtube/v3"
): Promise<YouTubeVideoInfo[]> {
  if (!apiKey || videoIds.length === 0) return [];

  const results: YouTubeVideoInfo[] = [];
  const chunks: string[][] = [];

  for (let i = 0; i < videoIds.length; i += MAX_IDS_PER_REQUEST) {
    chunks.push(videoIds.slice(i, i + MAX_IDS_PER_REQUEST));
  }

  for (const chunk of chunks) {
    const ids = chunk.join(",");
    const url = `${apiUrl}/videos?part=snippet&id=${encodeURIComponent(ids)}&key=${apiKey}`;

    const res = await fetch(url);
    const data = (await res.json()) as YouTubeVideosResponse;

    if (data.error) {
      console.error("YouTube API error:", data.error);
      continue;
    }

    for (const item of data.items ?? []) {
      const snippet = item.snippet;
      if (!snippet) continue;
      const thumbnails = snippet.thumbnails;
      const thumbnailUrl =
        thumbnails?.maxres?.url ??
        thumbnails?.high?.url ??
        thumbnails?.medium?.url ??
        thumbnails?.default?.url ??
        "";
      results.push({
        id: item.id,
        title: snippet.title ?? "",
        thumbnailUrl,
      });
    }
  }

  return results;
}
