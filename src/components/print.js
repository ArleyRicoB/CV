import React, {
  useRef, forwardRef,
} from 'react';
import { useReactToPrint } from 'react-to-print';

const ComponentToPrint = forwardRef(({ element }, ref) => {
  if (!element) {
    return <div>There is not a element to show</div>;
  }

  return (
    <div className="d-flex" ref={ref}>
      {element}
    </div>
  );
});

const Print = ({ children }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div>
        <ComponentToPrint ref={componentRef} element={children} />
      </div>
      <button
        type="button"
        className="bg-gray-500 border border-gray-500 p-2 mb-4"
        onClick={handlePrint}
      >
        Print
      </button>
    </div>
  );
};

export default Print;
