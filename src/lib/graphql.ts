export const fetchData = () => {
  return fetch('http://louisphn.wordpress.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query AllPostsQuery {
          posts {
            nodes {
              slug
              content
              title
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
          }
        }
      `,
    }),
  });
};

export const fetchSingleData = (slug: string) => {
  return fetch('http://louisphn.wordpress.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
      query SinglePost($id: ID!, $idType: PostIdType!) {
          post(id: $id, idType: $idType) {
              title
              slug
              content
              featuredImage {
                  node {
                      sourceUrl
                  }
              }
          }
      }
  `,
      variables: {
        id: slug,
        idType: 'SLUG',
      },
    }),
  });
};
