import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../layout"
import FooterCTA from "../components/shared/FooterCTA"
import SliderComponent from "../components/shared/SliderComponent"
import Seo from "../components/shared/seo"

const ProjectCategory = ({ data, pageContext }) => {
  const { project_category } = pageContext
  const projects = data?.allPrismicProject.nodes.filter(
    item => item.data.category.id === project_category?.prismicId
  )

  return (
    <Layout type="secondary">
      <Seo title={project_category?.data.title} />
      <section className="hero-section gallery-hero">
        <div className="container">
          <h1 className="hero typo-txt">{project_category?.data.header}</h1>
        </div>
      </section>
      <section className="gallery-section">
        <div className="container">
          <h1 className="txt-blue">{project_category?.data.header}</h1>
          <div
            className="richtext-content"
            dangerouslySetInnerHTML={{
              __html: project_category?.data.summary.html,
            }}
          />
          {projects.map((item, idx) => (
            <figure className="row mt-4" key={idx}>
              <div className="col-md-5">
                <img
                  className="project-item__img "
                  src={item.data.gallery[0].image.url}
                  alt={item.data.gallery[0].alt}
                />
              </div>
              <div className="project-item col-md-7">
                <h2 className="project-item__name">{item.data.title}</h2>
                <p className="project-item__location">
                  {item.data.city}, {item.data.state}
                </p>
                <p className="project-item__summary my-3">
                  {item.data.summary}
                </p>
                <p className="project-item__category mb-4">
                  Category:&nbsp;
                  <span className="txt-gold">
                    {project_category?.data.name}
                  </span>
                </p>
                <Link
                  to={`/${project_category?.uid}/${item?.uid}`}
                  className="btn-second text-center"
                >
                  Read More
                </Link>
              </div>
            </figure>
          ))}
        </div>
      </section>
      <FooterCTA />
      <SliderComponent type="project" />
      <SliderComponent type="blog" />
    </Layout>
  )
}

export default ProjectCategory

export const query = graphql`
  query ProjectCagetoryQuery {
    allPrismicProject {
      nodes {
        data {
          title
          summary
          city
          state
          category {
            id
          }
          gallery {
            image {
              url
              gatsbyImageData
            }
          }
        }
        uid
      }
    }
  }
`
