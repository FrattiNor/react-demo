import React, { useState, useEffect, Fragment } from "react";
import { isPromise } from "@/util";

const GetComponent = ({ load, ...rest }) => {
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    if (isPromise(typeof load === "function" && load())) {
      load().then(res => {
        setComponent(
          res.default && typeof res.default === "function" && res.default
        );
      });
    }
  }, [load]);

  return <Fragment>{Component}</Fragment>;
};

export default GetComponent;
