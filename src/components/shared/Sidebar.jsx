import React from "react"
import Signup from "../news-blog/Signup"
import Widget from "../news-blog/Widget"
import PopularArticle from "../news-blog/PopularArticle"
import { useStaticQuery, graphql } from "gatsby"

const Sidebar = ({ type }) => {
  const data = useStaticQuery(graphql`
    query BlogSideBarQuery {
      allPrismicBlogPost(sort: { fields: data___date, order: DESC }) {
        nodes {
          data {
            header
            thumbnail {
              gatsbyImageData
              url
            }
            category {
              id
            }
            date
          }
          uid
        }
      }
      allPrismicBlogCategory {
        nodes {
          data {
            name
          }
          prismicId
          uid
        }
      }
    }
  `)
  const recentBlogs = data?.allPrismicBlogPost.nodes.slice(0, 4)
  const categories = data?.allPrismicBlogCategory.nodes.slice(0, 7)

  return (
    <aside className="col-lg-3 col-md-4">
      {!type && <Signup />}
      <Widget data={categories} type="Categories" />
      <PopularArticle data={recentBlogs} />
      {/* <Widget data={archives} type="Archives" /> */}
    </aside>
  )
}

export default Sidebar
