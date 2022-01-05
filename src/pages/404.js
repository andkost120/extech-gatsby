import * as React from "react"

import Layout from "../layout"
import Seo from "../components/shared/seo"
import { withPrismicUnpublishedPreview } from "gatsby-plugin-prismic-previews"

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <div className="not-found">
      <h1>404</h1>
      <h3>The page you are looking for was not found</h3>
      <p>
        <a href="/">
          <button type="button">Return to homepage</button>
        </a>
      </p>
    </div>
  </Layout>
)

export default withPrismicUnpublishedPreview(NotFoundPage)
