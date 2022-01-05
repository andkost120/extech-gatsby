import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../layout"
import Sidebar from "../components/shared/Sidebar"
import FooterCTA from "../components/shared/FooterCTA"
import Signup from "../components/blog-detail/Signup"
import { Share } from "../utils/imgLoader"
import Seo from "../components/shared/seo"

const BlogDetail = ({ pageContext, data }) => {
  const { blogDetail } = pageContext
  const blogData = blogDetail?.data
  const allCategories = data?.allPrismicBlogCategory.nodes
  const currentCategory = allCategories?.filter(
    item => item.prismicId === blogData?.category.id
  )

  return (
    <Layout type="secondary">
      <Seo title={blogData?.meta_title} />
      <section className="top-gap">
        <nav aria-label="breadcrumb" className="container pt-1">
          <ol className="breadcrumb">
            <li className="breadcrumb-item link">
              <Link to="/" className="txt-gold">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item link">
              <Link to="/news-blog" className="text-black">
                OUR BLOG & LATEST NEWS
              </Link>
            </li>
          </ol>
        </nav>
      </section>
      <section className="section-blogs">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-md-8">
              <div className="blog-detail">
                <div className="blog-detail-hero">
                  <img
                    src={blogData?.main_image.url}
                    alt="Blog Post"
                    className="blog-detail-img"
                  />
                  <div className="blog-categories">
                    <span className="typo-txt link txt-gold">
                      {currentCategory[0]?.data.name}
                    </span>
                  </div>
                  <div className="fixed-content">
                    <h1 className="blog-head">
                      <span className="typo-txt">{blogData?.header}</span>
                    </h1>
                  </div>
                </div>
                <div className="blog-detail-info">
                  <img
                    src={blogData?.author_image.url}
                    alt="avatar"
                    className="post-avatar"
                  />
                  <span className="post-author txt-gold link">
                    {blogData?.author_name}
                  </span>
                  <span className="post-date txt-light-gray link">
                    {blogData?.date}
                  </span>
                  <Link to="/" className="ms-3">
                    <img src={Share} alt="share" />
                  </Link>
                </div>
                <div className="blog-detail-content">
                  <div
                    className="richtext-content"
                    dangerouslySetInnerHTML={{ __html: blogData?.content.html }}
                  />
                </div>
                <Signup />
              </div>
            </div>
            <Sidebar type="blog-detail" />
          </div>
        </div>
      </section>
      <FooterCTA />
    </Layout>
  )
}

export default BlogDetail

export const query = graphql`
  query BlogDetailQuery {
    allPrismicBlogCategory {
      nodes {
        prismicId
        data {
          name
        }
      }
    }
  }
`
