import React, { useState, useCallback, useReducer, useRef } from "react"
import { Button, Modal } from "react-bootstrap"
import Slider from "react-slick"
import Select from "react-select"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FormTextarea, Input } from "../../components/shared/FormControl"
import { samples, sample_names, countries } from "../../utils/staticData"
import { Close } from "../../utils/imgLoader"

const OrderModal = ({ show, onShow }) => {
  const [sample, setSample] = useState(sample_names[0])
  const [country, setCountry] = useState(countries[0])

  const [state, setState] = useReducer(
    (old, action) => ({ ...old, ...action }),
    {
      name: "",
      phone: "",
      email: "",
      question: "",
      street_address1: "",
      street_address2: "",
      city: "",
      region: "",
      postal: "",
    }
  )
  const {
    name,
    phone,
    email,
    question,
    street_address1,
    street_address2,
    city,
    region,
    postal,
  } = state

  const handleInput = useCallback(e => {
    e.preventDefault()
    setState({ [e.target.name]: e.target.value })
  }, [])

  const handleShow = isShow => {
    onShow(isShow)
  }
  const handleSample = value => {
    setSample(value)
  }
  const handleCountry = value => {
    setCountry(value)
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

  const slider = useRef()
  const next = () => {
    slider.current.slickNext()
  }
  const previous = () => {
    slider.current.slickPrev()
  }
  const settings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  }

  return (
    <Modal show={show} onHide={() => handleShow(false)}>
      <Modal.Body>
        <div className="d-flex justify-content-end">
          <img
            src={Close}
            alt="close"
            onClick={() => handleShow(false)}
            onKeyDown={() => handleShow(false)}
            role="presentation"
            className="close"
          />
        </div>
        <h1>ORDER SAMPLE</h1>
        <p className="mt-3 mb-4">
          Working on a project that might incorporate one of our systems?
          Complete this form to have a system sample shipped to you.
        </p>
        <Slider ref={c => (slider.current = c)} {...settings}>
          {samples.map((item, index) => (
            <div key={index} className="sample-item">
              <img src={item} alt="sample" />
            </div>
          ))}
        </Slider>
        <div className="arrow-btns">
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="txt-light-gray fa-2x "
            onClick={previous}
          />
          <FontAwesomeIcon
            icon={faAngleRight}
            className="txt-light-gray fa-2x"
            onClick={next}
          />
        </div>
        <div className="contact-form">
          <h5 className="underline mt-5">Contact Information</h5>
          <form onSubmit={onSubmit}>
            <div className="mb-2">
              <p className="form-label">
                Samples (You may select more than one)
              </p>
              <Select
                options={sample_names}
                value={sample}
                onChange={v => handleSample(v)}
                required
              />
            </div>
            <Input
              type="text"
              name="name"
              value={name}
              onChange={handleInput}
              placeholder="Your Name"
              label="Your Name"
              required
            />
            <Input
              type="email"
              name="email"
              value={email}
              onChange={handleInput}
              placeholder="Your Email"
              label="Your Email"
              required
            />
            <Input
              type="tel"
              name="phone"
              value={phone}
              onChange={handleInput}
              placeholder="Phone"
              label="Phone"
              required
            />
            <FormTextarea
              type="text"
              name="question"
              value={question}
              onChange={handleInput}
              placeholder="How can we help? Providing a brief project description can ensure we send the most appropriate sample."
              label="Questions or Project Details:"
            />

            <h5 className="underline mt-4">Sample Shipping Address</h5>

            <Input
              type="text"
              name="street_address1"
              value={street_address1}
              onChange={handleInput}
              placeholder="Address Line 1"
              label="Strees Address"
              required
            />
            <Input
              type="text"
              name="street_address2"
              value={street_address2}
              onChange={handleInput}
              placeholder="Address Line 2"
              label="Address Line 2"
              required
            />
            <div className="select-group">
              <div className="mb-2">
                <p className="form-label">Country</p>
                <Select
                  options={countries}
                  value={country}
                  onChange={v => handleCountry(v)}
                  required
                />
              </div>
              <Input
                type="text"
                name="city"
                value={city}
                onChange={handleInput}
                placeholder="Project City"
                label="City"
                required
              />
            </div>
            <div className="select-group">
              <Input
                type="text"
                name="region"
                value={region}
                onChange={handleInput}
                placeholder="State"
                label="State / Province / Region"
                required
              />
              <Input
                type="text"
                name="postal"
                value={postal}
                onChange={handleInput}
                label="Zip Postal Code"
                required
              />
            </div>
            <button type="submit" className="btn-primary mt-4">
              Order a Sample
            </button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default OrderModal
