import React from "react";
import { NavLink } from "react-router-dom";

function PageSubTitle({ pageTitle, buttonTitle, navigateTo }) {
  return (
    <div className="d-block d-lg-flex d-md-flex justify-content-between action-bar mb-20 mt-3">
      <div id="table-actions" className="flex-grow-1 align-items-center">
        <h4 className=" mb-0 f-21 text-capitalize font-weight-bold">
          {pageTitle}
        </h4>
      </div>
      {buttonTitle && (
        <div
          className="btn-group mt-2 mt-lg-0 mt-md-0 ml-0 ml-lg-3 ml-md-3"                  
          role="group"
        >             
          <NavLink
            to={navigateTo}
            type="button"
            className="btn-secondary rounded f-14 p-2 mr-3 float-left mb-2 mb-lg-0 mb-md-0"
            id="add-lead"      
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>{" "}
            {buttonTitle}
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default PageSubTitle;
