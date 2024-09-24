import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const breadCrumbItems = [
  {
    title: (
      <div className="flex gap-2 text-gray-500">
        <img src="../src/assets/icons/homeBG.png" />
        <span>الرئيسية</span>
      </div>
    ),
    path: "/",
  },
  {
    title: " مسؤول البلاغات ",
    path: "/reportsPage",
  },
];
const BreadCrumbContext = createContext({
  items: [],
  addBreadCrumb: (item) => {},
});

export const BreadCrumbContextProvider = ({ children }) => {
  const [items, setItems] = useState(breadCrumbItems);

  const addBreadCrumb = (item) => {
    setItems([...breadCrumbItems, item]);
  };
  return (
    <BreadCrumbContext.Provider
      value={{
        items: items,
        addBreadCrumb: addBreadCrumb,
      }}
    >
      {children}
    </BreadCrumbContext.Provider>
  );
};
export default BreadCrumbContext;
