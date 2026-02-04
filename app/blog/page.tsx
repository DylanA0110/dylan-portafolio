import type { Metadata } from 'next';
import Link from 'next/link';

import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getAllPosts } from '@/lib/blog';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Artículos sobre desarrollo web, diseño y software.',
  alternates: { canonical: '/blog' },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 md:px-6 pt-28 pb-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-black">Blog</h1>
          <p className="mt-3 text-muted-foreground">
            Ideas, notas y write-ups. Próximamente estará conectado con Sanity.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="mt-10 max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>Sin posts todavía</CardTitle>
                <CardDescription>
                  En cuanto conecte Sanity, aquí aparecerán los artículos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/" className="underline underline-offset-4">
                  Volver al inicio
                </Link>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="block">
                <Card className="h-full hover:border-accent transition-colors">
                  <CardHeader>
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    <CardDescription>
                      <span className="mr-2">{post.category}</span>
                      <span aria-hidden>·</span>
                      <span className="ml-2">{post.readTime}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
