import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import ImageGallery from "react-image-gallery"
import Layout from "../layout"
import { ChevronDown, ChevronUp, Play } from "../utils/imgLoader"
import SliderComponent from "../components/shared/SliderComponent"
import FooterCTA from "../components/shared/FooterCTA"
import TechTab from "../components/product-page/TechTab"
import TechSelect from "../components/product-page/TechSelect"
import FAQSection from "../components/product-page/FAQSection"
import Seo from "../components/shared/seo"

const ArrowUp = ({ onClick, disabled }) => {
  return (
    <div
      className="image-gallery-up-nav"
      disabled={disabled}
      onClick={onClick}
      onKeyDown={onClick}
      role="presentation"
    >
      <img src={ChevronUp} alt="arrow up" />
    </div>
  )
}
const ArrowDown = ({ onClick, disabled }) => {
  return (
    <div
      className="image-gallery-down-nav"
      disabled={disabled}
      onClick={onClick}
      onKeyDown={onClick}
      role="presentation"
    >
      <img src={ChevronDown} alt="arrow down" />
    </div>
  )
}
const FeatureItem = ({ data }) => (
  <div className="feature-item">
    <img src={data.icon.url} alt="feature" className="feature-img" />
    <p className="feature-text">{data.name}</p>
  </div>
)

