import React, { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext([null, (user) => user]);

UserContext.displayName = "AsitContext";

export const UserProvider = ({ value, children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(value);
  }, [value]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
