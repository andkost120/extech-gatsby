import { Link } from "gatsby"
import React, { useRef } from "react"
import Slider from "react-slick"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { ArrowRight } from "../../utils/imgLoader"

const CustomSlide = ({ data }) => {
  return (
    <div className="hero-slide position-relative">
      <img src={data.image.url} alt="hero slide" className="hero-img" />
      <div className="container">
        <div className="fixed-content">
          <h1 className="hero">
            <span className="typo-txt">{data.title}</span>
          </h1>
          <h3 className="my-4">
            <span className="typo-txt">{data.sub_title}</span>
          </h3>
          <Link className="btn-goto" to={data.btn_link}>
            <span>
              {data.btn_text}
              &nbsp;&nbsp;
              <img src={ArrowRight} alt="arrow right" className="arrow-right" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

const HeroComponent = ({ heros }) => {
  const slider = useRef()

  const next = () => {
    slider.current.slickNext()
  }
  const previous = () => {
    slider.current.slickPrev()
  }
  // const clickDot = index => {
  //   slider.slickGoTo(index)
  // }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    appendDots: dots => (
      <div
        style={{
          display: "flex",
          padding: "10px",
          alignItems: "center",
        }}
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="text-white fa-lg"
          onClick={previous}
        />
        <ul style={{ margin: "0px", alignItems: "center" }}> {dots} </ul>
        <FontAwesomeIcon
          icon={faArrowRight}
          className="text-white fa-lg"
          onClick={next}
        />
      </div>
    ),
    customPaging: i => (
      <p
        style={{
          width: "30px",
          color: "white",
        }}
      >
        0{i + 1}
      </p>
    ),
  }
  return (
    <section className="section-hero">
      <Slider ref={c => (slider.current = c)} {...settings}>
        {heros.map((item, index) => (
          <CustomSlide data={item} key={index} />
        ))}
        {/* <div className="custom-dots">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-white fa-lg"
            onClick={previous}
          />
          <ul style={{ margin: "0px" }}>
            {heros.map((dot, idx) => (
              <li onClick={clickDot(idx)} key={idx}>
                <p
                  style={{
                    width: "30px",
                    color: "white",
                    fontSize: "20px",
                  }}
                >
                  {dot.num}
                </p>
              </li>
            ))}{" "}
          </ul>
          <FontAwesomeIcon
            icon={faArrowRight}
            className="text-white fa-lg"
            onClick={next}
          />
        </div> */}
      </Slider>
      {/* <div className="container"></div> */}
    </section>
  )
}

export default HeroComponent
