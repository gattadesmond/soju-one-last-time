import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "app/blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  heroImage?: string;
  url?: string;
};

export type Post = PostMeta & {
  content: string;
};

function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, "");
}

export function getAllPosts(): PostMeta[] {
  const dir = BLOG_DIR;
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  const posts: PostMeta[] = [];

  for (const file of files) {
    const slug = getSlugFromFilename(file);
    const fullPath = path.join(dir, file);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data } = matter(raw);
    const pubDate = data.pubDate ?? "";
    posts.push({
      slug,
      title: (data.title as string) ?? slug,
      description: (data.description as string) ?? "",
      pubDate: typeof pubDate === "string" ? pubDate : String(pubDate),
      heroImage: data.heroImage as string | undefined,
      url: data.url as string | undefined,
    });
  }

  posts.sort((a, b) => {
    const dateA = new Date(a.pubDate).getTime();
    const dateB = new Date(b.pubDate).getTime();
    return dateB - dateA;
  });

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const possibleFiles = [slug + ".md", decodeURIComponent(slug) + ".md"];
  const dir = BLOG_DIR;

  for (const file of possibleFiles) {
    const fullPath = path.join(dir, file);
    if (!fs.existsSync(fullPath)) continue;

    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(raw);
    const pubDate = data.pubDate ?? "";

    return {
      slug: getSlugFromFilename(file),
      title: (data.title as string) ?? slug,
      description: (data.description as string) ?? "",
      pubDate: typeof pubDate === "string" ? pubDate : String(pubDate),
      heroImage: data.heroImage as string | undefined,
      url: data.url as string | undefined,
      content: content.trim(),
    };
  }

  return null;
}

export function getAllSlugs(): string[] {
  const dir = BLOG_DIR;
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => getSlugFromFilename(f));
}
