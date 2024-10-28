import React from "react";
import { PhoneOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const CardWrapper = ({ title, children, icon, note }) => {
  return (
    <>
      <div className="flex mr-6  gap-2 items-center m-8   rounded-full">
        <div className="h-12 w-12 bg-[#33835C1A] flex items-center justify-center rounded-full">
          {icon}
        </div>
        <h2 className="text-lg self-center  font-semibold">{title}</h2>
        {note && (
          <Tooltip title={note}>
            <ExclamationCircleOutlined
              style={{ color: "red", marginLeft: "8px", cursor: "pointer" }}
            />
          </Tooltip>
        )}
      </div>
      <div className="border border-gray-300 rounded-lg  px-6 pb-3">
        {children}
      </div>
    </>
  );
};

export default CardWrapper;
