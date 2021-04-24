

import { Flex, Heading, Link, Text } from "@chakra-ui/layout"
import * as React from "react"
import Router from "next/router";
import { useTokenState } from "../data/persist";
import { WEBSITE_TITLE } from "../constants";

const Header = () => {
  const [token, setToken] = useTokenState();

  const onLogout = () => {
    setToken(undefined);
    Router.replace("/");
  }

  return (
    <Flex
      height="75px"
      width="100%"
      borderBottom="1px solid"
      borderColor="gray.300"
      alignItems="center"
      padding="0 45px"
    >
      <Flex flex={1}>
        <Link href="/">
          <Heading fontWeight="600" fontSize="lg">{ WEBSITE_TITLE }</Heading>
        </Link>
      </Flex>
      { token &&
        <Link onClick={onLogout}>
          <Text fontSize="sm">Logout</Text>
        </Link>
      }
    </Flex>
  )
}

export default Header

