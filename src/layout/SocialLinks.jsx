import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { socials } from "../utils/staticData"

const SocialLinks = () => (
  <ul className="socials">
    {socials.map((item, idx) => (
      <li key={idx}>
        <a className="nav-link" href={item.to}>
          <FontAwesomeIcon icon={item.icon} />
        </a>
      </li>
    ))}
  </ul>
)

export default SocialLinks
