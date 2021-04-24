import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    purple: {
      500: "#6C63FF",
    },
  },
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
    Text: {
      variants: {
        highlight: {
          position: "relative",
          padding: "15px 20px",
          paddingLeft: "30px",
          margin: "0 0 20px",
          borderLeft: "6px solid",
          borderColor: "gray.300",
          boxShadow: "2px 2px 15px #ccc",
          lineHeight: 1.2,
          textAlign: "justify",
          _before: {
            content: '"\\201C"',
            fontFamily: "Georgia, serif",
            fontSize: "30px",
            fontWeight: "bold",
            color: "gray.300",
            position: "absolute",
            left: "10px",
            top: "10px",
          },
        }
      }
    },
  },
})

export default theme
