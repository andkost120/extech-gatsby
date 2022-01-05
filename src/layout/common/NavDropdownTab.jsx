import React from "react"
import { Link } from "gatsby"
import NavSystemLink from "../../components/shared/NavSystemLink"
import { ServiceHover } from "../../utils/imgLoader"

const NavDropdownTab = ({ data, type }) => {
  return (
    <div className="dropdown-content">
      <div className="container">
        <div className="black-back">
          <div className="dropmenu">
            {type === "service" && <h5 className="underline">Our Services</h5>}
            {type === "case" && <h5 className="underline">Case Studies</h5>}
            {type === "industry" && <h5 className="underline">Industries</h5>}
            <ul className="pt-2 mb-4">
              {data.map((item, idx) => (
                <Link
                  to={
                    type === "industry"
                      ? `/industry/${item.uid}`
                      : `/${item.uid}`
                  }
                  key={idx}
                >
                  <li className="dropmenu-link">{item.data.name}</li>
                </Link>
              ))}
            </ul>
            {type === "case" && (
              <Link className="btn-third" to="/case-studies">
                Show All
              </Link>
            )}
          </div>
          <div className="hover-img">
            <img src={ServiceHover} alt="hover" />
          </div>
        </div>
      </div>
      <div className="mobile-view">
        <NavSystemLink type="mobile" links={data} />
      </div>
    </div>
  )
}

export default NavDropdownTab
