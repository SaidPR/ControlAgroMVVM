import { useState } from "react";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const useAddWorkerViewModel = (navigation) => {
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
    location: "",
    description: "",
  });

  const [error, setError] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      handleInputChange("fechaNacimiento", formattedDate);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const isValidEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };

  const handleRegistro = async () => {
    const { email, password, primerNombre, segundoNombre, primerApellido, segundoApellido, telefono, location, description, fechaNacimiento } = formData;

    if (!isValidEmail(email)) {
      setError("Por favor ingrese un correo electrónico válido.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = userCredential.user;
      console.log("Usuario registrado:", user.email);

      const workerData = {
        name: `${primerNombre} ${segundoNombre} ${primerApellido} ${segundoApellido}`.trim(),
        phone: telefono,
        email,
        fechaNacimiento,
        curp: formData.curp,
        location: location,
        description: description,
        role: "TRABAJADOR",
      };

      const usersCollectionRef = collection(FIRESTORE_DB, "users");
      await addDoc(usersCollectionRef, workerData);

      console.log("Trabajador guardado en Firestore con rol TRABAJADOR");
      navigation.navigate("WorkersList");
    } catch (error) {
      console.error("Error de registro:", error);
      setError(error.message);
    }
  };

  return {
    formData,
    error,
    showDatePicker,
    handleDateChange,
    handleInputChange,
    handleRegistro,
    setShowDatePicker,
  };
};

export default useAddWorkerViewModel;