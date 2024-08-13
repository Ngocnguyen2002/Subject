import React from "react";
import { Link } from "react-router-dom";
import Layout from "./../components/Layout/Layout";

const Pagenotfound = () => {
  return (
    <Layout title={"Không tìm thấy trang"}>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops ! Không tìm thấy trang</h2>
        <Link to="/" className="pnf-btn">
          Quay lại
        </Link>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
