import React from "react"
import { Link } from "gatsby"

const BlogItem = ({ blog, categoryData }) => {
  const currentBlog = blog.data
  const currentCategory = categoryData.filter(
    item => item.prismicId === currentBlog?.category.id
  )
  return (
    <>
      {currentBlog?.main_image.url ? (
        <article>
          <div className="row">
            <div className="col-lg-5">
              <img
                src={currentBlog?.main_image.url}
                alt="blog item"
                className="post-image"
              />
            </div>
            <div className="col-lg-7">
              <div className="blog-item">
                <header>
                  <p className="link txt-gold">
                    {currentCategory[0]?.data.name}
                  </p>
                  <Link to={`/${blog.uid}`}>
                    <h5 className="text-black">{currentBlog?.header}</h5>
                  </Link>
                </header>
                <p className="post-content">{currentBlog?.header_text}</p>
                <footer>
                  <span className="post-author txt-blue link">
                    {currentBlog.author_name}
                  </span>
                  <span className="post-date txt-light-gray link">
                    {currentBlog.date}
                  </span>
                </footer>
              </div>
            </div>
          </div>
        </article>
      ) : (
        <article>
          <div className="blog-item">
            <header>
              <p className="link txt-gold">{currentCategory[0]?.data.name}</p>
              <Link to={`/${blog.uid}`}>
                <h5 className="text-black">{currentBlog?.header}</h5>
              </Link>
            </header>
            <p className="post-content">{currentBlog?.header_text}</p>
            <footer>
              <span className="post-author txt-blue link">
                {currentBlog?.author_name}
              </span>
              <span className="post-date txt-light-gray link">
                {currentBlog?.date}
              </span>
            </footer>
          </div>
        </article>
      )}
    </>
  )
}

export default BlogItem
