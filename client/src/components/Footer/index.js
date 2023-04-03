import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="text-center text-lg-start bg-dark text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom bg-dark">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>
        <div>
          <a href="" className="me-4 link-secondary">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="" className="me-4 link-secondary">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="" className="me-4 link-secondary">
            <i className="bi bi-google"></i>
          </a>
          <a href="" className="me-4 link-secondary">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="" className="me-4 link-secondary">
            <i className="bi bi-linkedin"></i>
          </a>
          <a href="" className="me-4 link-secondary">
            <i className="bi bi-github"></i>
          </a>
        </div>
      </section>

      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3 text-secondary"></i>Cool Beans
                Coffee
              </h6>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <a href="./Home" className="text-reset">
                  Home
                </a>
              </p>
              <p>
                <a href="./ShopAll" className="text-reset">
                  Shop All
                </a>
              </p>
              <p>
                <a href="./Contact" className="text-reset">
                  Contact
                </a>
              </p>
              <p>
                <a href="./Signup" className="text-reset">
                  Join
                </a>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i className="fas fa-home me-3 text-secondary"></i> Texas,
                Austin 617 Congress Ave.
              </p>
              <p>
                <i className="fas fa-envelope me-3 text-secondary"></i>
                CoolBeans@coolbeanscoffee.com
              </p>
              <p>
                <i className="fas fa-phone me-3 text-secondary"></i> + (512)
                476-1313
              </p>
              <p>
                <i className="fas fa-print me-3 text-secondary"></i> + (512)
                531-9417
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-4">
        © 2022 Copyright:{""}
        <a className="text-reset fw-bold">CoolBeansCoffee.CO</a>
      </div>
    </footer>
  );
};

export default Footer;
