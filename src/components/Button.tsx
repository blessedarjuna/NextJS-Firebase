import { SubmitButtonT } from "@/types/ButtonTypes";
import React from "react";

// const SubmitButton: React.FC<SubmitButtonT> = ({ label, ...rest }) => {
//     return (
//       <div className="flex justify-center mt-6 mb-3">
//         <button {...rest} className="bg-blue-500 rounded-md py-2 px-3 text-white">
//           {label}
//         </button>
//       </div>
//     );
//   };
const SubmitButton: React.FC<SubmitButtonT> = ({ label, ...rest }) => {
    return (
      <div className="flex justify-center mt-6 mb-3">
        <button
          {...rest}
          className="bg-blue-600 border-0 rounded-full text-white cursor-pointer inline-block font-sans text-lg font-semibold outline-none py-4 px-6 relative text-center no-underline transition-all duration-300 select-none touch-manipulation before:bg-gradient-to-b before:from-white before:to-transparent before:rounded-full before:content-[''] before:h-1/2 before:left-1 before:opacity-50 before:absolute before:top-0 before:transition-all before:duration-300 before:w-11/12 hover:shadow-inner-white-20 hover:scale-105 md:py-4 md:px-12"
          >
          {label}
        </button>
      </div>
    );
  };

export default SubmitButton;