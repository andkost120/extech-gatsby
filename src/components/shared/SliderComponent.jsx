import React, { useRef } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Slider from "react-slick"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"

const kicker = {
  systems: "BEST SOLUTIONS IN INDUSTRY",
  project: "OUR LATEST PROJECTS",
  blog: "NEWS & BLOG",
  trust: "COMPLEX SOLUTIONS ",
}

const heading = {
  systems:
    "INNOVATIVE DAYLIGHTING SOLUTIONS \nHARNESS THE POWER OF NATURAL LIGHT",
  project: "We carry out about 80 projects a year, \ntake a look at our latest",
  blog: "Our latest news \nand blog posts",
  trust: "WE TRUST US",
}

const CustomSlide = ({ data, type }) => {
  return (
    <div className={type + "-slide position-relative"}>
      <Link to={`/${data.btn_link}`}>
        <img src={data.image.url} alt="hero slide" />
        <div className="fixed-content">
          <h2>
            <span className="typo-txt">{data.title}</span>
          </h2>
          {data.content && (
            <p>
              <span className="typo-txt">{data.content}</span>
            </p>
          )}
        </div>
      </Link>
    </div>
  )
}
const BlogSlide = ({ data, type }) => {
  const blog = data?.data
  return (
    <div className={type + "-slide position-relative"}>
      <Link to={`/${data.uid}`}>
        <img src={blog.thumbnail.url} alt="hero slide" />
        <div className="fixed-content">
          <h5>
            <span className="typo-txt">{blog.header}</span>
          </h5>
          {blog.header_text && <p className="typo-txt">{blog.header_text}</p>}
        </div>
      </Link>
    </div>
  )
}
const ProjectSlide = ({ data, type }) => {
  const project = data?.data
  return (
    <div className={type + "-slide position-relative"}>
      <Link to={`/${data.uid}`}>
        <img src={project.header_image.url} alt="hero slide" />
        <div className="fixed-content">
          <h5>
            <span className="typo-txt">{project.name}</span>
          </h5>
          {project.header_text && (
            <p className="typo-txt">{project.header_text}</p>
          )}
        </div>
      </Link>
    </div>
  )
}

const SolutionComponent = ({ type }) => {
  const slider = useRef()
  const next = () => {
    slider.current.slickNext()
  }
  const previous = () => {
    slider.current.slickPrev()
  }
  const system_settings = {
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  }
  const blog_settings = {
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  const project_settings = {
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const data = useStaticQuery(graphql`
    query SlidersQuery {
      allPrismicHomepage {
        nodes {
          data {
            system_slider {
              title
              content
              btn_link
              image {
                url
                gatsbyImageData
              }
            }
          }
        }
      }
      allPrismicBlogPost(sort: { order: DESC, fields: data___date }) {
        nodes {
          data {
            header
            header_text
            date
            thumbnail {
              url
              gatsbyImageData
            }
          }
          uid
        }
      }
      allPrismicCaseStudy(
        sort: { order: DESC, fields: last_publication_date }
      ) {
        nodes {
          data {
            header_text
            name
            header_image {
              url
              gatsbyImageData
            }
          }
          uid
        }
      }
    }
  `)
  const systemsData = data?.allPrismicHomepage.nodes[0].data.system_slider
  const blogData = data?.allPrismicBlogPost.nodes.slice(0, 5)
  const projectData = data?.allPrismicCaseStudy.nodes.slice(0, 5)
  return (
    <section className="section-sliders">
      <div className="container">
        <span className="kicker-text txt-gold">{kicker[type]}</span>
        <div className="upper-slider">
          <h1 className="slider-heading">{heading[type]}</h1>
          <div className="arrow-btns">
            <FontAwesomeIcon
              icon={faAngleLeft}
              className="fa-2x"
              onClick={previous}
            />
            <FontAwesomeIcon
              icon={faAngleRight}
              className="fa-2x"
              onClick={next}
            />
          </div>
        </div>
        {type === "systems" && (
          <Slider ref={c => (slider.current = c)} {...system_settings}>
            {systemsData.map((item, index) => (
              <CustomSlide data={item} key={index} type={type} />
            ))}
          </Slider>
        )}
        {type === "blog" && (
          <>
            <Slider ref={c => (slider.current = c)} {...blog_settings}>
              {blogData.map((item, index) => (
                <BlogSlide data={item} key={index} type={type} />
              ))}
            </Slider>
            <div className="text-center mt-4">
              <Link to="/blogs" className="btn-primary ">
                Show All
              </Link>
            </div>
          </>
        )}
        {type === "project" && (
          <>
            <Slider ref={c => (slider.current = c)} {...project_settings}>
              {projectData.map((item, index) => (
                <ProjectSlide data={item} key={index} type={type} />
              ))}
            </Slider>
            <div className="text-center mt-4">
              <Link to="/case-studies" className="btn-primary ">
                Show Case Studies
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default SolutionComponent
