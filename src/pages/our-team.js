import React, { useState } from "react"
import Layout from "../layout"
import { Link, graphql } from "gatsby"
import FooterCTA from "../components/shared/FooterCTA"
import Seo from "../components/shared/seo"
import SliderComponent from "../components/shared/SliderComponent"
import Modal from "react-modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

const Profile = ({ data }) => {
  const [show, setShow] = useState(false)
  return (
    <>
      <div
        className="col-6 col-sm-4 profile-item"
        onClick={() => setShow(true)}
        onKeyDown={() => setShow(true)}
        role="presentation"
      >
        <img src={data?.avatar.url} alt="avatar" />
        <h5 className="profile-item__name">{data?.profile_name}</h5>
        <p className="profile-item__role">{data?.role}</p>
      </div>
      <Modal
        isOpen={show}
        onRequestClose={() => setShow(false)}
        ariaHideApp={false}
        className="profile-modal"
      >
        <div className="text-end">
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => setShow(false)}
            onKeyDown={() => setSh(false)}
            role="presentation"
            className="fa-lg"
          />
        </div>
        <p className="profile-description">
          {data?.description}
          <a
            href={data?.linkedin_url.url}
            target={data?.linkedin_url.target}
            className="txt-gold fw-bold"
          >
            {" "}
            - view on LinkedIn
          </a>
        </p>
      </Modal>
    </>
  )
}

const OurTeam = ({ data }) => {
  const teamData = data?.allPrismicOurTeam.nodes[0].data
  const general_team = teamData?.team_profile.filter(
    item => item.type === "General Team"
  )
  const sales_team = teamData?.team_profile.filter(
    item => item.type === "Sales Team"
  )

  return (
    <Layout type="secondary">
      <Seo title={teamData?.title} />
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${teamData?.header_image.url})` }}
      >
        <div className="container">
          <h1 className="hero typo-txt">{teamData?.name}</h1>
        </div>
      </section>
      <nav aria-label="breadcrumb" className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item link">
            <Link to="/" className="txt-gold">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item link">
            <Link to="/" className="txt-gold">
              Company
            </Link>
          </li>
          <li className="breadcrumb-item link">
            <Link to="/our-team" className="text-black">
              Our Team
            </Link>
          </li>
        </ol>
      </nav>
      <section className="team-members">
        <div className="container">
          <div className="general-team">
            <h1 className="text-black text-uppercase">
              General Management team
            </h1>
            <p className="txt-gray intro">
              Consectetur tempus cursus sem morbi commodo vulputate et suscipit
              ornare. Lobortis semper dolor, ultrices amet ultrices. Nec lacus,
              dignissim rhoncus amet a tempor gravida. Mollis gravida in mattis
              non scelerisque volutpat. Netus nunc pulvinar ornare magna diam
              gravida. Egestas elit massa aliquam laoreet nibh sodales.
              <br />
              Turpis ipsum cum leo tellus, at gravida scelerisque amet, et.
              Risus mauris scelerisque eu, amet nunc. Aliquet ante eu, ac
              tincidunt porta.
            </p>
            <div className="row profile">
              {general_team?.map((item, idx) => (
                <Profile data={item} key={idx} />
              ))}
            </div>
          </div>
          <div className="sales-tema">
            <h1 className="text-black text-uppercase">EXTECH's Sales Team</h1>
            <div className="row profile">
              {sales_team?.map((item, idx) => (
                <Profile data={item} key={idx} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <FooterCTA />
      <SliderComponent type="project" />
      <SliderComponent type="blog" />
    </Layout>
  )
}

export default OurTeam

export const query = graphql`
  query OurTeamQuery {
    allPrismicOurTeam {
      nodes {
        data {
          title
          name
          header_image {
            url
            gatsbyImageData
          }
          team_profile {
            profile_name
            role
            type
            description
            avatar {
              gatsbyImageData
              url
            }
            linkedin_url {
              url
              target
            }
          }
        }
      }
    }
  }
`
