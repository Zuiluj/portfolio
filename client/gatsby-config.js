module.exports = {
  siteMetadata: {
    title: `Juliuz Llanillo Portfolio`,
    description: `Web Dev Portfolio of Juliuz Christian Llanillo`,
    author: `@JuliuzLlanillo`,
    url: "https://juliuzllanillo.com"
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `img`,
        path: `${__dirname}/src/img`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `juliuz-portolio`,
        short_name: `julz-web`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/img/icon.png`, // This path is relative to the root of the site.
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
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/admin/*`] },
    },
  ],
}
