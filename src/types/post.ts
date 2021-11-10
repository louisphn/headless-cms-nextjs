export type Post = {
  content: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
  slug: string;
  title: string;
};
