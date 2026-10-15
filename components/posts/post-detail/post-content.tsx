import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown/src/ast-to-react';
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import PostHeader from './post-header';
import classes from './post-content.module.css';
import type { Post } from '../../../types/post';

interface PostContentProps {
  post: Post;
}

function PostContent({ post }: PostContentProps) {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenderers: Components = {
    p({ node, children }) {
      const firstChild = node.children[0];

      if (firstChild.type === 'element' && firstChild.tagName === 'img') {
        const { src, alt } = firstChild.properties as {
          src: string;
          alt?: string;
        };

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${src}`}
              alt={alt ?? ''}
              width={600}
              height={300}
            />
          </div>
        );
      }

      return <p>{children}</p>;
    },

    code({ inline, className, children }) {
      // className is something like language-js => we need the "js" part here
      const language = className?.split('-')[1];

      if (inline || !language) {
        return <code className={className}>{children}</code>;
      }

      return (
        <SyntaxHighlighter style={atomDark} language={language}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
