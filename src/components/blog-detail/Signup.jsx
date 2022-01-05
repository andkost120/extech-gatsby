import React from "react"

const Signup = () => {
  return (
    <section className="widget-signup">
      <h5>Sign-up for our Newsletter</h5>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ipsum
        ipsum, semper at accumsan convallis, hendrerit nec ante. Donec placerat
        finibus convallis.
      </p>
      <form className="my-3">
        <div className="row align-items-center">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Name"
            />
          </div>
          <div className="col-md-4 my-2">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
            />
          </div>
          <div className="col-md-4">
            <button type="submit" className="btn-third w-100">
              Confirm
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default Signup
