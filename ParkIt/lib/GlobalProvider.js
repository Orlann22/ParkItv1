import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"; // To communicate with your Node.js API

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to check the current user session
  const getCurrentUser = async () => {
    try {
      const response = await axios.get("http://192.168.82.231:3000/session", {
        withCredentials: true, // To send cookies for session management
      });
      if (response.data.loggedIn) {
        setIsLogged(true);
        setUser(response.data.user);
      } else {
        setIsLogged(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
      setIsLogged(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

//   // Function to log in a user
//   const login = async (email, password) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/signin",
//         { email, password },
//         { withCredentials: true }
//       );
//       setIsLogged(true);
//       setUser(response.data.user);
//       return response.data;
//     } catch (error) {
//       console.error("Login error:", error);
//       throw error;
//     }
//   };

//   // Function to log out a user
//   const logout = async () => {
//     try {
//       await axios.post("http://localhost:3000/logout", {}, { withCredentials: true });
//       setIsLogged(false);
//       setUser(null);
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
