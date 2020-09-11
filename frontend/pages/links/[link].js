import { useState, useContext } from 'react';
import Alert from '../../components/Alert';
import Layout from '../../components/Layout';
import client from '../../config/axios';
import appContext from '../../context/app/appContext';

export async function getServerSideProps({ params }) {
  const { link } = params;
  const { data } = await client.get(`/links/${link}`);
  return {
    props: {
      link: data,
    },
  };
}
export async function getServerSidePaths() {
  const { data } = await client.get('/links');
  return {
    paths: data.links.map((link) => ({
      params: { link: link.url },
    })),
    fallback: false,
  };
}

const Link = ({ link }) => {
  const [password, setPassword] = useState('');
  const [hasPassword, setHasPassword] = useState(link.password);
  const { message, showAlert } = useContext(appContext);
  const verifyPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await client.post(`/links/${link.link}`, {
        password,
      });
      setHasPassword(data.password);
    } catch (error) {
      showAlert(error.response.data.msg);
    }
  };
  return (
    <Layout>
      {hasPassword ? (
        <>
          {message && <Alert message={message} />}
          <p className='text-center'>Password required to download this link</p>
          <div className='flex justify-center mt-5'>
            <div className='w-full max-w-lg'>
              <form
                className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
                onSubmit={(e) => verifyPassword(e)}
              >
                <div className='mb-4'>
                  <label
                    className='block text-black text-sm font-bold mb-2'
                    htmlFor='password'
                  >
                    Password
                  </label>
                  <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    type='text'
                    id='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>
                <input
                  className='bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold'
                  type='submit'
                  value='Access Link'
                />
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className='text-4xl text-center text-gray-700'>
            Download your file:
          </h1>
          <div className='flex items-center justify-center mt-10'>
            <a
              className='bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer'
              href={`${process.env.backendURL}/files/${link.file}`}
              download
            >
              Here
            </a>
          </div>
        </>
      )}
      <div style={{ height: '20rem' }} />
    </Layout>
  );
};

export default Link;
