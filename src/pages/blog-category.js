import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../layout"
import ReactPaginate from "react-paginate"
import FooterCTA from "../components/shared/FooterCTA"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import Sidebar from "../components/shared/Sidebar"
import Seo from "../components/shared/seo"
import BlogItem from "../components/news-blog/BlogItem"

const BlogCategory = ({ data, pageContext }) => {
  const { blogCategory } = pageContext
  const allCategories = data?.allPrismicBlogCategory.nodes
  const currentCatetgory = blogCategory?.data
  const blogData = data?.allPrismicBlogPost.nodes.filter(
    item => item.data.category.id === blogCategory?.prismicId
  )

  const [currentPage, setCurrentPage] = useState(0)

  const PER_PAGE = 3
  const offset = currentPage * PER_PAGE
  const currentPageData = blogData?.slice(offset, offset + PER_PAGE)
  const pageCount = Math.ceil(blogData.length / PER_PAGE)

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage)
  }

  return (
    <Layout type="secondary">
      <Seo title={currentCatetgory?.title} />
      <section className="category-hero">
        <div className="container">
          <h1 className="text-center txt-gold">{currentCatetgory?.name}</h1>
          <p className="txt-brown">{currentCatetgory?.content}</p>
        </div>
      </section>
      <nav aria-label="breadcrumb" className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item link">
            <Link to="/" className="txt-gold">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item link">
            <Link to="/category" className="text-black">
              Blog Category
            </Link>
          </li>
        </ol>
      </nav>
      <section className="section-blogs">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-md-8">
              {currentPageData?.map((item, idx) => (
                <BlogItem blog={item} key={idx} categoryData={allCategories} />
              ))}
              <ReactPaginate
                previousLabel={
                  <FontAwesomeIcon icon={faAngleLeft} className="fa-lg" />
                }
                nextLabel={
                  <FontAwesomeIcon icon={faAngleRight} className="fa-lg" />
                }
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination-link"}
                nextLinkClassName={"pagination-link"}
                disabledClassName={"pagination-link__disabled"}
                activeClassName={"pagination-link__active"}
              />
            </div>
            <Sidebar />
          </div>
        </div>
      </section>
      <FooterCTA />
    </Layout>
  )
}

export default BlogCategory

export const query = graphql`
  query BlogCategoryQuery {
    allPrismicBlogPost {
      nodes {
        data {
          header
          header_text
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
        prismicId
        data {
          name
        }
      }
    }
  }
`
