import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import SocialLinks from "./SocialLinks"
import { Logo, LogoSec } from "../utils/imgLoader"
import NavSystemTab from "./common/NavSystemTab"
import NavDropdownTab from "./common/NavDropdownTab"
import { company, socials, resources } from "../utils/staticData"
import QuoteModal from "../components/shared/QuoteModal"

const Header = ({ type }) => {
  const [show, setShow] = useState(false)

  const data = useStaticQuery(graphql`
    query HeaderQuery {
      allPrismicCaseStudy {
        nodes {
          data {
            name
            header_image {
              url
              gatsbyImageData
            }
          }
          uid
        }
      }
      allPrismicIndustries {
        nodes {
          data {
            name
            header_image {
              url
              gatsbyImageData
            }
          }
          uid
        }
      }
      allPrismicServices {
        nodes {
          data {
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
  const allCases = data?.allPrismicCaseStudy.nodes
  const allIndustries = data?.allPrismicIndustries.nodes
  const allServices = data?.allPrismicServices.nodes
  const [hambugerActive, setHambugerActiveState] = useState(false)
  const [navMenuShow, setNavMenuShow] = useState({})

  const navMenuClick = navItem => {
    setNavMenuShow({
      ...navMenuShow,
      [navItem]: !navMenuShow[navItem],
    })
  }

  const hamburgerHandler = () => {
    setHambugerActiveState(!hambugerActive)
  }
  const handleShow = isShow => setShow(isShow)

  let humbugerClsName = "hamburger my-auto "
  let navMenuClsName = "navbar-nav "

  if (hambugerActive) {
    humbugerClsName += "active"
    navMenuClsName += "active"
  }
  return (
    <header>
      <div className="topbar">
        <nav className="navbar fixed-top zindex">
          <div className="container">
            <ul className="topbar-nav me-auto">
              <li className="nav-item d-flex align-items-center">
                Questions? Call us on:&nbsp;
                <a className="nav-link" href="tel:+18005008083">
                  +1 800-500-8083
                </a>
              </li>
              <li className="nav-item dropdown ">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Resources
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {resources.map((item, idx) => (
                    <li key={idx}>
                      <Link className="dropdown-item" to={`/${item.uid}`}>
                        {item.data.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  href="/"
                >
                  Company
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {company.map((item, idx) => (
                    <li key={idx}>
                      <Link className="dropdown-item" to={`/${item.uid}`}>
                        {item.data.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            <SocialLinks />
          </div>
        </nav>
      </div>
      <div className="navigation">
        <nav
          className={
            type + " navbar fixed-top navbar-expand-lg navbar-dark bg-dark"
          }
        >
          <div className="container h-100">
            <Link className="navbar-brand" to="/">
              <img src={Logo} alt="logo" className="primary-logo" />
              <img src={LogoSec} alt="logo" className="secondary-logo" />
            </Link>
            <Link className="contact-link nav-link ms-auto" to="/contact-us">
              CONTACTS
            </Link>
            <div
              className={humbugerClsName}
              onClick={hamburgerHandler}
              onKeyDown={hamburgerHandler}
              role="button"
              tabIndex="0"
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
            <ul className={navMenuClsName}>
              <li className="nav-item">
                <Link className="nav-link" activeClassName="active" to="/">
                  Home
                </Link>
              </li>
              <li
                className={`nav-item dropdown ${
                  navMenuShow["systems"] && "show"
                }`}
                onClick={() => navMenuClick("systems")}
                role="presentation"
              >
                <Link
                  to="#Systems"
                  className="nav-link"
                  activeClassName="active"
                >
                  Systems
                </Link>
                <NavSystemTab />
              </li>
              <li
                className={`nav-item dropdown ${
                  navMenuShow["services"] && "show"
                }`}
                onClick={() => navMenuClick("services")}
                role="presentation"
              >
                <a className="nav-link" href="#Services">
                  Services
                </a>
                <NavDropdownTab data={allServices} type="service" />
              </li>
              <li
                className={`nav-item dropdown ${
                  navMenuShow["industry"] && "show"
                }`}
                onClick={() => navMenuClick("industry")}
                role="presentation"
              >
                <a className="nav-link" href="#industries">
                  Industries
                </a>
                <NavDropdownTab data={allIndustries} type="industry" />
              </li>
              <li
                className={`nav-item dropdown ${
                  navMenuShow["cases"] && "show"
                }`}
                onClick={() => navMenuClick("cases")}
                role="presentation"
              >
                <a className="nav-link" href="#Case">
                  Case Studies
                </a>
                <NavDropdownTab data={allCases} type="case" />
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/contact-us"
                  activeClassName="active"
                >
                  Contacts
                </Link>
              </li>
              <li
                className={`nav-item dropdown company ${
                  navMenuShow["company"] && "show"
                }`}
                onClick={() => navMenuClick("company")}
                role="presentation"
              >
                <a className="nav-link" href="#Company">
                  Company
                </a>
                <NavDropdownTab data={company} />
              </li>
              <li
                className={`nav-item dropdown resources ${
                  navMenuShow["Resources"] && "show"
                }`}
                onClick={() => navMenuClick("Resources")}
                role="presentation"
              >
                <a className="nav-link" href="#Resources">
                  Resources
                </a>
                <NavDropdownTab data={resources} />
              </li>
              <li className="nav-item quote-link">
                <button className="btn-second" onClick={() => handleShow(true)}>
                  Get a Quote
                </button>
              </li>
              <li className="nav-item call-us">
                <span className="text-black">Questions? Call us on:&nbsp;</span>
                <a className="txt-gold" href="tel:+18005008083">
                  +1 800-500-8083
                </a>
              </li>
              <li className="nav-item social-icons">
                {socials.map((item, idx) => (
                  <a href={item.to} key={idx}>
                    <FontAwesomeIcon icon={item.icon} className="txt-gold" />
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <QuoteModal show={show} onShow={handleShow} />
    </header>
  )
}

export default Header
