export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  thumbnail: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

// Empty for now - will be powered by Sanity
export const blogPosts: BlogPost[] = [];

export async function getAllPosts() {
  return blogPosts;
}

export async function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}
