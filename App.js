import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigation/navigation";
import { registerForPushNotificationsAsync, listenForNotifications } from "./views/notifications";

const App = () => {
  useEffect(() => {
    registerForPushNotificationsAsync();
    const unsubscribe = listenForNotifications();
    return unsubscribe; // Para limpiar el listener cuando el componente se desmonte
  }, []);

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;
