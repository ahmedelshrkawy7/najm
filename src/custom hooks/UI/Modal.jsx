import React from "react";

const Modal = ({ children }) => {
  return (
    <div className="w-full z-[9999] h-full fixed top-0 left-0 bg-[rgba(0,0,0,0.4)]">
      {children}
    </div>
  );
};

export default Modal;
