import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

function formatDate(pubDate: string): string {
  if (!pubDate) return "";
  const d = new Date(pubDate);
  if (Number.isNaN(d.getTime())) return pubDate;
  return d.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="pb-20">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        Blog
      </h1>
      <p className="text-muted-foreground mt-2">
        Những bài viết tham khảo của tôi.
      </p>

      <ul className="mt-8 grid grid-cols-1 gap-6 list-none">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${encodeURIComponent(post.slug)}`}
              className="block rounded-lg border border-transparent p-4 transition-colors hover:border-muted hover:bg-muted/50"
            >
              <h2 className="font-semibold text-lg">{post.title}</h2>
              {post.pubDate && (
                <time
                  className="text-sm text-muted-foreground"
                  dateTime={post.pubDate}
                >
                  {formatDate(post.pubDate)}
                </time>
              )}
              {post.description && (
                <p className="text-muted-foreground mt-1 text-sm line-clamp-2">
                  {post.description}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>

      {posts.length === 0 && (
        <p className="text-muted-foreground mt-8">Chưa có bài viết nào.</p>
      )}
    </section>
  );
}
