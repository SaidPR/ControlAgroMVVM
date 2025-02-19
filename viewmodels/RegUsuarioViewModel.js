import { useState } from "react";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { Alert } from "react-native";

const useRegUsuarioViewModel = (navigation) => {
  const [formData, setFormData] = useState({
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    telefono: "",
    email: "",
    password: "",
    fechaNacimiento: "",
    curp: "",
  });

  const [error, setError] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // Ocultar el selector después de seleccionar
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      handleInputChange("fechaNacimiento", formattedDate);
    }
  };

  const handleRegistro = async () => {
    const { email, password, primerNombre, primerApellido, segundoApellido, telefono, fechaNacimiento, curp } = formData;

    if (!email || !password || !primerNombre || !primerApellido || !segundoApellido || !telefono || !fechaNacimiento || !curp) {
      setError("Por favor completa todos los campos.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = userCredential.user;

      const userData = {
        name: `${formData.primerNombre} ${formData.segundoNombre} ${formData.primerApellido} ${formData.segundoApellido}`.trim(),
        phone: formData.telefono,
        email,
        fechaNacimiento,
        curp: formData.curp,
        role: "ADMIN",
      };

      const usersCollectionRef = collection(FIRESTORE_DB, "users");
      await addDoc(usersCollectionRef, userData);

      navigation.navigate("Home");
    } catch (error) {
      setError("Error al registrar: " + error.message);
    }
  };

  return {
    formData,
    error,
    showDatePicker,
    handleInputChange,
    handleDateChange,
    handleRegistro,
    setShowDatePicker,
  };
};

export default useRegUsuarioViewModel;