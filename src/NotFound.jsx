import React from "react";

const NotFound = ({ msg }) => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-80px)]">
      <h2 className="text-red-500 font-bold text-2xl capitalize">
        {msg} Not found
      </h2>
    </div>
  );
};

export default NotFound;
