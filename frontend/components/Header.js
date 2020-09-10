import React, { useContext } from 'react';
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
  const login = () => {
    router.push('/login');
  };
  const create = () => {
    router.push('/create-account');
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
          <button
            className='bg-red-600 px-5 py-3 rounded text-white font-bold mr-2 cursor-pointer'
            onClick={login}
          >
            Log In To Account
          </button>
          <button
            className='bg-black px-5 py-3 rounded text-white font-bold cursor-pointer'
            onClick={create}
          >
            Create Account
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
