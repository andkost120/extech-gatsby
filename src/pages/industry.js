import React from "react"
import { Link } from "gatsby"
import Layout from "../layout"
import Seo from "../components/shared/seo"

const Industry = ({ pageContext }) => {
  const { industry } = pageContext
  const industryData = industry?.data
  return (
    <Layout type="secondary">
      <Seo title={industryData?.title} />
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${industryData?.header_image.url})` }}
      >
        <div className="container">
          <h1 className="hero">
            <span className="typo-txt">{industryData?.name}</span>
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
            <Link to={industry?.uid} className="text-black">
              {industryData?.name}
            </Link>
          </li>
        </ol>
      </nav>
      <div className="container">
        <p className="quote">{industryData?.intro_text}</p>
        <div
          className="richtext-content"
          dangerouslySetInnerHTML={{ __html: industryData?.page_content.html }}
        />
      </div>
    </Layout>
  )
}

export default Industry
