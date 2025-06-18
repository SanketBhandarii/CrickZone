import React from "react";
import { NavLink } from "react-router-dom";

const Toast = () => {
  return (
    <span>
      Check out the latest news{" "}
      <NavLink
        to="/currentnews"
        style={{
          color: "lightblue",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        here
      </NavLink>
    </span>
  );
};

export default Toast;
