require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const prismicConfig = require("./prismic-configuration")

module.exports = {
  siteMetadata: {
    title: `EXTECH, Inc.`,
    description: `Award-winning manufacturer of daylighting solutions including skylights, canopies, windows, translucent walls, and custom façades.`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
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
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: "gatsby-source-prismic",
      options: {
        repositoryName: "extech-website",
        schemas: {
          product: require("./custom_types/product.json"),
          product_cta: require("./custom_types/product_cta.json"),
          product_tech_info: require("./custom_types/product_tech_info.json"),
          case_study: require("./custom_types/case_study.json"),
          blog_post: require("./custom_types/blog_post.json"),
          blog_category: require("./custom_types/blog_category.json"),
          industries: require("./custom_types/industries.json"),
          services: require("./custom_types/services.json"),
          our_team: require("./custom_types/our_team.json"),
          technical: require("./custom_types/technical.json"),
          history_mission: require("./custom_types/history_mission.json"),
          product_type: require("./custom_types/product_type.json"),
          footer_cta: require("./custom_types/footer_cta.json"),
          download_cta: require("./custom_types/download_cta.json"),
          homepage: require("./custom_types/homepage.json"),
          project_category: require("./custom_types/project_category.json"),
          project: require("./custom_types/project.json"),
        },
        linkResolver: require("./src/utils/linkResolver").linkResolver,
        lang: "*",
      },
    },
    {
      resolve: "gatsby-plugin-prismic-previews",
      options: {
        repositoryName: prismicConfig.prismicRepo,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Source Sans Pro\:300,400,500,700`,
          `Oswald\:400,500,700`,
          `Montserrat\"300,400,500,700`,
          `Rubik\:500`,
        ],
        display: "swap",
      },
    },
  ],
}
