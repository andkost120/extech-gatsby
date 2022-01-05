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
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Name"
        />
        <input
          type="email"
          className="form-control my-2"
          id="email"
          placeholder="Email"
        />
        <button type="submit" className="btn-third w-100">
          Confirm
        </button>
      </form>
    </section>
  )
}

export default Signup
