import * as React from "react"
import Head from 'next/head'
import { Provider } from 'use-http'
import type { AppProps } from 'next/app'
import { ChakraProvider, Flex, Link, Text } from "@chakra-ui/react"
import { API_HOST, WEBSITE_TITLE } from "../constants"
import { useTokenState } from "../data/persist"
import theme from "../constants/theme"
import Header from "../component/Header"



const MyApp = ({ Component, pageProps }: AppProps) => {
  const [token] = useTokenState();
  const options = {
    headers: {
      Authorization: `TOKEN ${token}`,
    }
  };

  return (
    <Provider url={API_HOST} options={options}>
      <Head>
        <title>{ WEBSITE_TITLE }</title>
      </Head>
      <ChakraProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
        <Flex height="100" padding="24px" alignItems="center">
          <Text fontSize="sm" color="gray.600">©2021 {WEBSITE_TITLE}</Text>
          <Text fontSize="sm" color="gray.600" marginLeft={1}>| Made By <Link href="https://github.com/chihsuan/kindle-highlight-frontend">@chihsuan</Link></Text>
        </Flex>
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
