import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"

const Widget = ({ type, data }) => {
  const blogData = useStaticQuery(graphql`
    query WidgetQuery {
      allPrismicBlogPost {
        nodes {
          data {
            category {
              id
            }
          }
        }
      }
    }
  `)

  const blogs = blogData?.allPrismicBlogPost.nodes

  return (
    <section className="widget">
      <h5 className="text-black">{type}</h5>
      <hr />
      <ul>
        {data.map((item, idx) => (
          <li key={idx} className="widget-link">
            <Link to={`/category/${item.uid}`}>
              {item.data.name}&nbsp;
              <span className="txt-light-gray">
                (
                {
                  blogs.filter(blog => blog.data.category.id === item.prismicId)
                    .length
                }
                )
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        className="show-more d-inline-block w-100"
        to={type === "Categories" ? "/category" : "archive"}
      >
        Show More
        <FontAwesomeIcon icon={faAngleDown} className="fa-lg ms-1" />
      </Link>
    </section>
  )
}

export default Widget
