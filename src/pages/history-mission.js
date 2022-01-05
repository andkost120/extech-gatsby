import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../layout"
import Seo from "../components/shared/seo"

const HistoryMission = ({ data }) => {
  const historyData = data?.allPrismicHistoryMission.nodes[0].data
  return (
    <Layout type="secondary">
      <Seo title={historyData?.title} />
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${historyData?.banner_image.url})` }}
      >
        <div className="container">
          <h1 className="hero">
            <span className="typo-txt">{historyData?.header_title}</span>
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
            <Link
              to={data?.allPrismicHistoryMission.nodes[0].uid}
              className="text-black"
            >
              {historyData?.header_title}
            </Link>
          </li>
        </ol>
      </nav>
      <div className="container">
        <p className="quote">{historyData?.intro_text}</p>
        <div
          className="richtext-content"
          dangerouslySetInnerHTML={{ __html: historyData?.page_content.html }}
        />
      </div>
    </Layout>
  )
}

export default HistoryMission

export const query = graphql`
  query HistoryMissionQuery {
    allPrismicHistoryMission {
      nodes {
        data {
          title
          header_title
          intro_text
          banner_image {
            url
            gatsbyImageData
          }
          page_content {
            html
          }
        }
        uid
      }
    }
  }
`
