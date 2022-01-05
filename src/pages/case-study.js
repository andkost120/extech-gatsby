import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import ImageGallery from "react-image-gallery"
import { GoogleMap, LoadScript } from "@react-google-maps/api"
import Layout from "../layout"
import SliderComponent from "../components/shared/SliderComponent"
import FooterCTA from "../components/shared/FooterCTA"
import Seo from "../components/shared/seo"
import { googleMapsApiKey } from "../../prismic-configuration"

const containerStyle = {
  width: "100%",
  height: "245px",
}

const CaseStudy = ({ pageContext, data }) => {
  const [gallery_images, setGallery] = useState([])
  const [mapCenter, setMap] = useState({ lat: 0, lng: 0 })
  const allSystems = data?.allPrismicProduct.nodes
  const { casestudy } = pageContext
  const currentCase = casestudy?.data
  const currentSystem = allSystems?.filter(
    item => item.prismicId === currentCase?.system.id
  )

  useEffect(() => {
    setGallery(
      currentCase?.gallery.map(item => ({
        original: item.image.url,
        thumbnail: item.image.url,
        originalAlt: item.alt,
        thumbnailAlt: item.alt,
        description: item.caption,
        originalTitle: item.caption,
        thumbnailTitle: item.caption,
      }))
    )
    setMap({
      lat: currentCase?.map.latitude,
      lng: currentCase?.map.longitude,
    })
  }, [])

  return (
    <Layout type="secondary">
      <Seo title={currentCase?.title} />
      <section className="case-detail">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item link">
                <Link to="/" className="txt-gold">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item link">
                <Link to="/case-studies" className="txt-gold">
                  Case Studies
                </Link>
              </li>
              <li className="breadcrumb-item link">
                <Link to={`/${casestudy?.uid}`} className="text-black">
                  {currentCase?.name}
                </Link>
              </li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-md-7">
              <h1 className="hero text-black">{currentCase?.name}</h1>
              <img
                src={currentCase?.header_image.url}
                alt="case"
                className="case-image"
              />
              <p className="txt-gray fw-bold case-system">
                System:{" "}
                <span className="txt-gold link">
                  {currentSystem[0]?.data.header}
                </span>
              </p>
              <p className="txt-gray mb-4 pre-wrap">
                {currentCase?.header_text}
              </p>
              {/* {details.map((item, idx) => (
                <p className="txt-gray fw-bold detail" key={idx}>
                  {item.head}
                  <span className="txt-gray fw-normal">{item.content}</span>
                </p>
              ))} */}
              <div className="btn-group">
                <button className="btn-primary">I Want the Same Project</button>
                <button className="btn-second">Get a Quote</button>
              </div>
            </div>
            <div className="col-md-5">
              <img
                src={currentCase?.header_image.url}
                alt="case"
                className="case-image"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="section-gallery">
        <div className="container">
          <h6 className="text-white">{currentCase?.name}</h6>
          <h1 className="text-white text-uppercase">Project gallery</h1>
          <ImageGallery
            items={gallery_images}
            showFullscreenButton={false}
            showPlayButton={false}
            autoPlay={true}
          />
        </div>
      </section>
      <section className="case-map">
        <div className="container">
          <h6 className="txt-gray">5TH & ATWOOD STREET STATION</h6>
          <h1 className="text-black text-uppercase">About Project</h1>
          <p className="pre-wrap text-black pre-wrap">
            {currentCase?.about_text}
          </p>
          <div className="google-map">
            <LoadScript googleMapsApiKey={googleMapsApiKey}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={mapCenter}
                zoom={10}
              >
                {/* Child components, such as markers, info windows, etc. */}
                <></>
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </section>
      <SliderComponent type="project" />
      <SliderComponent type="blog" />
      <FooterCTA />
    </Layout>
  )
}

export default CaseStudy

export const query = graphql`
  query CaseStudyQuery {
    allPrismicProduct {
      nodes {
        prismicId
        data {
          header
        }
      }
    }
  }
`
