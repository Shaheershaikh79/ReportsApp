"use client";
import React from "react";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";

function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",

    services: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  console.log(formData, "formData");

  // const [CreateContact, { data }] = useGetContactAPIMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="pagesbanner-section">
        {/* <Helmet> */}
        <title>Contact Hitch Quick | Book Your Ride or Get Support Today</title>
        <meta
          name="description"
          content="Get in touch with Hitch Quick for booking, inquiries, or support. Reach us by phone, email, or use
our easy contact form. Located in Bloomington, MN."
        />
        {/* </Helmet> */}
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="text-center bannnertext">
                <h1>Contact Us </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="abt-section">
        <div className="container">
          <div className="row justify-content-around align-items-center">
            <div className="col-xl-7 col-sm-12 mb-3">
              <div className="cont-text mb-3">
                <h3>Contact Form</h3>
              </div>
              <div className="formbg">
                <form className="row" action="" onSubmit={submitHandler}>
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="" className="form-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.firstName}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="" className="form-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        onChange={handleChange}
                        value={formData.lastName}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="" className="form-label">
                        Your Email Address
                      </label>
                      <input
                        type="Email"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.email}
                        name="email"
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="" className="form-label">
                        Your Interest of services
                      </label>
                      <input
                        type="tel"
                        name="services"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.services}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 mb-3">
                    <div className="form-group">
                      <label htmlFor="" className="form-label">
                        Your Message
                      </label>
                      <textarea
                        className="form-control"
                        name="message"
                        rows={5}
                        defaultValue={""}
                        onChange={handleChange}
                        value={formData.message}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <CustomButton
                      title={"Submit Now"}
                      isLoading={false}
                      className="btn btn-secondary"
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="col-xl-4 col-sm-12">
              <div className="cont-text">
                <h3>Get In Touch</h3>
                <p>You can contact us here</p>
                <h6>Phone:</h6>
                <p>(612) 990-0009</p>
                <h6>Email:</h6>
                <p>info@hitch-quick.com</p>
                <h6>Address Line:</h6>
                <p>
                1234 Maple St,
                Minneapolis,  <br /> MN 55401.
                 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
