import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { PROFILE_URL } from "../config/api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${PROFILE_URL}`, { withCredentials: true });

      if (res && res.data.success) {
        setUser(res.data.user);
      }
    };
    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
