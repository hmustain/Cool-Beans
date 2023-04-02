import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import "../styles/form.css";
import Nav from "../components/NavTabs";
import Cart from "../components/Cart";
import { Link } from "react-router-dom";
function ContactForm() {
  const [state, handleSubmit] = useForm("xayzpyor");
  if (state.succeeded) {
    return (
    <div>
     
      <h1 className="thanks">Thanks for your feedback!<br></br>Back to home page click <Link to="/home">Me</Link></h1>;
      </div>
    )
  }
  return (
    <>
      <div className="ContactContainer">
        <Nav />
        <section className="contact-page">
          <div className="col-md-5 m-2">
            <ul className="list-unstyled ">
              <li>
                <p className="info-headers">Contact our Customer Support:</p>
                <br />
                <p className="info-paragraph">
                  If you would like to discuss any problems related to your
                  order, would like to find out more about the brand, or simply
                  have a chat, please fill out the form on this page, or give us
                  an email at hi@buzzcoffee.com
                </p>
              </li>

              <li>
                <p className="info-headers">Collaborations:</p>
                <p className="info-paragraph">
                  If you are interested in working with Buzz Coffee please
                  contact business@buzzcoffee.com:
                </p>
                <br />
              </li>

              <li>
                <p className="info-headers">Products</p>
                <p className="info-paragraph">
                  View all of our products <Link to="/home">here</Link>
                </p>
              </li>
            </ul>
          </div>
          <div className="contact-form row col-md-4 m-2  ">
            <form className="" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="info-headers-form">
                  Name
                </label>
                <input
                  name="name"
                  id="name"
                  type="name"
                  placeholder="name"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="info-headers-form">
                  Email
                </label>
                <input
                  className="form-control"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="info-headers-form">
                  Message
                </label>
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  placeholder="Tell us about it"
                />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                />
              </div>
              <button
                className="btn btn-dark send-button"
                type="submit"
                disabled={state.submitting}
              >
                Send<i className="bi bi-send"></i>
              </button>
            </form>
          </div>
        </section>
        <Cart />
      </div>
    </>
  );
}

export default ContactForm;
