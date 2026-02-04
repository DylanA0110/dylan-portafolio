import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { getAllPosts, getPostBySlug } from '@/lib/blog';

export const dynamic = 'force-static';
export const dynamicParams = false;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post no encontrado',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 md:px-6 pt-28 pb-16">
        <article className="mx-auto max-w-3xl">
          <p className="text-sm text-muted-foreground">
            {post.category} <span aria-hidden>·</span> {post.readTime}
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-black text-balance">
            {post.title}
          </h1>
          <p className="mt-6 text-muted-foreground">{post.excerpt}</p>

          <div className="mt-10 rounded-lg border border-border/50 bg-card/50 p-6">
            <p className="text-sm text-muted-foreground">
              Contenido de ejemplo. Cuando conecte Sanity, esta página debería
              renderizar Portable Text (contenido enriquecido) y la fecha real
              de publicación.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
