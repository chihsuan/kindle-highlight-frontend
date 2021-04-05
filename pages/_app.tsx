import * as React from "react"
import { Provider } from 'use-http'
import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"
import { API_HOST } from "../constants"
import { useTokenState } from "../data/persist"
import theme from "../constants/theme"
import Header from "../component/header"



const MyApp = ({ Component, pageProps }: AppProps) => {
  const [token] = useTokenState();
  const options = {
    headers: {
      Authorization: `TOKEN ${token}`,
    }
  };

  return (
    <Provider url={API_HOST} options={options}>
      <ChakraProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
