import React, { useEffect, useRef, useState, forwardRef } from "react";
import { useReactToPrint } from "react-to-print";

const ComponentToPrint = forwardRef(({ element }, ref) => {
  if (!element) {
    return <div>There is not a element to show</div>;
  }

  return (
    <div className="d-flex" ref={ref}>
      <div
        ref={(ref) => {
          if (ref && element) {
            while (ref.firstChild) {
              ref.removeChild(ref.firstChild);
            }

            ref.appendChild(element);
          }
        }}
      ></div>
    </div>
  );
});

const Print = ({ id }) => {
  const [element, setElement] = useState(null);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    const node = document.getElementById(id);

    if (node) {
      const elementToRender = node.cloneNode(true);
      setElement(elementToRender);
    }
  }, []);

  return (
    <div className="bg-gray-200 p-6">
      <button
        type="button"
        className="bg-gray-500 border border-gray-500 p-2 mb-4"
        onClick={handlePrint}
      >
        Print
      </button>
      <div style={{ display: "none" }}>
        <ComponentToPrint ref={componentRef} element={element} />
      </div>
    </div>
  );
};

export default Print;
