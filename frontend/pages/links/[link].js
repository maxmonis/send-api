import Layout from '../../components/Layout';
import client from '../../config/axios';

export async function getServerSideProps({ params }) {
  const { link } = params;
  const { data } = await client.get(`/api/links/${link}`);
  return {
    props: {
      link: data,
    },
  };
}
export async function getServerSidePaths() {
  const { data } = await client.get('/api/links');
  return {
    paths: data.links.map((link) => ({
      params: { link: link.url },
    })),
    fallback: false,
  };
}

const Link = ({ link }) => {
  return (
    <Layout>
      <h1 className='text-4xl text-center text-gray-700'>
        Download your file:
      </h1>
      <div className='flex items-center justify-center mt-10'>
        <a
          className='bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer'
          href={`${process.env.backendURL}/uploads/${link.file}`}
        >
          Here
        </a>
      </div>
    </Layout>
  );
};

export default Link;
