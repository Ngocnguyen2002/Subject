import React from "react";
import Layout from "./../components/Layout/Layout";
const Contact = () => {
  return (
    <Layout title={"Liên hệ"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/LGend.png"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">LIÊN HỆ</h1>
          <p className="text-justify mt-2">
          Nếu bạn có bất kỳ câu hỏi, thắc mắc cần giải đáp vui lòng liên hệ với chúng tôi bất cứ lúc nào!
          </p>
          <p className="mt-3">
             www.help@myskin.com
          </p>
          <p className="mt-3">
            012-3456789
          </p>
          <p className="mt-3">
            1800-0000-0000
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
