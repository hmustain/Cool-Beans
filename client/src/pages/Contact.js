import React from "react";
import { useForm, ValidationError } from "@formspree/react";
function ContactForm() {
  const [state, handleSubmit] = useForm("xayzpyor");
  if (state.succeeded) {
    return <p>Thanks for joining!</p>;
  }
  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input className="form-control" id="email" type="email" name="email" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Leave a message!</label>
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <textarea className="form-control" id="message" name="message" />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </div>
      <button
        className="btn btn-primary"
        type="submit"
        disabled={state.submitting}
      >
        Submit
      </button>
    </form>
  );
}

export default ContactForm;
