import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";

type PageProps = { params: Promise<{ slug: string }> };

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

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(decodeURIComponent(slug));

  if (!post) notFound();

  return (
    <article className="pb-20">
      <Link
        href="/blog"
        className="text-muted-foreground hover:text-foreground text-sm mb-6 inline-block"
      >
        ← Blog
      </Link>

      <header className="mb-8">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          {post.title}
        </h1>
        {post.pubDate && (
          <time
            className="text-muted-foreground text-sm mt-2 block"
            dateTime={post.pubDate}
          >
            {formatDate(post.pubDate)}
          </time>
        )}
        {post.heroImage && (
          <div className="mt-4 rounded-lg overflow-hidden border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.heroImage}
              alt=""
              className="w-full object-cover"
            />
          </div>
        )}
      </header>

      <div className="blog-prose max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-muted pl-4 italic my-4 text-muted-foreground">
                {children}
              </blockquote>
            ),
            ul: ({ children }) => <ul className="list-disc pl-6 my-4 space-y-1">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-6 my-4 space-y-1">{children}</ol>,
            li: ({ children }) => <li className="leading-relaxed">{children}</li>,
            h2: ({ children }) => (
              <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8 mb-4">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6 mb-3">
                {children}
              </h3>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:no-underline"
              >
                {children}
              </a>
            ),
            code: ({ children }) => (
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre className="overflow-x-auto rounded-lg bg-muted p-4 my-4 text-sm">
                {children}
              </pre>
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
