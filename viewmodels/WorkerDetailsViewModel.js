import { useState } from "react";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";
import { Alert } from "react-native";

const useWorkerDetailsViewModel = (navigation, worker) => {
  const [profilePhoto, setProfilePhoto] = useState(worker?.profilePhoto || null);

  const handleGenerateReport = async () => {
    try {
      const attendanceCollection = collection(FIRESTORE_DB, "attendance");
      const q = query(attendanceCollection, where("workerId", "==", worker.id));
      const snapshot = await getDocs(q);

      const attendanceData = snapshot.docs.map((doc) => doc.data());

      if (attendanceData.length === 0) {
        Alert.alert("Sin Asistencias", "No se encontraron registros de asistencia.");
        return;
      }

      const reportData = {
        title: `Reporte de Asistencia de ${worker.name}`,
        date: new Date().toLocaleDateString(),
        description: `Reporte generado para el trabajador ${worker.name}`,
        workerId: worker.id,
        createdAt: new Date(),
        attendance: attendanceData,
      };

      const reportsCollection = collection(FIRESTORE_DB, "reports");
      await addDoc(reportsCollection, reportData);

      Alert.alert("Reporte Generado", "El reporte ha sido guardado con éxito.");
      navigation.navigate("Reports");
    } catch (error) {
      console.error("Error al generar el reporte:", error);
      Alert.alert("Error", "No se pudo generar el reporte.");
    }
  };

  return {
    profilePhoto,
    setProfilePhoto,
    handleGenerateReport,
  };
};

export default useWorkerDetailsViewModel;