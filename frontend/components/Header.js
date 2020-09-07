import React, { useContext } from 'react';
import Link from 'next/link';
import authContext from '../context/auth/authContext';

const Header = () => {
  const { user, logOut } = useContext(authContext);
  return (
    <header className='py-8 flex flex-col md:flex-row items-center justify-between'>
      <Link href='/'>
        <a className='bg-red-600 px-5 py-3 rounded text-white font-bold mr-2'>
          React Send
        </a>
      </Link>
      {user ? (
        <div>
          <button
            className='bg-black px-5 py-3 rounded text-white font-bold'
            type='button'
            onClick={logOut}
          >
            Log Out as {user.name}
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
