// support for .env, .env.development, and .env.production
require("dotenv").config()
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: "https://gatsbywordpresshomepage.gatsbyjs.io/",
    title: "Gatsby WordPress Homepage Starter",
    author: `Gatsby`,
    description: "A Gatsby Starter for building homepages with WordPress",
  },
  plugins: [
    {
      resolve: "gatsby-source-wordpress",
      options: {
        type: {
          // url: process.env.WPGRAPHQL_URL,
          url: "http://wordpress.meltonpriorinstitut.org/graphql",
          MediaItem: {
            localFile: {
              requestConcurrency: 50
            }
          }
        }
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-image",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-vanilla-extract",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Gatsby Starter WordPress Homepage",
        short_name: "Gatsby",
        start_url: "/",
        // These can be imported once ESM support lands
        background_color: "#ffffff",
        theme_color: "#004ca3",
        icon: "src/favicon.png",
      },
    },
  ],
}
