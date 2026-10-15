import Head from 'next/head';
import { Fragment } from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';

import PostContent from '../../components/posts/post-detail/post-content';
import { getPostData, getPostsFiles } from '../../lib/posts-util';
import type { Post } from '../../types/post';

interface PostDetailPageProps {
  post: Post;
}

function PostDetailPage({ post }: PostDetailPageProps) {
  return (
    <Fragment>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </Fragment>
  );
}

export const getStaticProps: GetStaticProps<
  PostDetailPageProps,
  { slug: string }
> = ({ params }) => {
  const { slug } = params!;

  return {
    props: {
      post: getPostData(slug),
    },
    revalidate: 600,
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const slugs = getPostsFiles().map((fileName) => fileName.replace(/\.md$/, ''));

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export default PostDetailPage;
