module.exports = {
  siteMetadata: {
    title: `Juliuz Llanillo Portfolio`,
    description: `Web Dev Portfolio of Juliuz Christian Llanillo`,
    author: `@JuliuzLlanillo`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      }
    },
    {
      resolve: "gatsby-plugin-antd",
      options: {
        style: true
      },
    },
    {
      resolve: `gatsby-plugin-less`,
      options: {
          lessOptions: {
              javascriptEnabled: true,
            }
        }
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Sen`,
          `Bree Serif`,
          `Reem Kufi`,
          `Roboto Mono`,
          `Noto Serif`,
          `Unica One`,
          `Josefin Sans`
        ],
        display: 'swap'
      },
    },
  ],
}
