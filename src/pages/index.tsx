import { FC } from 'react';

import { GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';

import { fetchData } from '../lib/graphql';
import type { Post } from '../types/post';

type Props = {
  posts: Post[];
};

const Index: FC<Props> = ({ posts }) => {
  const router = useRouter();

  return (
    <section className="container h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl my-8">
        This is a demo website using Wordpress as Headless CMS
      </h1>
      <p>
        All the{' '}
        <a target="__blank" href="https://graphql.org/">
          (GraphQL)
        </a>{' '}
        data is fetched from Wordpress admin server
      </p>
      <p>
        This page is built with{' '}
        <a target="__blank" href="https://nextjs.org/">
          Nextjs
        </a>{' '}
        . Please try out by clicking on any of the blog titles below
      </p>
      <p className="italic">
        * Post datas are collected from several sources and given credit in each
        post detail page
      </p>
      <ul className="my-4">
        <h2>List of contents</h2>
        {posts.map((post) => (
          <li
            className="my-4 underline cursor-pointer"
            onClick={() => router.push(`/posts/${post.slug}`)}
            key={post.slug}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <a
        className="sticky top-[80vh]"
        target="__blank"
        href="https://github.com/louisphn/headless-cms-nextjs"
      >
        View sourcecode here
      </a>
    </section>
  );
};

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  const result = await fetchData();
  const queryData = await result.json();

  return {
    props: {
      posts: queryData.data.posts.nodes,
    },
  };
};

export default Index;
