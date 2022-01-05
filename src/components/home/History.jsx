import React from "react"
import { Company } from "../../utils/imgLoader"

const histories = [
  {
    type: "Own\nPatents",
    years: 17,
    more: false,
  },
  {
    type: "Years\nin Business",
    years: 46,
    more: false,
  },
  {
    type: "Extrusion\nProfiles",
    years: 500,
    more: true,
  },
  {
    type: "Unique\nProjects",
    years: 3500,
    more: true,
  },
]

const History = () => {
  return (
    <section className="section-history">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 history ">
            {histories.map((item, index) => (
              <div className="history-item" key={index}>
                <h1
                  className={
                    item.more === true
                      ? "active txt-blue hero"
                      : "txt-blue hero"
                  }
                >
                  {item.years}
                </h1>
                <h4 className="txt-gray text-start ms-4">{item.type}</h4>
              </div>
            ))}
          </div>
          <div className="col-sm-6 company">
            <img src={Company} alt="company" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default History
