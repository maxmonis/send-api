import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import Alert from '../components/Alert';
import Layout from '../components/Layout';
import Dropzone from '../components/Dropzone';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';

const Index = () => {
  const { loadUser } = useContext(authContext);
  const { message } = useContext(appContext);
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <Layout>
      <div className='md:w-4/5 xl:w-3/5 mx-auto mb-32'>
        {message && <Alert message={message} />}
        <div className='lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10'>
          <Dropzone />
          <div className='md:flex-1 mb-3 mx-2 mt-16 lg:mt-0'>
            <h2 className='text-4xl font-sans font-bold text-gray-800 my-4'>
              Securely share files
            </h2>
            <p className='text-lg leading-loose'>
              <span className='text-red-500 font-bold'>React Send</span> allows
              you to privately share files which will be deleted following
              download. This ensures that your data won't be floating around
              online in perpetuity.
            </p>
            <Link href='create-account'>
              <a className='text-red-500 font-bold text-lg hover:text-red-700'>
                Create Account To Access Additional Features
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
