import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import authContext from '../context/auth/authContext';

const Index = () => {
  const { loadUser } = useContext(authContext);
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <Layout>
      <div className='md:w-4/5 xl:w-3/5 mx-auto mb-32'>
        <div className='lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10'>
          <div className='md:flex-1 mb-3 mx-2 mt-16 lg:mt-0'>
            <p>Dropzone</p>
          </div>
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
                Create Account To Access All Features
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
