import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

const ComponentToPrint = ({ element }) => (
  <div className="d-flex">
    <h1>Hello world</h1>
    <div>{element || "any"}</div>
  </div>
);

const Print = ({ element }) => {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <ComponentToPrint ref={componentRef} element={element} />
    </div>
  );
};

export default Print;
