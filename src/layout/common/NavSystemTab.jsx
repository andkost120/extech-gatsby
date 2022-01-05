import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import NavSystemLink from "../../components/shared/NavSystemLink"
import { ServiceHover } from "../../utils/imgLoader"

const NavSystemTab = () => {
  const data = useStaticQuery(graphql`
    query NavSystemQuery {
      allPrismicProduct {
        nodes {
          uid
          data {
            name
            type {
              id
            }
            prod_img {
              url
              gatsbyImageData
            }
          }
        }
      }
    }
  `)

  const systems = data.allPrismicProduct.nodes

  const translucent_walls = systems.filter(
    item => item.data.type.id === "YZ7YrxMAAB4AnC-b"
  )
  const canopies = systems.filter(
    item => item.data.type.id === "YZ7Y3hMAACAAnDB8"
  )
  const skylights = systems.filter(
    item => item.data.type.id === "YZ7Y-xMAAB8AnDEK"
  )
  const specialty_exteriors = systems.filter(
    item => item.data.type.id === "YZ7ZjRMAACIAnDOl"
  )
  const exclusive_systems = systems.filter(
    item => item.data.type.id === "YZ7abBMAACAAnDe4"
  )
  const windows = systems.filter(
    item => item.data.type.id === "YZ7awxMAAB4AnDlK"
  )
  const interiors = systems.filter(
    item => item.data.type.id === "YZ7a3RMAAB4AnDnN"
  )
  return (
    <div className="dropdown-content">
      <div className="container">
        <div className="black-back">
          <div className="dropmenu">
            <h5 className="underline">EXTECH Systems</h5>
            <div className="d-flex">
              <div className="col-lg-4">
                <NavSystemLink
                  subtitle="Translucent Walls"
                  links={translucent_walls}
                />
                <NavSystemLink subtitle="Canopies" links={canopies} />
              </div>
              <div className="col-lg-4">
                <NavSystemLink subtitle="Skylights" links={skylights} />
                <NavSystemLink
                  subtitle="Specialty Exteriors"
                  links={specialty_exteriors}
                />
                <NavSystemLink
                  subtitle="Exclusive Systems"
                  links={exclusive_systems}
                />
              </div>
              <div className="col-lg-4">
                <NavSystemLink subtitle="Windows" links={windows} />
                <NavSystemLink subtitle="Interiors" links={interiors} />
              </div>
            </div>
          </div>
          <div className="hover-img">
            <img src={ServiceHover} alt="hover" />
          </div>
        </div>
      </div>
      <div className="mobile-view">
        <NavSystemLink
          type="mobile"
          subtitle="Translucent Walls"
          links={translucent_walls}
        />
        <NavSystemLink type="mobile" subtitle="Canopies" links={canopies} />
      </div>
    </div>
  )
}

export default NavSystemTab
