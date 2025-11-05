import React from "react";

function CustomButton(props) {
  const { title, isLoading, icon } = props;
  return (
    <button className="btn btn-primary" disabled={isLoading} {...props}>
      {icon} {title}
    </button>
  );
}

export default CustomButton;
