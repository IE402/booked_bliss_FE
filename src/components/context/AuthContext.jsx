import { createContext, useEffect, useState } from "react";
import { DisplayMode } from "../map/setUp";
export const AuthContext = createContext({
  currentUser: {},
  showUniversity: false,
  updateUniversity: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [showUniversity, setShowUniversity] = useState(false);

  const updateUser = (data) => {
    console.log(data);
    setCurrentUser(data);
  };

  const updateUniversity = (data) => {
    setShowUniversity(data);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser,updateUser, showUniversity, updateUniversity }}>
      {children}
    </AuthContext.Provider>
  );
};