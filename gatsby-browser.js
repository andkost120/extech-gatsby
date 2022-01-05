import * as React from "react"
import { PrismicPreviewProvider } from "gatsby-plugin-prismic-previews"
import { repositoryConfigs } from "./src/utils/prismicPreviews"
import { PrismicProvider } from "@prismicio/react"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "@popperjs/core/dist/umd/popper.min.js"
import "./src/styles/app.scss"

export const wrapRootElement = ({ element }) => (
  <PrismicProvider
    internalLinkComponent={({ href, ...props }) => (
      <Link to={href} {...props} />
    )}
  >
    <PrismicPreviewProvider repositoryConfigs={repositoryConfigs}>
      {element}
    </PrismicPreviewProvider>
  </PrismicProvider>
)
