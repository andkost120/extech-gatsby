import React, { useState } from "react"
import { Link } from "gatsby"
import { Minus, Plus } from "../../utils/imgLoader"

const FAQSection = ({ questions }) => {
  const [activeIdx, setActiveIdx] = useState(-1)
  return (
    <section className="faq">
      <div className="container">
        <h6 className="kicker-text txt-gold">LIGHTWALL 3440®</h6>
        <h1 className="faq-head">Frequency Asked Questions</h1>
        <div className="faq-body">
          {questions?.map(({ question, answer }, idx) => (
            <div
              className={idx === activeIdx ? "faq-item active" : "faq-item"}
              key={idx}
              onClick={() => {
                if (idx === activeIdx) setActiveIdx(-1)
                else setActiveIdx(idx)
              }}
              onKeyDown={() => {
                if (idx === activeIdx) setActiveIdx(-1)
                else setActiveIdx(idx)
              }}
              role="presentation"
            >
              <div className="d-flex justify-content-between">
                <h4 className="faq-item__title position-relative">
                  {question}
                </h4>
                {idx === activeIdx ? (
                  <img src={Minus} alt="minus" />
                ) : (
                  <img src={Plus} alt="plus" />
                )}
              </div>
              <p className="faq-item__content">{answer}</p>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-sm-6">
            <h2 className="text-black">
              Didn’t find the answer to your question?{" "}
            </h2>
            <h6 className="txt-gray">
              Ask our experts, or leave a request and we’ll call you back within
              one buisness day.
            </h6>
          </div>
          <div className="col-sm-6 btn-group">
            <Link className="btn-second me-3" to="/">
              Request a Callback
            </Link>
            <Link className="btn-primary" to="/">
              Ask a Question
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
