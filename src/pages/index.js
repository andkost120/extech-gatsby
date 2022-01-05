import * as React from "react"
import Layout from "../layout"
import Seo from "../components/shared/seo"
import HomeHero from "../components/home/HomeHero"
import SliderComponent from "../components/shared/SliderComponent"
import Portfolio from "../components/shared/Portfolio"
import History from "../components/home/History"
import Benefits from "../components/home/Benefits"
import { Link, graphql } from "gatsby"
import FooterCTA from "../components/shared/FooterCTA"

const HomePage = ({ data }) => {
  const guideData = data?.allPrismicDownloadCta.nodes[0].data
  const heroData = data?.allPrismicHomepage.nodes[0].data.main_slider
  const benefitsData = data?.allPrismicHomepage.nodes[0].data.benefit_slider

  return (
    <Layout type="primary">
      <Seo title="Daylighting Systems" />
      <HomeHero heros={heroData} />
      <SliderComponent type="systems" />
      <Portfolio type="services" />
      <History />
      <Portfolio type="professionals" />
      <SliderComponent type="project" />
      <Benefits benefits={benefitsData} />
      <SliderComponent type="blog" />
      <section className="section-benefits">
        <div className="guide-slide position-relative">
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-md-5">
                <p className="kicker-text">{guideData?.kicker}</p>
                <h2 className="text-uppercase">{guideData?.title}</h2>
                <p className="pre-wrap">{guideData?.content}</p>
                <Link className="btn-third" to={guideData?.btn_link}>
                  {guideData?.btn_text}
                </Link>
              </div>
              <div className="col-md-7">
                <img
                  src={guideData.image.url}
                  alt="guide slide"
                  className="w-100 h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterCTA page="home" />
    </Layout>
  )
}
export default HomePage

export const query = graphql`
  query HomepageQuery {
    allPrismicHomepage {
      nodes {
        data {
          main_slider {
            title
            sub_title
            btn_text
            btn_link
            image {
              url
              gatsbyImageData
            }
          }
          benefit_slider {
            kicker
            title
            content
            btn_text
            btn_link
            image {
              url
              gatsbyImageData
            }
          }
        }
      }
    }
    allPrismicDownloadCta {
      nodes {
        data {
          kicker
          title
          content
          btn_text
          btn_link
          image {
            url
            gatsbyImageData
          }
        }
      }
    }
  }
`
