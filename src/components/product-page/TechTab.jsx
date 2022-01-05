import React, { useState } from "react"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import ShowModal from "./ShowModal"

const DownloadItem = ({ data, prodName }) => {
  const [show, setShow] = useState(false)

  const handleShow = isShow => setShow(isShow)

  return (
    <>
      {data.map((item, idx) => (
        <div className="download" key={idx}>
          <div className="download-info">
            <p className="file-name">{item.title}</p>
            <p className="file-content">{item.description}</p>
          </div>
          {/* <a
            className="btn-second"
            href={item.file.url}
            target="_blank"
            rel="noreferrer"
          >
            Download
          </a> */}
          <button className="btn-second" onClick={() => handleShow(true)}>
            Download
          </button>
          <ShowModal
            prodName={prodName}
            show={show}
            onShow={handleShow}
            file={item.file.url}
          />
        </div>
      ))}
    </>
  )
}
const TechTab = ({ list, info, prodName }) => {
  const [tabIndex, setTabIndex] = useState(0)
  return (
    <div className="tech-info__tab">
      <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
        <TabList>
          {list.map((item, idx) => (
            <Tab key={idx}>{item.label}</Tab>
          ))}
        </TabList>
        {Object.keys(info).map((key, index) => (
          <TabPanel key={index}>
            <DownloadItem data={info[key]} prodName={prodName} />
          </TabPanel>
        ))}
      </Tabs>
    </div>
  )
}

export default TechTab
