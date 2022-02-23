import client from "../../client";

const ISR = ({ article }) => {
  return (
    <article>
      <h1>{article?.title}</h1>
    </article>
  );
};

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "article" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { slug = "" } = context.params;
  const article = await client.fetch(
    `
    *[_type == "article" && slug.current == $slug][0]
  `,
    { slug }
  );
  return {
    props: {
      article,
    },
    revalidate: 20,
  };
}

export default ISR;
