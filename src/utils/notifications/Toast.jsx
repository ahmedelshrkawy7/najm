import React from "react";
import { ToastContainer, toast } from "react-toastify";

const Toast = () => {
  // Optional: You can customize the toast appearance and behavior here

  return (
    <>
      <ToastContainer />
    </>
  );
};

export const successNotf = (title) =>
  toast.success(title, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

export const errorNotf = (title) =>
  toast.error(title, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

export const showToast = (message, options) => {
  toast(message, options);
};

export default Toast;
