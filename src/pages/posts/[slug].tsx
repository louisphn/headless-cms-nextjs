import { FC } from 'react';

import {
  GetStaticPropsResult,
  GetStaticPropsContext,
  GetStaticPaths,
} from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { fetchData, fetchSingleData } from '../../lib/graphql';
import { getAsString } from '../../lib/helper';
import type { Post } from '../../types/post';

type Props = {
  post: Post;
};

const PostDetail: FC<Props> = ({ post }) => {
  return (
    <div className="container flex flex-col justify-center items-center p-24">
      <Link href="/">
        <a className="font-bold text-black sticky top-16 transform translate-x-[-35vw] hover:border-black">
          Back to top
        </a>
      </Link>
      <h1 className="py-8">{post.title}</h1>
      {post.featuredImage && (
        <Image
          width={640}
          height={426}
          src={post.featuredImage!.node.sourceUrl}
          alt={'featuredImage'}
        />
      )}
      <article
        className="py-16"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></article>
    </div>
  );
};

export const getStaticProps = async (
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<Props>> => {
  const result = await fetchSingleData(getAsString(context!.params!.slug!));
  const currentPost = await result.json();
  return {
    props: {
      post: currentPost.data.post,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await fetchData();
  const json = await result.json();
  const posts = json.data.posts.nodes;

  const paths = posts.map((post: Post) => ({ params: { slug: post.slug } }));

  return { paths, fallback: false };
};

export default PostDetail;
