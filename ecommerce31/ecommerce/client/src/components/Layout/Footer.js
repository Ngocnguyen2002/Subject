import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <h1 className="text-center">My skin &copy; Chính hãng</h1>
      <p className="text-center mt-3">
        <Link to="/about">Về myskin</Link>|<Link to="/contact">Liên hệ</Link>|
        <Link to="/policy">Chính sách</Link>
      </p>
    </div>
  );
};

export default Footer;
