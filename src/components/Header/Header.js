import "./Header.css";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link className="title" to="/">
        HU Do You Know ?
      </Link>
      <hr className="divider" />
    </div>
  );
};

export default Header;
