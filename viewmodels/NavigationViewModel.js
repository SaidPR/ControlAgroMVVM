import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig.js";

const useNavigationViewModel = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });

    return unsubscribe; // Clean up the listener when the component unmounts
  }, []);

  return {
    user,
  };
};

export default useNavigationViewModel;