import { Link } from "gatsby"
import React from "react"
import { professionals } from "../../utils/staticData"

const kicker = {
  services: "SERVICES",
  professionals: "WHO WE HELP",
}

const heading = {
  services: "WE OFFER FULL CYCLE SERVICES \nTO MAKE YOUR DREAMS COME TRUE",
  professionals: "SERVICE FOR PROFESSIONALS",
}

const services = [
  "Translucent Daylighting Systems",
  "Custom Facades",
  "Design, Fabrication & Installation",
]

const Portfolio = ({ type }) => {
  return (
    <section className={"section-" + type}>
      {type === "services" && <div className="blue-layer"></div>}
      <div className="container position-relative">
        <span
          className={
            type !== "professionals"
              ? "kicker-text txt-white"
              : "kicker-text text-black"
          }
        >
          {kicker[type]}
        </span>
        <h1
          className={
            type !== "professionals" ? "pre-wrap" : "pre-wrap text-black"
          }
        >
          {heading[type]}
        </h1>
        <div className="service row mt-4">
          {type === "services" &&
            services.map((item, index) => (
              <div className="col-md-4" key={index}>
                <div className="service-portfolio">
                  <p className="portfolio-kicker">0{index + 1}.</p>
                  <h2 className="portfolio-name my-auto">{item}</h2>
                </div>
              </div>
            ))}
          {type === "professionals" &&
            professionals.map((item, index) => (
              <div className="col-md-4" key={index}>
                <div
                  className="service-portfolio"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <h2 className="text-center mt-4">{item.name}</h2>
                </div>
              </div>
            ))}
        </div>
        {type === "services" && (
          <div className="text-center service-all">
            <Link to="services" className="btn-third">
              All Services
            </Link>
          </div>
        )}{" "}
      </div>
    </section>
  )
}

export default Portfolio
