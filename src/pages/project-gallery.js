import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../layout"
import FooterCTA from "../components/shared/FooterCTA"
import SliderComponent from "../components/shared/SliderComponent"
import Seo from "../components/shared/seo"

const ProjectGallery = ({ data }) => {
  const project_categories = data?.allPrismicProjectCategory.nodes

  return (
    <Layout type="secondary">
      <Seo title="Projects Gallery" />
      <section className="hero-section gallery-hero">
        <div className="container">
          <h1 className="hero typo-txt">Our Projects Gallery</h1>
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
            <Link to="/" className="txt-gold">
              Company
            </Link>
          </li>
          <li className="breadcrumb-item link">
            <Link to="/" className="text-black">
              OUR PROJECS GALLERY
            </Link>
          </li>
        </ol>
      </nav>
      <section className="gallery-section">
        <div className="container">
          <p className="text-black fw-bold pb-4">
            This gallery shows the applications of various EXTECH systems
          </p>
          <div className="row">
            {project_categories.map((item, idx) => (
              <div className="col-sm-3 mb-4" key={idx}>
                <figure className="gallery-item">
                  <img
                    className="w-100 mb-3"
                    src={item.data.image.url}
                    alt={item.data.alt}
                  />
                  <Link className="gallery-ltem__link" to={`/${item.uid}`}>
                    {item.data.name}
                  </Link>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FooterCTA />
      <SliderComponent type="project" />
      <SliderComponent type="blog" />
    </Layout>
  )
}

export default ProjectGallery

export const query = graphql`
  query ProjectGalleryQuery {
    allPrismicProjectCategory {
      nodes {
        data {
          name
          image {
            url
            gatsbyImageData
          }
          alt
        }
        uid
      }
    }
  }
`
