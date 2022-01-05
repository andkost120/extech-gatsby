import React, { useReducer, useCallback } from "react"
import Modal from "react-modal"
import validator from "validator"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FormRadio, FormInput } from "../../components/shared/FormControl"

const radioValues = [
  {
    value: "Architect",
    name: "Architect",
  },
  {
    value: "Contractor",
    name: "Contractor",
  },
  {
    value: "Facility Manager",
    name: "Facility Manager",
  },
  {
    value: "Glazing Subcontractor",
    name: "Glazing Subcontractor",
  },
  {
    value: "Student",
    name: "Student",
  },
]

const ShowModal = ({ prodName, show, onShow, file }) => {
  console.log(file)
  const [state, setState] = useReducer(
    (old, action) => ({ ...old, ...action }),
    {
      firstname: { value: "", error: "" },
      lastname: { value: "", error: "" },
      email: { value: "", error: "" },
      selectedOption: "",
    }
  )
  const { firstname, lastname, email, selectedOption } = state

  const handleFirstname = useCallback(e => {
    setState({
      firstname: {
        value: e.target.value,
        error: e.target.value.length >= 3 ? "" : "Length must be at least 3",
      },
    })
  }, [])
  const handleLastname = useCallback(e => {
    setState({
      lastname: {
        value: e.target.value,
        error: e.target.value.length >= 3 ? "" : "Length must be at least 3",
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
  const radioChanged = e => {
    setState({ selectedOption: e.target.value })
  }
  const handleShow = isShow => onShow(isShow)

  const onSubmit = async event => {
    event.preventDefault()
    axios
      .post(
        process.env.API_BASE_URL,
        {
          first_name: firstname.value,
          last_name: lastname.value,
          email: email.value,
          i_am: selectedOption,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(
        res => {
          const link = document.createElement("a")
          link.href = file
          link.setAttribute("download", file)
          // Append to html link element page
          document.body.appendChild(link)

          res.status === 200 || (res.status === 201 && link.click())
        },
        error => console.log("error: ", error)
      )
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Modal
      isOpen={show}
      onRequestClose={() => handleShow(false)}
      ariaHideApp={false}
      className="form-modal"
    >
      <div className="text-end">
        <FontAwesomeIcon
          icon={faTimes}
          onClick={() => handleShow(false)}
          onKeyDown={() => setSh(false)}
          role="presentation"
          className="fa-lg"
        />
      </div>
      <h4 className="txt-gold pre-wrap fw-bold mb-3">{prodName}</h4>
      <form onSubmit={onSubmit}>
        <FormInput
          type="text"
          name="firstname"
          value={firstname.value}
          error={firstname.error}
          onChange={handleFirstname}
          placeholder="First Name"
          label="First Name"
          required
        />
        <FormInput
          type="text"
          name="lastname"
          value={lastname.value}
          error={lastname.error}
          onChange={handleLastname}
          placeholder="Last Name"
          label="Last Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email.value}
          error={email.error}
          onChange={handleEmailChange}
          placeholder="Your Email"
          label="Your Email"
          required
        />
        <label className="form-label">I am a(n)</label>
        {radioValues.map((item, idx) => (
          <FormRadio
            key={idx}
            value={item.value}
            name={item.name}
            checked={selectedOption === item.value}
            onChange={radioChanged}
          />
        ))}
        <button className="btn-primary mt-3" type="submit">
          Get Download Link
        </button>
      </form>
    </Modal>
  )
}

export default ShowModal
