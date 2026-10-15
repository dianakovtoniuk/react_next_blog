import Head from 'next/head';
import { Fragment } from 'react';
import type { GetStaticProps } from 'next';

import AllPosts from '../../components/posts/all-posts';
import { getAllPosts } from '../../lib/posts-util';
import type { Post } from '../../types/post';

interface AllPostsPageProps {
  posts: Post[];
}

function AllPostsPage({ posts }: AllPostsPageProps) {
  return (
    <Fragment>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="A list of all programming-related tutorials and posts!"
        />
      </Head>
      <AllPosts posts={posts} />
    </Fragment>
  );
}

export const getStaticProps: GetStaticProps<AllPostsPageProps> = () => {
  return {
    props: {
      posts: getAllPosts(),
    },
  };
};

export default AllPostsPage;
