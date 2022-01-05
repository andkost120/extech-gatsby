import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../layout"
import FooterCTA from "../components/shared/FooterCTA"
import SliderComponent from "../components/shared/SliderComponent"
import Seo from "../components/shared/seo"

const ProductCategory = ({ data, pageContext }) => {
  const { product_category } = pageContext
  const products = data?.allPrismicProduct.nodes.filter(
    item => item.data.type.id === product_category?.prismicId
  )

  return (
    <Layout type="secondary">
      <Seo title={product_category?.data.name} />
      <section className="hero-section gallery-hero">
        <div className="container">
          <h1 className="hero typo-txt">{product_category?.data.name}</h1>
        </div>
      </section>
      <section className="gallery-section">
        <div className="container">
          {products.map((item, idx) => (
            <figure className="row my-4" key={idx}>
              <div className="col-md-5">
                <img
                  className="project-item__img "
                  src={item.data.prod_img.url}
                  alt={item.data.name}
                />
              </div>
              <div className="project-item col-md-7">
                <h2 className="project-item__name">{item.data.name}</h2>
                <p className="project-item__category mb-3">
                  System:&nbsp;
                  <span className="txt-gold">
                    {product_category?.data.name}
                  </span>
                </p>
                <p className="project-item__summary my-3">
                  {item.data.description}
                </p>
                <Link to={`/${item?.uid}`} className="btn-second text-center">
                  View Product
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

export default ProductCategory

export const query = graphql`
  query ProductCagetoryQuery {
    allPrismicProduct {
      nodes {
        uid
        data {
          name
          prod_img {
            url
            gatsbyImageData
          }
          type {
            id
          }
          description
        }
      }
    }
  }
`
