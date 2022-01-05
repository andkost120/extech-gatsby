import React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"

const PopularArticle = ({ data }) => {
  return (
    <section className="widget-article">
      <h5 className="text-black">Recent Articles</h5>
      <hr />
      <ul>
        {data.map((item, idx) => (
          <li key={idx}>
            {item.data.thumbnail.url && (
              <img src={item.data.thumbnail?.url} alt="blog item" />
            )}
            <Link to={`/${item.uid}`}>{item.data.header}</Link>
          </li>
        ))}
      </ul>
      <Link className="show-more d-inline-block w-100" to="/news-blog">
        Show More
        <FontAwesomeIcon icon={faAngleDown} className="fa-lg ms-1" />
      </Link>
    </section>
  )
}

export default PopularArticle
