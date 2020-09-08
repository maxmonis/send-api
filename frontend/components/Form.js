import React, { useState, useContext } from 'react';
import appContext from '../context/app/appContext';

const Form = () => {
  const [password, setPassword] = useState(false);
  const toggle = () => setPassword(!password);
  const { addPassword, setDownloads } = useContext(appContext);
  return (
    <div className='w-full mt-20'>
      <div>
        <label className='text-lg text-gray-800'>Delete after:</label>
        <select
          className='appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500'
          onChange={(e) => setDownloads(parseInt(e.target.value))}
        >
          <option value='1' selected>
            1 download
          </option>
          <option value='5'>5 downloads</option>
          <option value='10'>10 downloads</option>
          <option value='20'>20 downloads</option>
        </select>
      </div>
      <div className='mt-4'>
        <div className='flex justify-between items-center'>
          <label className='text-lg text-gray-800 mr-2'>
            Protect with Password
          </label>
          <input type='checkbox' onChange={toggle} />
        </div>
        {password && (
          <input
            className='appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500'
            type='password'
            placeholder='Enter a password'
            onChange={(e) => addPassword(e.target.value)}
          />
        )}
      </div>
    </div>
  );
};

export default Form;
