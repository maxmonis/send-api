import Layout from '../components/Layout';

export async function getStaticProps() {}
export async function getStaticPaths() {}

const Link = () => {
  return (
    <Layout>
      <h1>Link</h1>
    </Layout>
  );
};

export default Link;
