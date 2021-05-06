import Booker from "components/Booker";
import Layout from "components/ui/Layout";
import React from "react";

const IndexPage = () => {
  return (
    <Layout>
      <div style={{ padding: 30 }}>
        <h1>Buy a book!</h1>
        <Booker />
      </div>
    </Layout>

  );
};

export default IndexPage;
