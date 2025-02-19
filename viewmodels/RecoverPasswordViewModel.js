import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { Alert } from "react-native";

const useRecoverPasswordViewModel = (navigation) => {
  const [email, setEmail] = useState("");

  const handleRecoverPassword = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Por favor, ingresa un correo válido.");
      return;
    }

    try {
      await sendPasswordResetEmail(FIREBASE_AUTH, email);
      Alert.alert(
        "Correo enviado",
        "Revisa tu bandeja de entrada para restablecer tu contraseña."
      );
      navigation.navigate("LogIn");
    } catch (error) {
      console.error(error);
      switch (error.code) {
        case "auth/invalid-email":
          Alert.alert("Error", "El correo electrónico no es válido.");
          break;
        case "auth/user-not-found":
          Alert.alert("Error", "No existe una cuenta asociada a este correo.");
          break;
        default:
          Alert.alert("Error", "Ocurrió un error inesperado. Intenta nuevamente.");
      }
    }
  };

  return {
    email,
    setEmail,
    handleRecoverPassword,
  };
};

export default useRecoverPasswordViewModel;