const ProductPage = ({ pageContext, data }) => {
  const { product } = pageContext
  const [gallery_images, setGallery] = useState([])
  const [techList, setTechList] = useState([])

  const productData = product?.data
  const ctaDatas = data?.allPrismicProductCta.nodes
  const ctaData = ctaDatas?.filter(
    item => item?.prismicId === productData?.cta.id
  )
  const techInfos = data?.allPrismicProductTechInfo.nodes
  const techInfo = techInfos?.filter(
    item => item?.prismicId === productData?.tech_info.id
  )[0]?.data

  useEffect(() => {
    setGallery(
      productData?.gallery.map(item => ({
        original: item.image.url,
        thumbnail: item.image.url,
        originalAlt: item.alt,
        thumbnailAlt: item.alt,
        description: item.caption,
        originalTitle: item.caption,
        thumbnailTitle: item.caption,
      }))
    )
    setTechList(
      techInfo &&
        Object.keys(techInfo).map(key => ({
          label: key.toUpperCase(),
          value: key,
        }))
    )
  }, [])
  return (
    <Layout type="secondary">
      <Seo title={productData?.title} />
      <section className="top-gap"></section>
      <nav aria-label="breadcrumb" className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item link">
            <Link to="/" className="txt-gold">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item link">
            <Link to="/" className="txt-gold">
              Systems
            </Link>
          </li>
          <li className="breadcrumb-item link">
            <Link to={`/products/${product?.uid}`} className="text-black">
              {productData?.header}
            </Link>
          </li>
        </ol>
      </nav>
      <section className="product-detail">
        <div className="container">
          <div className="text-center mb-5">
            <img
              src={productData?.prod_img.url}
              alt="product"
              className="product-img"
            />
          </div>
          <h1 className="hero text-black">{productData?.header}</h1>
          <h5 className="text-black">{productData?.sub_header}</h5>
          <p className="txt-gray my-4">{productData?.description}</p>
          <button className="btn-primary me-3">Order a sample</button>
          <button className="btn-second">Downloads</button>
        </div>
      </section>
      <section className="section-features container">
        {productData?.icons.map((item, idx) => (
          <FeatureItem data={item} key={idx} />
        ))}
      </section>
      <section className="section-gallery product-page">
        <div className="container">
          <h6 className="text-white">{productData?.name}</h6>
          <h1 className="text-white text-uppercase">Project gallery</h1>

          <ImageGallery
            items={gallery_images}
            showFullscreenButton={false}
            showPlayButton={false}
            autoPlay={true}
            thumbnailPosition="right"
            renderLeftNav={(onClick, disabled) => (
              <ArrowUp onClick={onClick} disabled={disabled} />
            )}
            renderRightNav={(onClick, disabled) => (
              <ArrowDown onClick={onClick} disabled={disabled} />
            )}
          />
          <ImageGallery
            items={gallery_images}
            showFullscreenButton={false}
            showPlayButton={false}
            autoPlay={true}
          />
        </div>
      </section>
      <section className="product-spotlight container">
        <div className="row flex-row-reverse align-items-center">
          <div className="col-sm-6 text-center">
            <img
              src={productData?.spotlight_img.url}
              alt="product spotlight"
              className="w-100"
            />
          </div>
          <div className="col-sm-6">
            <span className="kicker-text txt-gold">PRODUCT SPOTLIGHT</span>
            <h1 className="pre-wrap text-black">{productData?.header}</h1>
            <div
              className="richtext-content"
              dangerouslySetInnerHTML={{
                __html: productData?.spotlight_text.html,
              }}
            />
            <button className="btn-fifth">Get Your Free Quote</button>
          </div>
        </div>
      </section>
      <section className="model-section container">
        <h6 className="kicker-text txt-gold">{productData?.header}</h6>
        <h1 className="pre-wrap text-black">PRODUCT VIDEOS</h1>
        {/* <div className="threed-model">
          <div className="pos-center">
            <button className="btn-play">
              <img src={Play} alt="play" />
            </button>
          </div>
        </div> */}
        <div
          className="richtext-content embed-code"
          dangerouslySetInnerHTML={{ __html: productData?.vimeo_code }}
        />
      </section>
      <SliderComponent type="project" />
      {ctaData[0] && (
        <section
          className="section-cta other"
          style={{ backgroundImage: ctaData[0]?.data.bg_image.url }}
        >
          <div className="blue-layer"></div>
          <div className="container position-relative">
            <div className="row">
              <div className="col-md-6">
                <h2 className="text-white">{ctaData[0]?.data.title}</h2>
                <p>{ctaData[0]?.data.text}</p>
              </div>
              <div className="col-md-6 btn-group">
                <Link
                  className="btn-fourth"
                  to={`/${ctaData[0]?.data.btn_link}`}
                >
                  {ctaData[0]?.data.btn_text}
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
      <section className="model-section container">
        <h6 className="kicker-text txt-gold">{productData?.header}</h6>
        <h1 className="pre-wrap text-black">3D Model</h1>
        {/* <div className="threed-model">
          <div className="pos-center">
            <button className="btn-play">
              <img src={Play} alt="play" />
            </button>
            <p className="text-black">
              Click to show the 3D model of
              <br />
              {productData?.header}
            </p>
          </div>
        </div> */}
        <div
          className="richtext-content embed-code"
          dangerouslySetInnerHTML={{ __html: productData?.sketchfab_code }}
        />
      </section>
      {techList?.length > 0 && Object.keys(techInfo).length > 0 && (
        <section className="tech-info container">
          <h6 className="kicker-text txt-gold">{productData?.header}</h6>
          <h1 className="pre-wrap text-black">Technical Information</h1>
          <TechTab
            list={techList}
            info={techInfo}
            prodName={productData?.header}
          />
          <TechSelect
            list={techList}
            info={techInfo}
            prodName={productData?.header}
          />
        </section>
      )}
      <FAQSection questions={productData?.faqs} />
      <FooterCTA />
    </Layout>
  )
}

export default ProductPage

export const query = graphql`
  query ProductPage {
    allPrismicProductCta {
      nodes {
        data {
          title
          text
          btn_text
          btn_link
          bg_image {
            url
            gatsbyImageData
          }
        }
        prismicId
      }
    }
    allPrismicProductTechInfo {
      nodes {
        data {
          bim {
            title
            description
            require_login
            icon {
              url
              gatsbyImageData
            }
            file {
              url
            }
          }
          cad {
            title
            description
            require_login
            icon {
              url
              gatsbyImageData
            }
            file {
              url
            }
          }
          literature {
            title
            description
            require_login
            icon {
              url
              gatsbyImageData
            }
            file {
              url
            }
          }
          spec {
            title
            description
            require_login
            icon {
              url
              gatsbyImageData
            }
            file {
              url
            }
          }
        }
        prismicId
      }
    }
  }
`
