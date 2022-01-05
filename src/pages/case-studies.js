import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../layout"
import SliderComponent from "../components/shared/SliderComponent"
import FooterCTA from "../components/shared/FooterCTA"
import Portfolio from "../components/shared/Portfolio"
// import USAMap from "react-usa-map"
import Select from "react-select"
import { systems, industries } from "../utils/staticData"
import Seo from "../components/shared/seo"

const Case = ({ casestudy, allSystems }) => {
  const currentSystem = allSystems?.filter(
    item => item?.prismicId === casestudy?.id
  )

  return (
    <div className="row case">
      <div className="col-lg-4 col-md-5 case-image">
        <img src={casestudy?.data.header_image.url} alt="case" />
      </div>
      <div className="col-lg-8 col-md-7 case-about">
        <h2 className="txt-gray">{casestudy?.data.name}</h2>
        <p className="txt-gray fw-bold">
          System: <span className="txt-gold link">{currentSystem?.header}</span>
        </p>
        <p className="txt-gray mt-3 mb-4 case-text">
          {casestudy?.data.header_text}
        </p>
        <Link to={`/${casestudy?.uid}`} className="btn-second text-center">
          Read More
        </Link>
      </div>
    </div>
  )
}

const CaseStudies = ({ data }) => {
  // const mapHandler = e => {
  //   console.log(e.target.dataset.name)
  // }
  // const statesCustomConfig = {
  //   AK: {
  //     fill: "none",
  //   },
  // }
  const [system, setSystem] = useState(systems[0])
  const [industry, setIndustry] = useState(industries[0])
  const handleSystem = value => {
    setSystem(value)
  }
  const handleIndustry = value => {
    setIndustry(value)
  }

  const allCases = data?.allPrismicCaseStudy?.nodes
  const allSystems = data?.allPrismicProduct.nodes
  return (
    <Layout type="secondary">
      <Seo title="Markets & Case Studies" />
      <section className="hero-section casestudy-hero">
        <div className="container">
          <h1 className="hero">
            <span className="typo-txt">Our Case Studies</span>
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
            <Link to="/case-studies" className="text-black">
              Case Studies
            </Link>
          </li>
        </ol>
      </nav>
      {/* <section className="section-map">
        <div className="container">
          <h1 className="text-black text-uppercase">Markets & Case Studies</h1>
          <p className="mt-3 txt-gray">
            In over 40 years of experience, EXTECH has developed a large
            geographical footprint and worked on projects throughout the United
            States and internationally. Our systems have been used in every
            climate - the dry desert of Arizona, the icy coasts of Washington,
            the hurricane-blown shores of Louisiana, the harsh winters of New
            England, and more. We have compiled case studies for some recent
            projects that are displayed on the below map. Click on a map marker
            or project in the sidebar to read an in-depth discussion of one of
            EXTECH's latest architectural solutions.
          </p>
          <div className="text-center mt-4">
            <USAMap
              onClick={mapHandler}
              defaultFill="#CBA052"
              customize={statesCustomConfig}
              width="100%"
              height="100%"
            />
          </div>
        </div>
      </section> */}
      <section className="section-all-case">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-md-6">
              <span className="kicker-text txt-gold">
                WATCH OUR CASE STUDIES
              </span>
              <h1 className="slider-heading">Markets & Case Studies</h1>
            </div>
            <div className="col-md-6 options">
              <Select
                options={systems}
                value={system}
                onChange={v => handleSystem(v)}
              />
              <Select
                options={industries}
                value={industry}
                onChange={v => handleIndustry(v)}
              />
            </div>
          </div>
          {allCases?.map((item, idx) => (
            <Case key={idx} casestudy={item} allSystems={allSystems} />
          ))}
          <div className="text-center mt-4">
            <button className="btn-primary">Load more</button>
          </div>
        </div>
      </section>
      <Portfolio type="services" />
      <SliderComponent type="blog" />
      <FooterCTA />
    </Layout>
  )
}

export default CaseStudies

export const query = graphql`
  query CaseStudiesQuery {
    allPrismicCaseStudy {
      nodes {
        data {
          header_image {
            url
            gatsbyImageData
          }
          system {
            id
          }
          name
          header_text
        }
        uid
      }
    }
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
