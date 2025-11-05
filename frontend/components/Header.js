import React from "react";
import Link from "next/link";
import header from "../app/assets/new-images/header-logo.png";
import Image from "next/image";

function Header() {
  return (
    <>
      {/* <div className="topbar-section">
        <nav
          className="navbar navbar-expand-lg navbar-light d-lg-block bg-dark"
          id="templatemo_nav_top"
        >
          <div className="container text-light">
            <div className="w-100 d-flex justify-content-end">
              <div className="list-inline">
                <ul>
                  <li>
                    <Link to="/login">log In</Link>
                  </li>
                  <li className="border-end  mx-3" />
                  <li>
                    <Link to="signup.html">Sign Up</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div> */}
      <div className="hitchquick-header-section">
        <div className="axistify-header">
          <div className="container">
            <div className="row align-items-center ">
              <div className="col-md-6">
                <div className="tophead-text">
                  <span className="d-none d-md-block">
                    <a
                      href="mailto:info@hitchquick.com"
                      className="text-white text-decoration-none"
                    >
                      <i className="fa fa-envelope mx-3 ico-col" />
                      info@hitch-quick.com
                    </a>
                  </span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="element">
                  <ul className="header-top-nav list-inline">
                    <li className="menu-item">
                      <span>
                        <a
                          href={``}
                          target="_blank"
                          rel="noreferrer"
                          className="text-white text-decoration-none"
                        >
                          <i className="fa fa-map-marker mx-3 ico-col" />
                          1234 Maple St,
                          Minneapolis, MN 55401.                        </a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="hitchquick-header-img">
              <nav className="navbar navbar-expand-lg navbar-dark bg-black">
                <div className="container">
                  {/* Logo */}
                  <Link href="/" className="navbar-brand">
                    {/* <Image src={header} alt="Logo" id="logsedf" /> */}
                    <h3 className="font-bold">Hitch Quick</h3>
                  </Link>
                  {/* Toggle button for small screens */}
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon" />
                  </button>
                  {/* Navbar links */}
                  <div
                    className="collapse navbar-collapse justify-content-center"
                    id="navbarSupportedContent"
                  >
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <Link className="nav-link" href="/">
                          Home
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" href="/about">
                          About Us
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" href="/our-services">
                          Our Services
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" href="/contact-us">
                          Contact Us
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
