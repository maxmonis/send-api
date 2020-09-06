import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='py-8 flex flex-col md:flex-row items-center justify-between'>
      <Link href='/'>
        <a className='bg-red-600 px-5 py-3 rounded text-white font-bold mr-2'>
          React Send
        </a>
      </Link>
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
    </header>
  );
};

export default Header;
