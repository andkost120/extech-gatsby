import React from "react"
import { Link } from "gatsby"

const NavLink = ({ type, subtitle, links }) => {
  return (
    <>
      {type === "mobile" ? (
        <>
          {subtitle && <h5>{subtitle}</h5>}
          <ul className="mb-3">
            {links.map((item, idx) => (
              <li key={idx} className="menu-item">
                <Link to={`/${item.uid}`} className="menu-link">
                  {item.data.name}
                  {item.small && <small>{item.small}</small>}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <p className="fw-bold my-2">{subtitle}</p>
          <ul className="mb-3">
            {links.map((item, idx) => (
              <li key={idx} className="footer-link">
                <Link to={`/${item.uid}`}>{item.data.name}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}

export default NavLink
