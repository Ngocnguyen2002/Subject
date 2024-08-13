import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Chính sách"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/LGend.png"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>Chính sách bảo mật thông tin cá nhân</p>
          <p>Chính sách và giao nhận thanh toán</p>
          <p>Chính sách và quy định chung</p>
          <p>Chính sách đổi trả sản phẩm</p>
          <p>Điều khoản mua bán</p>
          <p>Điều khoản sử dụng</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
