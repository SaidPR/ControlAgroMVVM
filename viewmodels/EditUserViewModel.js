import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";
import { Alert } from "react-native";

const useEditUserViewModel = (navigation, user) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [error, setError] = useState(null);

  const handleUpdateUser = async () => {
    if (!name || !email || !phone) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const userDocRef = doc(FIRESTORE_DB, "users", user.id);
      await updateDoc(userDocRef, { name, email, phone });
      Alert.alert("Éxito", "Usuario actualizado correctamente.");
      navigation.goBack();
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      setError("No se pudo actualizar el usuario.");
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    handleUpdateUser,
    error,
  };
};

export default useEditUserViewModel;