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
      className="fixed top-0 min-w-full min-h-full bg-black/50 z-[999]"
    >
      {children}
    </dialog>
  );
});

export default Model;
