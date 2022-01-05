import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../layout"
import FooterCTA from "../components/shared/FooterCTA"
import SliderComponent from "../components/shared/SliderComponent"
import Seo from "../components/shared/seo"
import { GoogleMap, LoadScript } from "@react-google-maps/api"
import { googleMapsApiKey } from "../../prismic-configuration"

const containerStyle = {
  width: "100%",
  height: "245px",
}

const ProjectPage = ({ data, pageContext }) => {
  const { project } = pageContext
  const [mapCenter, setMap] = useState({ lat: 0, lng: 0 })
  const projectData = project?.data
  const project_category = data?.allPrismicProjectCategory.nodes.filter(
    item => item.prismicId === project?.data.category.id
  )
  useEffect(() => {
    setMap({
      lat: projectData?.google_map.latitude,
      lng: projectData?.google_map.longitude,
    })
  }, [])
  return (
    <Layout type="secondary">
      <Seo
        title={project_category[0]?.data.name + " | " + projectData?.title}
      />
      <section className="project-detail">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item link">
                <Link to="/" className="txt-gold">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item link">
                <Link to={`/${project_category[0]?.uid}`} className="txt-gold">
                  Case Studies
                </Link>
              </li>
              <li className="breadcrumb-item link">
                <Link to={`/${project?.uid}`} className="text-black">
                  {projectData?.title}
                </Link>
              </li>
            </ol>
          </nav>
          <h1 className="txt-blue mt-3">
            {project_category[0]?.data.name +
              " | " +
              projectData?.title +
              ", " +
              projectData?.location}
          </h1>
          <h2 className="project-item__subtitle">{projectData?.sub_title}</h2>
          <div className="row my-4">
            <div className="col-md-6">
              <div
                className="richtext-content"
                dangerouslySetInnerHTML={{ __html: projectData?.content.html }}
              />
            </div>
            <div className="col-md-6">
              <iframe
                className="w-100"
                title="youtube Video Player"
                frameBorder="0"
                allowFullScreen
                allow="autoplay"
                src={projectData?.video_url}
              ></iframe>
            </div>
          </div>
          <a className="view-product" href={projectData?.button_url}>
            View Product Details
          </a>
          <div className="row my-4">
            {projectData?.gallery.map((item, idx) => (
              <div className="col-sm-3" key={idx}>
                <img className="w-100" src={item.image.url} alt={item.alt} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container">
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={10}
          ></GoogleMap>
        </LoadScript>
      </section>
      <SliderComponent type="project" />
      <SliderComponent type="blog" />
      <FooterCTA />
    </Layout>
  )
}

export default ProjectPage

export const query = graphql`
  query ProjectQuery {
    allPrismicProjectCategory {
      nodes {
        data {
          name
        }
        prismicId
      }
    }
  }
`
