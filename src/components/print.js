import React, {
  useEffect, useRef, useState, forwardRef,
} from 'react';
import { useReactToPrint } from 'react-to-print';

const ComponentToPrint = forwardRef(({ element }, ref) => {
  if (!element) {
    return <div>There is not a element to show</div>;
  }

  return (
    <div className="w-100 print-container" ref={ref}>
      <div
        ref={(newRef) => {
          if (newRef && element) {
            while (newRef.firstChild) {
              newRef.removeChild(newRef.firstChild);
            }

            newRef.appendChild(element);
          }
        }}
      />
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
    <div>
      <button className="btn btn-outline-primary" type="button" onClick={handlePrint}>
        Print
      </button>
      <div className="d-none">
        <ComponentToPrint ref={componentRef} element={element} />
      </div>
    </div>
  );
};

export default Print;
