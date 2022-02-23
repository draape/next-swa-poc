import client from "../../client";

const SSR = ({ article }) => {
  return (
    <article>
      <h1>{article?.title}</h1>
    </article>
  );
};

export async function getServerSideProps({ params }) {
  const { slug } = params;
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
  };
}

export default SSR;
