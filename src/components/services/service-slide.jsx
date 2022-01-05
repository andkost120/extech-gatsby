import React from "react"
import { Link } from "gatsby"
import { ArrowRightGold } from "../../utils/imgLoader"

const ServiceSlider = ({ data }) => {
  return (
    <div className="services-slide position-relative">
      <div className="container">
        <div className="row flex-row-reverse align-items-center">
          <div className="col-md-6 service-img">
            <img src={data.imgSrc} alt="service slide" />
          </div>
          <div className="col-md-6 content-wrapper d-flex justify-content-center flex-column">
            <h2>{data.header}</h2>
            <p className="my-4 pre-wrap">{data.content}</p>
            <Link className="link txt-gold d-flex" to={data.to}>
              Show More
              <img src={ArrowRightGold} className="ms-2 txt-gold w-auto" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceSlider
