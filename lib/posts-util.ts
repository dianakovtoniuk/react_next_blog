import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

import type { Post } from '../types/post';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostsFiles(): string[] {
  return fs.readdirSync(postsDirectory);
}

export function getPostData(postIdentifier: string): Post {
  const postSlug = postIdentifier.replace(/\.md$/, ''); // removes the file extension
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug: postSlug,
    title: data.title,
    date: data.date,
    image: data.image,
    excerpt: data.excerpt,
    isFeatured: Boolean(data.isFeatured),
    content,
  };
}

export function getAllPosts(): Post[] {
  const allPosts = getPostsFiles().map((postFile) => getPostData(postFile));

  return allPosts.sort((postA, postB) => (postA.date > postB.date ? -1 : 1));
}

export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter((post) => post.isFeatured);
}
