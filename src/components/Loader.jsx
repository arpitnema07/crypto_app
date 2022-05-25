import React from "react";
import { Spin } from "antd";

const Loader = () => {
  return (
    <div className="loader">
      <Spin />
      <p style={{ marginLeft: 20, marginTop: 8 }}>Loading ...</p>
    </div>
  );
};

export default Loader;
