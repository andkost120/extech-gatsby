import React, { useState } from "react"
import Select from "react-select"
import ShowModal from "./ShowModal"
import { Download } from "../../utils/imgLoader"

const Techselect = ({ list, info, prodName }) => {
  const [tech, setTech] = useState(list[0])
  const [show, setShow] = useState(false)

  const handleClick = v => {
    setTech(v)
  }
  const handleShow = isShow => setShow(isShow)

  return (
    <div className="tech-info__select">
      <Select options={list} value={tech} onChange={v => handleClick(v)} />
      {info[tech.value].map((item, idx) => (
        <div className="download" key={idx}>
          <div className="download-info">
            <p className="file-name">{item.title}</p>
            <p className="file-content">{item.description}</p>
          </div>
          <button className="btn-second" onClick={() => handleShow(true)}>
            <img src={Download} alt="download" />
          </button>
          <ShowModal
            prodName={prodName}
            show={show}
            onShow={handleShow}
            file={item.file.url}
          />
        </div>
      ))}
    </div>
  )
}

export default Techselect
