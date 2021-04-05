import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  components: {
    Link: {
      sizes: {
        xs: {
          fontSize: "xs",
        },
        sm: {
          fontSize: "sm",
        },
      },
    },
  },
})

export default theme
