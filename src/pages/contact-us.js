import React, { useCallback, useReducer, useState } from "react"
import { Link } from "gatsby"
import validator from "validator"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import Select from "react-select"
import Layout from "../layout"
import SocialLinks from "../layout/SocialLinks"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons"

import { Down, Up } from "../utils/imgLoader"
import { FormInput, FormTextarea } from "../components/shared/FormControl"
import { states, jobs } from "../utils/staticData"
import { googleMapsApiKey } from "../../prismic-configuration"
import OrderModal from "../components/shared/OrderModal"
import QuoteModal from "../components/shared/QuoteModal"

const containerStyle = {
  width: "100%",
  height: "439px",
}

const center = {
  lat: -3.745,
  lng: -38.523,
}

const ContactForm = () => {
  const [us_state, setUSState] = useState(states[0])
  const [job, setJob] = useState(jobs[0])

  const [state, setState] = useReducer(
    (old, action) => ({ ...old, ...action }),
    {
      name: { value: "", error: "" },
      phone: { value: "", error: "" },
      email: { value: "", error: "" },
      message: "",
    }
  )
  const { name, phone, email, message } = state
  const handleNameChange = useCallback(e => {
    setState({
      name: {
        value: e.target.value,
        error: e.target.value.length >= 3 ? "" : "Length must be at least 3",
      },
    })
  }, [])
  const handlePhoneChange = useCallback(e => {
    setState({
      phone: {
        value: e.target.value,
        error: validator.isMobilePhone(e.target.value)
          ? ""
          : "Invalid phone number",
      },
    })
  }, [])
  const handleEmailChange = useCallback(e => {
    setState({
      email: {
        value: e.target.value,
        error: validator.isEmail(e.target.value) ? "" : "Invalid email address",
      },
    })
  }, [])
  const handleMessage = useCallback(e => {
    e.preventDefault()
    setState({ [e.target.name]: e.target.value })
  }, [])

  const handleUSSate = value => {
    setUSState(value)
  }
  const handleJob = value => {
    setJob(value)
  }
  const onSubmit = async event => {
    event.preventDefault()
    axios
      .post(
        process.env.API_BASE_URL,
        {},
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
      .then(
        res => console.log("res: ", res),
        error => console.log("error: ", error)
      )
  }

  return (
    <div className="contact-form">
      <h4 className="text-black">Complete the form to send us a message.</h4>
      <form className="mt-4" onSubmit={onSubmit}>
        <FormInput
          type="text"
          name="name"
          value={name.value}
          onChange={handleNameChange}
          placeholder="Your Name"
          error={name.error}
          label="Your Name"
          required
        />
        <FormInput
          type="tel"
          name="phone"
          value={phone.value}
          onChange={handlePhoneChange}
          placeholder="Phone"
          error={phone.error}
          label="Phone"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email.value}
          onChange={handleEmailChange}
          placeholder="Your Email"
          error={email.error}
          label="Your Email"
          required
        />
        <div className="select-group">
          <div className="mb-2">
            <p className="form-label">I am a(n)</p>
            <Select options={jobs} value={job} onChange={v => handleJob(v)} />
          </div>
          <div className="mb-2">
            <p className="form-label">State</p>
            <Select
              options={states}
              value={us_state}
              onChange={v => handleUSSate(v)}
            />
          </div>
        </div>
        <FormTextarea
          type="text"
          name="message"
          value={message}
          onChange={handleMessage}
          placeholder="Enter your message"
          label="Message"
        />
        <button className="btn-primary mt-3" type="submit">
          Send Message
        </button>
      </form>
    </div>
  )
}

const ContactUs = () => {
  const [showMap, setShowMap] = useState(false)
  const [showOrder, setShowOrder] = useState(false)
  const [showQuote, setShowQuote] = useState(false)

  const handleShowOrder = isShow => setShowOrder(isShow)
  const handleShowQuote = isShow => setShowQuote(isShow)

  return (
    <Layout>
      <section className="contactus">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item link">
                <Link to="/" className="txt-gold">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item link">
                <Link to="/contact-us" className="text-white">
                  CONTACTS
                </Link>
              </li>
            </ol>
          </nav>
          <div className="container mt-4">
            <div className="row">
              <div className="col-sm-6 contactus-info">
                <h1 className="hero">Contact Us</h1>
                <h4 className="mt-3">We'd love to hear from you!</h4>
                <ul className="infos">
                  <li className="info-item">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <p>200 Bridge Street, Pittsburgh, PA 15223</p>
                  </li>
                  <li className="info-item">
                    <FontAwesomeIcon icon={faPhone} />
                    <p>
                      Toll Free: 800.500.8083 <br />
                      Local: 412.781.0991 <br />
                      Fax: 800.500.8012
                    </p>
                  </li>
                  <li className="info-item">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <p>info@extechinc.com</p>
                  </li>
                </ul>
                <SocialLinks />
                <div className="action-btns">
                  <button
                    className="btn-third"
                    onClick={() => setShowOrder(true)}
                  >
                    Order a Sample
                  </button>
                  <button
                    className="btn-third"
                    onClick={() => setShowQuote(true)}
                  >
                    Quote Request
                  </button>
                </div>
              </div>
              <div className="col-sm-6">
                <ContactForm />
              </div>
            </div>
            <p
              className="link show-map"
              onClick={() => setShowMap(!showMap)}
              onKeyDown={() => setShowMap(!showMap)}
              role="presentation"
            >
              {showMap ? (
                <span>
                  HIDE MAP
                  <img src={Up} alt="up" />
                </span>
              ) : (
                <span>
                  SHOW MAP
                  <img src={Down} alt="down" />
                </span>
              )}
            </p>
          </div>
        </div>
      </section>
      {showMap && (
        <section className="google-map">
          <LoadScript googleMapsApiKey={googleMapsApiKey}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
            >
              <Marker position={center} />
            </GoogleMap>
          </LoadScript>
        </section>
      )}
      <section>
        <ContactForm />
      </section>
      <OrderModal show={showOrder} onShow={handleShowOrder} />
      <QuoteModal show={showQuote} onShow={handleShowQuote} />
    </Layout>
  )
}

export default ContactUs
