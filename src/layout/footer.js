import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import SocialLinks from "./SocialLinks"
import NavSystemLink from "../components/shared/NavSystemLink"
import { resources } from "../utils/staticData"
import { Guide, LogoThird } from "../utils/imgLoader"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faFax,
} from "@fortawesome/free-solid-svg-icons"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      allPrismicProductType {
        nodes {
          data {
            name
          }
          prismicId
          uid
        }
      }
    }
  `)
  const systems = data?.allPrismicProductType.nodes
  return (
    <footer>
      <div className="footer-navbar">
        <div className="container ">
          <div className="row">
            <div className="col-lg-4">
              <h5 className="underline">Design Guide</h5>
              <div className="d-flex align-items-center my-4">
                <div className="col-6">
                  <p>Sign up and receive our free daylighting design guide.</p>
                </div>
                <div className="col-6">
                  <img src={Guide} alt="guide img" className="w-100" />
                </div>
              </div>
              <div className="d-flex align-items-center">
                <input
                  type="email"
                  className="form-control my-2"
                  id="email"
                  placeholder="Email"
                />
                <button type="submit" className="btn-submit">
                  Submit
                </button>
              </div>
            </div>
            <div className="col-lg-4">
              <h5 className="underline">Quick Links</h5>
              <div className="d-flex">
                <div className="col-6">
                  <NavSystemLink subtitle="Systems" links={systems} />
                </div>
                <div className="col-6">
                  <NavSystemLink subtitle="Resources" links={resources} />
                </div>
              </div>
            </div>
            <div className="col-lg-4 contact-menu">
              <div className="contact-menu__header">
                <h5>Contact</h5>
                <SocialLinks />
              </div>
              <Link to="/">
                <img src={LogoThird} alt="logo third" />
              </Link>
              <ul className="contact-infos">
                <li className="info-item">
                  <p>
                    <FontAwesomeIcon icon={faMapMarkerAlt} size="1x" />
                  </p>
                  <p className="ms-2">
                    200 Bridge Street, Pittsburgh, PA 15223
                  </p>
                </li>
                <li className="info-item">
                  <p>
                    <FontAwesomeIcon icon={faPhone} size="1x" />
                  </p>
                  <p className="ms-2">
                    Toll Free:
                    <a href="tel:+1-800-500-8083"> 800.500.8083 </a>
                    <br />
                    Local:
                    <a href="tel:+1-412-781-0991"> 412.781.0991</a>
                  </p>
                </li>
                <li className="info-item">
                  <p>
                    <FontAwesomeIcon icon={faFax} size="1x" />
                  </p>
                  <p className="ms-2">
                    Toll Free Fax:
                    <a href="tel:+1-800-500-8012"> 800.500.8012</a>
                    <br />
                    Local Fax:
                    <a href="tel:+1-412-781-9303"> 412.781.9303</a>
                  </p>
                </li>
                <li className="info-item">
                  <p>
                    <FontAwesomeIcon icon={faEnvelope} size="1x" />
                  </p>
                  <p className="ms-2">
                    <a href="mailto:info@extechinc.com">info@extechinc.com</a>
                  </p>
                </li>
              </ul>
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
      <div className="bottombar text-center">
        <p>© {new Date().getFullYear()} Extech / Exterior Technologies Inc.</p>
      </div>
    </footer>
  )
}

export default Footer
