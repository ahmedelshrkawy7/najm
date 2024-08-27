/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, useImperativeHandle, useRef } from "react";

const Model = forwardRef(({ children }, ref) => {
  const dialogRef = useRef(null);

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }));
  return (
    <dialog
      ref={dialogRef}
      className="fixed top-0 w-full h-full bg-black/50 z-50"
      open
    >
      {children}
    </dialog>
  );
});

export default Model;
