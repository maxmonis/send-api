import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import authContext from '../context/auth/authContext';

const Index = () => {
  const { loadUser } = useContext(authContext);
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <Layout>
      <h1>Index</h1>
    </Layout>
  );
};

export default Index;
