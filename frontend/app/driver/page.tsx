import React from "react";
// import { driverPanelUrl } from "../../constants";
import Link from "next/link";

import imagedriver from "../../public/assets/images/driv-img.png";
import Image from "next/image";
function Driver() {
  // const navigateToDriverPanel = () => {
  //   window.location.href = driverPanelUrl;
  // };
  return (
    <>
      <div className="driver-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="abthead-text">
                <h1>
                  <span style={{ color: "#fff" }}>Drive with </span> Hitch Quick
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="drivertext-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="abthome-img">
                <Image src={imagedriver} alt="Driver image" />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="driver-text">
                <h2>Drive with Hitch Quick</h2>
                <p>
                  Join our community of drivers and start earning on your own
                  schedule. Whether you&apos;re&nbsp; looking to supplement your
                  income or make driving your full-time gig, we provide the
                  tools&nbsp; and support you need to succeed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="whychoos-section">
        <div className="conatiner">
          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="choos-text">
                <h2>Why Drive with Us?</h2>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-3 mb-3 ">
              <div className="cardbg">
                <div className="cardimgnew">
                  <img
                    src="assets/images/icon-4.png"
                    alt="Card image"
                    id="cardimgnew"
                  />
                </div>
                <div className="cardtext">
                  <h4>Flexibility</h4>
                  <p>
                    Work when you want, where you want. Be your own boss and set
                    your own hours.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-3 mb-3 ">
              <div className="cardbg">
                <div className="cardimgnew">
                  <img
                    src="assets/images/icon-5.png"
                    alt="Earn More image"
                    id="cardimgnew"
                    className="mt-3"
                  />
                </div>
                <div className="cardtext">
                  <h4>Earn More</h4>
                  <p>
                    With competitive rates and bonuses, you have the potential
                    to maximize your earnings.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-3 mb-3 ">
              <div className="cardbg">
                <div className="cardimgnew">
                  <img
                    src="assets/images/icon-3.png"
                    alt="Safety first image"
                    id="cardimgnew"
                    className="mt-3"
                  />
                </div>
                <div className="cardtext">
                  <h4>Safety First</h4>
                  <p>
                    Your safety is our priority. Benefit from our comprehensive
                    safety measures and support resources.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-3 mb-3 ">
              <div className="cardbg">
                <div className="cardimgnew">
                  <img
                    src="assets/images/icon-6.png"
                    alt="Driver support image"
                    id="cardimgnew"
                    className="mt-2"
                  />
                </div>
                <div className="cardtext">
                  <h4>Driver Support</h4>
                  <p>
                    Access 24/7 driver support and resources to help you thrive
                    on the road.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="requirment-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="choos-text">
                <h2>Requirements</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center mb-lg-5">
            <div className="col-lg-4 col-md-6 col-sm-4 mb-3">
              <div className="d-lg-flex">
                <div className="fleximg">
                  <img src="assets/images/icon-11.png" alt="License image" />
                </div>
                <div className="req-text px-lg-4">
                  <h4>Valid driver&apos;s license</h4>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-4 mb-3">
              <div className="d-lg-flex">
                <div className="fleximg">
                  <img
                    src="assets/images/icon-12.png"
                    alt="Clean driving image"
                  />
                </div>
                <div className="req-text px-lg-4">
                  <h4>Clean driving record</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 col-sm-4 mb-3">
              <div className="d-lg-flex">
                <div className="fleximg">
                  <img
                    src="assets/images/icon-13.png"
                    alt="Reliable vehicle image"
                  />
                </div>
                <div className="req-text px-lg-4">
                  <h4>Reliable vehicle</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="afterfooter-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-10 col-sm-12">
              <div className="readstr-text">
                <h3>Ready to Get Started?</h3>
                <p>
                  Joining Hitch Quick is easy. Sign up today and start driving
                  with us to unlock a world of earning opportunities.
                </p>
              </div>
              <div className="text-center">
                {/* <button type="button" className="btn btn-light px-5">
                  Sign Up
                </button> */}
                <Link
                  href=""
                  className="btn btn-light px-5"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Driver;
