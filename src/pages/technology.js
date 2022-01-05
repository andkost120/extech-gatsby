import React from "react"
import { Link } from "gatsby"
import Layout from "../layout"
import Seo from "../components/shared/seo"

const Technology = ({ pageContext }) => {
  const { technical } = pageContext
  const technicalData = technical?.data
  return (
    <Layout type="secondary">
      <Seo title={technicalData?.title} />
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${technicalData?.banner_image.url})` }}
      >
        <div className="container">
          <h1 className="hero">
            <span className="typo-txt">{technicalData?.name}</span>
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
            <Link to={technical?.uid} className="text-black">
              {technicalData?.name}
            </Link>
          </li>
        </ol>
      </nav>
      <div className="container">
        <p className="quote">{technicalData?.intro_text}</p>
        <div
          className="richtext-content"
          dangerouslySetInnerHTML={{ __html: technicalData?.page_content.html }}
        />
      </div>
    </Layout>
  )
}

export default Technology
