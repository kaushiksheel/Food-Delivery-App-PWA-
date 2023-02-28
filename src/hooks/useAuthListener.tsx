;
import React, { useState, useEffect } from "react";
import { IUser } from "../interfaces/IUser";
import { auth } from "../lib/Firebase";

export const useAuthListener = () => {
  const [user, setUser] = useState<IUser|null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user as IUser);
        localStorage.setItem('user',JSON.stringify(user))
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return { user};

};