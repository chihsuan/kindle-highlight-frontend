import GoogleLogin from 'react-google-login';
import Router from "next/router";
import { useEffect } from 'react';
import useFetch from 'use-http';

import { GOOGLE_CLINET_ID } from '../constants';
import { useTokenState } from '../data/persist';
import { Flex } from '@chakra-ui/layout';

const Home = () => {
  const [token, setToken] = useTokenState();
  const { post, response } = useFetch()

  // if logged in, redirect to the readhistory
  useEffect(() => {
    if (token) {
      Router.replace("/readhistory");
    }
  }, [token]);

  const onSuccess = async (authData) => {
    const data = await post('/login', { idToken: authData.tokenId });
    if (response.ok) setToken(data.token);
  }

  const onFailure = (response) => {
    console.error(response);
  }

  return (
    <Flex padding="150px" alignItems="center" justifyContent="center">
      { !token &&
        <GoogleLogin
          clientId={GOOGLE_CLINET_ID}
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          scope="openid"
        />
      }
    </Flex>
  );
}

export default Home
