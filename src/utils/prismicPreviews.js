import { componentResolverFromMap } from "gatsby-plugin-prismic-previews"
import { prismicRepo } from "../../prismic-configuration"
import { linkResolver } from "./linkResolver"

import ProjectPage from "../pages/project"
import BlogDetail from "../pages/blog-detail"
import ProductPage from "../pages/product-page"
import CaseStudy from "../pages/case-study"

export const repositoryConfigs = [
  {
    repositoryName: prismicRepo,
    linkResolver,
    componentResolver: componentResolverFromMap({
      project: ProjectPage,
      blogpost: BlogDetail,
      product: ProductPage,
      casestudy: CaseStudy,
    }),
  },
]
