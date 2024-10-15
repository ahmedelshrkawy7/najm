/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, useImperativeHandle, useRef } from "react";

const Model = forwardRef(({ children, ...props }, ref) => {
  const dialogRef = useRef(null);

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }));
  console.log("dialouge is opened");

  return (
    <>
      <dialog
        ref={dialogRef}
        className="dialog fixed top-0 min-w-full min-h-full bg-black/50 !z-[2000] !overflow-visible"
        // className=" backdrop:bg-black/50"
        // open
        onClick={(e) => {
          if (
            props.innerRef?.current.parentElement === e.target &&
            props.currentView !== "default"
          ) {
            e.stopPropagation();

            ref.current.close();
            props.setCurrentView("default");
          }
        }}
      >
        {children}
      </dialog>
    </>
  );
});

export default Model;
