import { useState, useEffect } from "react";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

const useLogInViewModel = (navigation) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  async function registerForPushNotificationsAsync() {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        console.log("Permiso de notificación denegado");
        return;
      }
    } else {
      console.log("Debe usarse en un dispositivo físico para recibir notificaciones.");
    }
  }

  const handleLogin = async () => {
    if (!isValidEmail(email)) {
      setError("Por favor ingrese un correo electrónico válido.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = userCredential.user;
      console.log("Usuario inició sesión:", user.email);

      const usersCollectionRef = collection(FIRESTORE_DB, "users");
      const q = query(usersCollectionRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        await addDoc(usersCollectionRef, { email: user.email });
        console.log("Usuario creado en Firestore");
      } else {
        console.log("El usuario ya existe en Firestore");
      }

      // Mostrar notificación local
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Inicio de sesión exitoso",
          body: `Bienvenido de nuevo, ${user.email}!`,
          sound: "default",
        },
        trigger: null, // Se muestra de inmediato
      });

      navigation.navigate("Home");
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      switch (error.code) {
        case "auth/invalid-email":
          setError("Correo electrónico inválido");
          break;
        case "auth/wrong-password":
          setError("Contraseña incorrecta");
          break;
        case "auth/user-not-found":
          setError("El usuario no está registrado");
          break;
        default:
          setError("Error de inicio de sesión");
          break;
      }
    }
  };

  const isValidEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleLogin,
  };
};

export default useLogInViewModel;
