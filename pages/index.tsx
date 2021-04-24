import GoogleLogin from 'react-google-login';
import Router from "next/router";
import { useEffect } from 'react';
import useFetch from 'use-http';

import { GOOGLE_CLINET_ID, CONTACT_FROM_URI  } from '../constants';
import { useTokenState } from '../data/persist';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Image, Input, Textarea } from "@chakra-ui/react";
import { Field, Form, Formik } from 'formik';

const Home = () => {
  const [token, setToken] = useTokenState();
  const { post, response } = useFetch();

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

  const validateEmail = (value) => {
    let error
    if (!value) {
      error = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }
    return error
  }

  const onSubmitContact = async (values, actions) => {
    const data = new FormData();
    data.append('email', values.email);
    data.append('message', values.message);
    try {
      await fetch(CONTACT_FROM_URI, {
        mode: 'cors',
        body: data,
        method: 'POST',
      });
      actions.resetForm();
    } catch (err) { console.error(err); }
    actions.setSubmitting(false)
  };

  if (token) {
    return <div />;
  }

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column" alignItems="center" paddingTop={100} minHeight="85vh" marginBottom={10}>
          <Box marginBottom={5}>
            <Image maxWidth="500px" width="100%" minWidth={300} src="/undraw_book_lover_mkck.svg" alt="" />
          </Box>
          <Heading fontWeight="700" fontFamily="'Source Serif Pro'" textAlign="center" as="h2" size="xl">
            Get Your Kindle Highlights
          </Heading>
          <Box maxWidth={800} marginTop={1}>
            <Text textAlign="center" color="gray.700" fontSize="xs">
              No need to manually copy-and-paste reading highlights anymore
            </Text>
          </Box>
          <Box marginTop={5}>
            <GoogleLogin
              clientId={GOOGLE_CLINET_ID}
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              scope="openid"
              render={(renderProps) => (
                <Button colorScheme="purple" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                  Login with Google
                </Button>
              )}
            >
            </GoogleLogin>
          </Box>
      </Flex>

      <Flex flexDirection="column" alignItems="center">
        <Heading as="h3" size="lg" fontFamily="'Source Serif Pro'">How it Works</Heading>
        <Flex flexDirection="column" alignItems="center" marginTop={10} height={400}>
          <Image marginBottom={5} maxWidth={300} minWidth={300} src="/undraw_Notes_re_pxhw.svg" alt="" />
          <Text textAlign="center" color="gray.700">
            1. Highlight your favorite sentences on your Kindle
          </Text>
        </Flex>

        <Flex flexDirection="column" alignItems="center" height={400}>
          <Image marginBottom={5} maxWidth={300} minWidth={300} src="/undraw_emails_6uqr.svg" alt="" />
          <Text textAlign="center" color="gray.700">
            2. Export your highlights and email to &quot;kindle.highlight.parser@gmail.com&quot;
          </Text>
        </Flex>
  
        <Flex flexDirection="column" alignItems="center" marginTop={10} height={400}>
          <Image marginBottom={5} maxWidth={300} minWidth={300} src="/undraw_Online_information_re_erks.svg" alt="" />
          <Text textAlign="center" color="gray.700">
            3. Sign in the website and get your highlights!
          </Text>
        </Flex>
      </Flex>
    
      <Flex flexDirection="column" alignItems="center" marginBottom={20}>
        <Heading as="h3" size="lg" fontFamily="'Source Serif Pro'">Contact Us</Heading>
        <Text>Want any features? Tell us!</Text>
        <Flex marginTop={10} justifyContent="center">
        <Formik
          initialValues={{ email: '', message: '' }}
          onSubmit={onSubmitContact}
        >
          {({ isSubmitting })  => (
          <Form>
            <Field name="email" validate={validateEmail}>
              {({ field, form }) => (
                <FormControl id="email" isInvalid={form.errors.email && form.touched.email}>
                  <FormLabel>Email address</FormLabel>
                  <Input {...field} type="email" />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  <FormHelperText>We&#39;ll never share your email.</FormHelperText>
                </FormControl>
              )}
            </Field>
            <Field name="message">
              {({ field, form }) => (
              <FormControl id="message">
                <FormLabel marginTop={5}>Message</FormLabel>
                <Textarea
                  {...field}
                  isInvalid={form.errors.message && form.touched.message}
                  placeholder=""
                  size="lg"
                />
              </FormControl>
              )}
            </Field>
            <Button
                mt={4}
                colorScheme="purple"
                isLoading={isSubmitting}
                type="submit"
              >
              Submit
            </Button>
            </Form>
          )}
          </Formik>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Home
