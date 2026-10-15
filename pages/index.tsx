import { Fragment } from 'react';
import Head from 'next/head';
import type { GetStaticProps } from 'next';

import FeaturedPosts from '../components/home-page/featured-posts';
import Hero from '../components/home-page/hero';
import { getFeaturedPosts } from '../lib/posts-util';
import type { Post } from '../types/post';

interface HomePageProps {
  posts: Post[];
}

function HomePage({ posts }: HomePageProps) {
  return (
    <Fragment>
      <Head>
        <title>Max' Blog</title>
        <meta
          name="description"
          content="I post about programming and web development."
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </Fragment>
  );
}

export const getStaticProps: GetStaticProps<HomePageProps> = () => {
  return {
    props: {
      posts: getFeaturedPosts(),
    },
  };
};

export default HomePage;
