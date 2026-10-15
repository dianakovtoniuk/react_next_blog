export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  isFeatured: boolean;
}

export interface Post extends PostMeta {
  content: string;
}
