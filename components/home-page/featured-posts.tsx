import PostsGrid from '../posts/posts-grid';
import classes from './featured-posts.module.css';
import type { Post } from '../../types/post';

interface FeaturedPostsProps {
  posts: Post[];
}

function FeaturedPosts({ posts }: FeaturedPostsProps) {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
}

export default FeaturedPosts;
