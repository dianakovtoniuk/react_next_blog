import classes from './all-posts.module.css';
import PostsGrid from './posts-grid';
import type { Post } from '../../types/post';

interface AllPostsProps {
  posts: Post[];
}

function AllPosts({ posts }: AllPostsProps) {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={posts} />
    </section>
  );
}

export default AllPosts;
