import React, { useState, useCallback, useRef, useReducer } from "react"
import { Modal } from "react-bootstrap"
import useFileUpload from "react-use-file-upload"
import Select from "react-select"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FormTextarea, Input } from "../../components/shared/FormControl"
import { jobs, countries } from "../../utils/staticData"
import { Close } from "../../utils/imgLoader"

const QuoteModal = ({ show, onShow }) => {
  const [country, setCountry] = useState(countries[0])
  const [job, setJob] = useState(jobs[0])

  const [state, setState] = useReducer(
    (old, action) => ({ ...old, ...action }),
    {
      name: "",
      phone: "",
      email: "",
      project: "",
      project_address1: "",
      project_address2: "",
      city: "",
      region: "",
      postal: "",
      request: "",
      notes: "",
      bid_rate: "",
    }
  )
  const {
    name,
    phone,
    email,
    project,
    project_address1,
    project_address2,
    city,
    region,
    postal,
    request,
    notes,
    bid_rate,
  } = state

  const handleInput = useCallback(e => {
    e.preventDefault()
    setState({ [e.target.name]: e.target.value })
  }, [])
  const handleShow = isShow => {
    onShow(isShow)
  }
  const handleCountry = value => {
    setCountry(value)
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

  const {
    files,
    fileNames,
    fileTypes,
    totalSize,
    totalSizeInBytes,
    handleDragDropEvent,
    clearAllFiles,
    setFiles,
    removeFile,
  } = useFileUpload()

  const inputRef = useRef()
  return (
    <Modal show={show} onHide={() => handleShow(false)}>
      <Modal.Body>
        <div className="d-flex justify-content-end">
          <img
            className="close"
            src={Close}
            alt="close"
            onClick={() => handleShow(false)}
            onKeyDown={() => handleShow(false)}
            role="presentation"
          />
        </div>
        <h1>QUOTE REQUEST</h1>
        <p className="mt-3 mb-4">Complete this form to request a quote.</p>
        <div className="contact-form">
          <h5 className="underline mt-4">Contact Information</h5>
          <form onSubmit={onSubmit}>
            <Input
              type="text"
              name="request"
              value={request}
              onChange={handleInput}
              placeholder="Title of your request"
              label="Title"
              required
            />
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
            <div className="mb-2">
              <p className="form-label">I am(n)</p>
              <Select
                options={jobs}
                value={job}
                onChange={v => handleJob(v)}
                required
              />
            </div>

            <h5 className="underline mt-4">Project Details</h5>
            <Input
              type="text"
              name="project"
              value={project}
              onChange={handleInput}
              placeholder="Enter Project Name"
              label="Project Name"
              required
            />
            <Input
              type="text"
              name="project_address1"
              value={project_address1}
              onChange={handleInput}
              placeholder="Address Line 1"
              label="Project Address"
              required
            />
            <Input
              type="text"
              name="project_address2"
              value={project_address2}
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
            <h5 className="underline mt-4">Additional Information</h5>
            <Input
              type="number"
              name="bid_rate"
              value={bid_rate}
              onChange={handleInput}
              placeholder="Enter Bid Rate"
              label="Bid Rate"
              required
            />
            <FormTextarea
              type="text"
              name="notes"
              value={notes}
              onChange={handleInput}
              placeholder="What should we know about this project?"
              label="Project Notes"
            />
            <p className="form-label">Project Files</p>
            <div
              className="file-upload"
              onDragEnter={handleDragDropEvent}
              onDragOver={handleDragDropEvent}
              onDrop={e => {
                handleDragDropEvent(e)
                setFiles(e, "a")
              }}
              role="presentation"
            >
              <p>Drop files here or</p>
              <button
                className="btn-second my-2"
                onClick={() => inputRef.current.click()}
              >
                Select Files
              </button>
              <p>
                Upload drawings and/or specifications. <br />
                (.pdf format is preferred)
              </p>
              <input
                ref={inputRef}
                type="file"
                multiple
                style={{ display: "none" }}
                onChange={e => setFiles(e, "a")}
              />
            </div>
            <div className="file-list">
              <ul>
                {fileNames.map(name => (
                  <li key={name}>
                    <strong className="me-2">{name}</strong>
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      onClick={() => removeFile(name)}
                      className="text-danger"
                    />
                  </li>
                ))}
              </ul>
              {files.length > 0 && (
                <ul className="mt-2">
                  <li>
                    <span className="fw-bold">File types found:&nbsp;</span>
                    {fileTypes.join(", ")}
                  </li>
                  <li>
                    <span className="fw-bold">Total Size:&nbsp;</span>
                    {totalSize}
                  </li>
                  <li>
                    <span className="fw-bold">Total Bytes:&nbsp;</span>
                    {totalSizeInBytes}
                  </li>
                  <li className="clear-all">
                    <button
                      className="btn-danger"
                      onClick={() => clearAllFiles()}
                    >
                      Clear All
                    </button>
                  </li>
                </ul>
              )}
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

export default QuoteModal
