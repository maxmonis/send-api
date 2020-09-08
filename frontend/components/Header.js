import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';

const Header = () => {
  const { user, logOut } = useContext(authContext);
  const { resetState } = useContext(appContext);
  const router = useRouter();
  const redirect = () => {
    resetState();
    router.push('/');
  };
  return (
    <header className='py-8 flex flex-col md:flex-row items-center justify-between'>
      <h2
        className='text-4xl font-sans font-bold text-red-700 cursor-pointer'
        onClick={redirect}
      >
        React Send
      </h2>
      {user ? (
        <div>
          <button
            className='bg-black px-5 py-3 rounded text-white font-bold'
            type='button'
            onClick={logOut}
          >
            Log Out {user.name}
          </button>
        </div>
      ) : (
        <div>
          <Link href='login'>
            <a className='bg-red-600 px-5 py-3 rounded text-white font-bold mr-2'>
              Log In To Account
            </a>
          </Link>
          <Link href='create-account'>
            <a className='bg-black px-5 py-3 rounded text-white font-bold'>
              Create Account
            </a>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
