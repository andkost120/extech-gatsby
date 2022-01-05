import React from "react"
import { Link } from "gatsby"
import { ChevronRightGold } from "../../utils/imgLoader"

const TechnologySlider = ({ data }) => {
  return (
    <div className="technology-slide position-relative">
      <div className="row align-items-center">
        <div className="col-sm-4 technology-img">
          <img src={data.imgSrc} alt="technology slide" />
        </div>
        <div className="col-sm-8 content-wrapper d-flex justify-content-center flex-column">
          <h5>{data.name}</h5>
          <ul className="advantage">
            {data.list.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <Link className="link txt-gold d- mt-3 d-flex" to={data.to}>
            Quote request
            <img src={ChevronRightGold} className="ms-2 txt-gold w-auto" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TechnologySlider
