import React from "react"
import { Link } from "gatsby"
import Layout from "../layout"
import Seo from "../components/shared/seo"

const ServicePage = ({ pageContext }) => {
  const { service } = pageContext
  const serviceData = service?.data
  return (
    <Layout type="secondary">
      <Seo title={serviceData?.title} />
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${serviceData?.header_image.url})` }}
      >
        <div className="container">
          <h1 className="hero">
            <span className="typo-txt">{serviceData?.name}</span>
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
            <Link to={service?.uid} className="text-black">
              {serviceData?.name}
            </Link>
          </li>
        </ol>
      </nav>
      <div className="container">
        <p className="quote">{serviceData?.intro_text}</p>
        <div
          className="richtext-content"
          dangerouslySetInnerHTML={{ __html: serviceData?.page_content.html }}
        />
      </div>
    </Layout>
  )
}

export default ServicePage
