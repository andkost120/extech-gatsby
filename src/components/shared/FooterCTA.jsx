import React, { useState } from "react"
import OrderModal from "./OrderModal"
import QuoteModal from "./QuoteModal"

const FooterCTA = ({ page }) => {
  const [showOrder, setShowOrder] = useState(false)
  const [showQuote, setShowQuote] = useState(false)

  const handleShowOrder = isShow => setShowOrder(isShow)
  const handleShowQuote = isShow => setShowQuote(isShow)

  return (
    <section className={"section-cta " + page}>
      {page !== "home" && <div className="blue-layer"></div>}
      <div className="container position-relative">
        <div className="row">
          <div className="col-lg-7">
            <h2 className={page !== "home" ? "text-white" : "text-black"}>
              EXTECH is committed to collaboration, innovation, and exceptional
              engineering.
            </h2>
          </div>
          <div className="col-lg-5 btn-group">
            <button
              className={page !== "home" ? "btn-third me-3" : "btn-second me-3"}
              onClick={() => setShowOrder(true)}
            >
              Order a sample
            </button>
            <button
              className={page !== "home" ? "btn-fourth" : "btn-primary"}
              onClick={() => setShowQuote(true)}
            >
              Quote request
            </button>
          </div>
        </div>
      </div>
      <OrderModal show={showOrder} onShow={handleShowOrder} />
      <QuoteModal show={showQuote} onShow={handleShowQuote} />
    </section>
  )
}

export default FooterCTA
