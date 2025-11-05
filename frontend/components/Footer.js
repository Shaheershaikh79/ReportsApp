import React from "react";
import Link from "next/link";

import { IoMdMail } from "react-icons/io";
import {
  FaChevronRight,
  FaMapMarkerAlt,
  FaFacebookSquare,
  FaTwitterSquare,
  FaLinkedin,
} from "react-icons/fa";

import { GiWorld } from "react-icons/gi";
// import { useSelector } from "react-redux";
import Logo from "../app/assets/new-images/header-logo.png";
import Image from "next/image";

const tempGeneralSettings = {
  contactNumber: "(612) 427-8888",
  contactEmail: "info@hitchquick.com",
  website: "www.hitchquick.com",
  address: "8900 Penn Ave S Suite:309,Bloomington, MN 55431",
};

function Footer() {
  return (
    <div className="footer-section">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="footer-logo mb-4">
              <Link href="/">
                {/* <Image src={Logo} alt="Footer logo" id="footerlogo" /> */}
                <h2>Hitch Quick</h2>
              </Link>
            </div>
          </div>
          <div className="col-md-2">
            <div className="footer-menu">
              <h4>Company</h4>
            </div>
            <div className="footer-menu">
              <ul>
                <li>
                  <FaChevronRight />
                  <Link href="/contact-us">Home</Link>
                </li>
                <li>
                  <FaChevronRight />
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <FaChevronRight />
                  <Link href="/services">Services</Link>
                </li>
                <li>
                  <FaChevronRight />
                  <Link href="/contact-us">Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
          {/* <div className="col-md-2">
            <div className="footer-menu">
              <h4>Products</h4>
            </div>
            <div className="footer-menu">
              <ul>
                <li>
                  <FaChevronRight />
                  <Link href="#">Riders</Link>
                </li>
                <li>
                  <FaChevronRight />
                  <Link href="#">Drivers</Link>
                </li>
                <li>
                  <FaChevronRight />
                  <Link href="#">Help Center</Link>
                </li>
              </ul>
            </div>
          </div> */}
          <div className="col-md-4">
            {/* <div className="footer-menu">
              <h4>Contact Us</h4>
            </div> */}
            {/* <div className="footer-menu">
              <ul>
                <li>
                  <i className="fa fa-envelope" id="foot-icon"></i>
                  <Link href="#">info@hitchquick.com</Link>
                </li>
                <li>
                  <i className="fa fa fa-globe" id="foot-icon"></i>
                  <Link href="#">www.hitchquick.com</Link>
                </li>
                <li>
                  <i className="fa fa fa-map-marker" id="foot-icon"></i>
                  <Link href="#">
                    8900 Penn Ave S #309,
                    <br /> Bloomington, MN 55431
                  </Link>
                </li>
              </ul>
            </div> */}

            <div className="footer-menu">
              <ul>
                {/* <li
                  onClick={() =>
                    handleLinkClick(
                      "phone",
                      generalSettings
                        ? generalSettings.contactNumber
                        : tempGeneralSettings.contactNumber
                    )
                  }
                >
                  <BsFillTelephoneFill />{" "}
                  <Link href="#">
                    {generalSettings
                      ? generalSettings.contactNumber
                      : tempGeneralSettings.contactNumber}
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
          <div className="col-md-12">
            <div className="footer-border"></div>
          </div>
          <div className="row">
            <div className="footer-botm">
              <div className="fbotm-text">
                <p>© {new Date().getFullYear()} Hitch Quick Technology Inc.</p>
              </div>
              <div className="fbotm-text">
                {/* <ul>
                  <li>
                    <Link href="/privacy-policy">Terms of Service</Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                  </li>
                </ul> */}
              </div>
              <div className="footer-soc">
                <ul>
                  <li>
                    <Link href="#">
                      <FaFacebookSquare />
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <FaTwitterSquare />
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <FaLinkedin />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
