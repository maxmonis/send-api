import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Alert from '../components/Alert';
import authContext from '../context/auth/authContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const { logUserIn, message, authenticated } = useContext(authContext);
  const router = useRouter();
  useEffect(() => {
    authenticated && router.push('/');
  }, [authenticated]);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email is required')
        .email('Please enter a valid email'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      logUserIn(values);
    },
  });
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    errors,
  } = formik;
  const { email, password } = values;
  return (
    <Layout>
      <div className='md:w-4/5 xl:w-3/5 mx-auto mb-32'>
        <h2 className='text-4xl font-sans font-bold text-gray-800 text-center my-4'>
          Log In To Account
        </h2>
        {message && <Alert message={message} />}
        <div className='flex justify-center mt-5'>
          <div className='w-full max-w-lg'>
            <form
              className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
              onSubmit={handleSubmit}
            >
              <div className='mb-4'>
                <label
                  className='block text-black text-sm font-bold mb-2'
                  htmlFor='email'
                >
                  Email
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type='email'
                  id='email'
                  placeholder='Email'
                  value={email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></input>
                {touched.email && errors.email && (
                  <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                    <p>{errors.email}</p>
                  </div>
                )}
              </div>
              <div className='mb-4'>
                <label
                  className='block text-black text-sm font-bold mb-2'
                  htmlFor='password'
                >
                  Password
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type='password'
                  id='password'
                  placeholder='Password'
                  value={password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></input>
                {touched.password && errors.password && (
                  <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                    <p>{errors.password}</p>
                  </div>
                )}
              </div>
              <input
                className='bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold'
                type='submit'
                value='Access Account'
              />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
