import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../layout"
import FooterCTA from "../components/shared/FooterCTA"
import Sidebar from "../components/shared/Sidebar"
import Seo from "../components/shared/seo"

const Category = ({ data }) => {
  const categories = data?.allPrismicBlogCategory.nodes
  return (
    <Layout type="secondary">
      <Seo title="Blog Category " />
      <section className="hero-section">
        <div className="container">
          <h1 className="hero">
            <span className="typo-txt">Blog Categories</span>
          </h1>
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
              {categories?.map((item, idx) => (
                <article key={idx}>
                  <div className="blog-item">
                    <header>
                      <Link to={`/category/${item.uid}`}>
                        <h5 className="text-black">{item?.data.name}</h5>
                      </Link>
                    </header>
                    <p className="post-content">{item?.data.content}</p>
                  </div>
                </article>
              ))}
            </div>
            <Sidebar />
          </div>
        </div>
      </section>
      <FooterCTA />
    </Layout>
  )
}

export default Category

export const query = graphql`
  query CategoryQuery {
    allPrismicBlogCategory {
      nodes {
        data {
          content
          name
        }
        uid
      }
    }
  }
`
