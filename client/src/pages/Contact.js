import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import "../styles/form.css";

function ContactForm() {
  const [state, handleSubmit] = useForm("xayzpyor");
  if (state.succeeded) {
    return <p>Thanks for joining!</p>;
  }
  return (
    <section className="contact-page">
      <div className="col-md-3 text-center">
        <ul className="list-unstyled mb-0">
          <li>
            <p>Contact our Customer Support:</p>
            <br />
            <p>
              If you would like to discuss any problems related to your order,
              would like to find out more about the brand, or simply have a
              chat, please fill out the form on this page, or give us an email
              at hi@buzzcoffee.com
            </p>
          </li>

          <li>
            <p>Collaborations:</p>
            <p>
              If you are interested in working with Buzz Coffee please contact
              business@buzzcoffee.com:
            </p>
            <br />
          </li>

          <li>
            <p>Products</p>
            <p>
              View all of our products <a href="./home">here</a>
            </p>
          </li>
        </ul>
      </div>
      <div className="contact-form row">
        <form className="" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              id="name"
              type="name"
              placeholder="name"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Message</label>
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
          <a
            className="btn btn-dark send-button"
            type="submit"
            disabled={state.submitting}
          >
            Send<i class="bi bi-send"></i>
          </a>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
