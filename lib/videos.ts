import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const VIDEOS_DIR = path.join(process.cwd(), "app/videos");

export type VideoMeta = {
  slug: string;
  youtubeId: string;
  title?: string;
  pubDate?: string;
};

function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, "");
}

export function getAllVideos(): VideoMeta[] {
  const dir = VIDEOS_DIR;
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  const list: VideoMeta[] = [];

  for (const file of files) {
    const slug = getSlugFromFilename(file);
    const fullPath = path.join(dir, file);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data } = matter(raw);
    const youtubeId = (data.youtubeId as string)?.trim();
    if (!youtubeId) continue;

    const pubDate = data.pubDate ?? "";
    list.push({
      slug,
      youtubeId,
      title: (data.title as string) ?? undefined,
      pubDate: typeof pubDate === "string" ? pubDate : String(pubDate),
    });
  }

  list.sort((a, b) => {
    if (!a.pubDate || !b.pubDate) return 0;
    const dateA = new Date(a.pubDate).getTime();
    const dateB = new Date(b.pubDate).getTime();
    return dateB - dateA;
  });

  return list;
}
