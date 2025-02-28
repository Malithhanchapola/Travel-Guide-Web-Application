import React, { createContext, useContext, useState, useEffect } from "react";
import { login, logout, getUser } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUsingRecommendation, setIsUsingRecommendation] = useState(localStorage.getItem("isUsingRecommendation"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
      setLoading(false);
    }

    const storedEmail = localStorage.getItem("userEmail");
   
    setIsUsingRecommendation(localStorage.getItem("isUsingRecommendation"));
    console.log("auth", localStorage.getItem("isUsingRecommendation"))
    if (storedEmail) {
      setUser({ email: storedEmail});
    } else {
      loadUser();
    }
  }, []);

  const signIn = async (email, password) => {
    try {
      const userData = await login({ email, password });
      setUser(userData);
      localStorage.setItem("userEmail", userData.data.email);
      
      return userData;
    } catch (error) {
      throw new Error("Invalid email or password");
    }
  };

  const signOut = async () => {
    try {
      await logout();
      setUser(null);
      localStorage.removeItem("userEmail");
      localStorage.removeItem("username");
      localStorage.removeItem("firstAnswer");
      localStorage.removeItem("secondAnswer");
      localStorage.removeItem("thirdAnswer");
      
      localStorage.removeItem("isUsingRecommendation");
      setIsUsingRecommendation(false)
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, isUsingRecommendation, setIsUsingRecommendation }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
