import { useState, useEffect } from "react";

const useGenerateQRViewModel = (route) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = route.params?.user;
    setUser(userData);
  }, [route.params]);

  return {
    user,
  };
};

export default useGenerateQRViewModel;