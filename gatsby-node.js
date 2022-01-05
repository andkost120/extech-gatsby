const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const queryResults = await graphql(`
    query AllDetailPage {
      allPrismicProductType {
        nodes {
          uid
          prismicId
          data {
            name
            image {
              url
              gatsbyImageData
            }
          }
        }
      }
      allPrismicProduct {
        nodes {
          uid
          data {
            title
            name
            header
            sub_header
            prod_img {
              url
              gatsbyImageData
            }
            description
            icons {
              icon {
                url
                gatsbyImageData
              }
              name
            }
            spotlight_text {
              html
            }
            spotlight_img {
              url
              gatsbyImageData
            }
            vimeo_code
            sketchfab_code
            type {
              id
            }
            cta {
              id
            }
            faqs {
              answer
              question
            }
            gallery {
              alt
              caption
              image {
                url
                gatsbyImageData
              }
            }
            tech_info {
              id
            }
          }
        }
      }
      allPrismicCaseStudy {
        nodes {
          data {
            header_image {
              url
              gatsbyImageData
            }
            header_text
            name
            title
            system {
              id
            }
            about_text
            gallery {
              alt
              caption
              image {
                url
                gatsbyImageData
              }
            }
            map {
              latitude
              longitude
            }
          }
          uid
        }
      }
      allPrismicBlogPost {
        nodes {
          data {
            meta_title
            header
            header_text
            content {
              html
            }
            category {
              id
            }
            thumbnail {
              url
              gatsbyImageData
            }
            main_image {
              url
              gatsbyImageData
            }
            date
            author_name
            author_image {
              gatsbyImageData
              url
            }
          }
          uid
        }
      }
      allPrismicBlogCategory {
        nodes {
          data {
            content
            name
            title
          }
          prismicId
          uid
        }
      }
      allPrismicIndustries {
        nodes {
          data {
            title
            header_image {
              url
              gatsbyImageData
            }
            name
            intro_text
            page_content {
              html
            }
          }
          uid
        }
      }
      allPrismicServices {
        nodes {
          data {
            title
            header_image {
              url
              gatsbyImageData
            }
            name
            intro_text
            page_content {
              html
            }
          }
          uid
        }
      }
      allPrismicTechnical {
        nodes {
          uid
          data {
            title
            name
            banner_image {
              url
              gatsbyImageData
            }
            intro_text
            page_content {
              html
            }
          }
        }
      }
      allPrismicProjectCategory {
        nodes {
          data {
            title
            header
            name
            summary {
              html
            }
          }
          prismicId
          uid
        }
      }
      allPrismicProject {
        nodes {
          data {
            title
            summary
            city
            state
            category {
              id
            }
            gallery {
              image {
                url
                gatsbyImageData
              }
              alt
            }
            button_url
            content {
              html
            }
            location
            google_map {
              latitude
              longitude
            }
            sub_title
            video_url
          }
          uid
        }
      }
    }
  `)

  const productCategory = path.resolve(`src/pages/product-category.js`)
  const productTemplate = path.resolve(`src/pages/product-page.js`)
  const casestudyTemplate = path.resolve(`src/pages/case-study.js`)
  const blogDetailTemplate = path.resolve(`src/pages/blog-detail.js`)
  const categoryTemplate = path.resolve(`src/pages/blog-category.js`)
  const industryTemplate = path.resolve(`src/pages/industry.js`)
  const serviceTemplate = path.resolve(`src/pages/service.js`)
  const technicalTemplate = path.resolve(`src/pages/technology.js`)
  const projectCategory = path.resolve(`src/pages/project-category.js`)
  const projectTemplate = path.resolve(`src/pages/project.js`)

  queryResults.data.allPrismicProduct.nodes.forEach(node => {
    createPage({
      path: `/${node.uid}`,
      component: productTemplate,
      context: {
        product: node,
      },
    })
  })
  queryResults.data.allPrismicCaseStudy.nodes.forEach(node => {
    createPage({
      path: `/${node.uid}`,
      component: casestudyTemplate,
      context: {
        casestudy: node,
      },
    })
  })
  queryResults.data.allPrismicBlogPost.nodes.forEach(node => {
    createPage({
      path: `/${node.uid}`,
      component: blogDetailTemplate,
      context: {
        blogDetail: node,
      },
    })
  })
  queryResults.data.allPrismicBlogCategory.nodes.forEach(node => {
    createPage({
      path: `/category/${node.uid}`,
      component: categoryTemplate,
      context: {
        blogCategory: node,
      },
    })
  })
  queryResults.data.allPrismicIndustries.nodes.forEach(node => {
    createPage({
      path: `/industry/${node.uid}`,
      component: industryTemplate,
      context: {
        industry: node,
      },
    })
  })
  queryResults.data.allPrismicServices.nodes.forEach(node => {
    createPage({
      path: `/${node.uid}`,
      component: serviceTemplate,
      context: {
        service: node,
      },
    })
  })
  queryResults.data.allPrismicTechnical.nodes.forEach(node => {
    createPage({
      path: `/technology/${node.uid}`,
      component: technicalTemplate,
      context: {
        technical: node,
      },
    })
  })
  queryResults.data.allPrismicProjectCategory.nodes.forEach(node => {
    createPage({
      path: `/${node.uid}`,
      component: projectCategory,
      context: {
        project_category: node,
      },
    })
  })
  queryResults.data.allPrismicProject.nodes.forEach(node => {
    const pro_category =
      queryResults.data.allPrismicProjectCategory.nodes.filter(
        item => item.prismicId === node.data.category.id
      )
    createPage({
      path: `/${pro_category[0].uid}/${node.uid}`,
      component: projectTemplate,
      context: {
        project: node,
      },
    })
  })
  queryResults.data.allPrismicProductType.nodes.forEach(node => {
    createPage({
      path: `/${node.uid}`,
      component: productCategory,
      context: {
        product_category: node,
      },
    })
  })
}
