import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"Về myskin"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/LGend.png"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          Myskin - sàn thương mại điện tử chuyên cung cấp các sản phẩm về mỹ phẩm chính hãng uy tín và dịch vụ chăm sóc khách hàng tận tâm. Bạn có thể hoàn toàn yên tâm lựa chọn một bộ sản phẩm phù hợp và ưng ý.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
