import { useState, createContext } from "react";

const StudyContext = createContext({
  showMenu: false,
  handleShowMenu: () => {},
  handleHideMenu: () => {},
});

export const StudyContextPrtovider = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenu = () => {
    setShowMenu(true);
  };
  const handleHideMenu = () => {
    setShowMenu(false);
  };
  return (
    <StudyContext.Provider value={{ showMenu, handleHideMenu, handleShowMenu }}>
      {children}
    </StudyContext.Provider>
  );
};
export default StudyContext;
