import { useState, useEffect } from "react";
import { FIRESTORE_DB } from "../firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";

const useListaViewModel = () => {
  const [workers, setWorkers] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Obtener la fecha actual
    const date = new Date();
    const formattedDate = date.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);

    // Obtener la lista de trabajadores
    const fetchWorkers = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIRESTORE_DB, "users"));
        const workersData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.role === "TRABAJADOR") {
            workersData.push({ id: doc.id, ...data, attendanceStatus: null });
          }
        });
        setWorkers(workersData);
      } catch (error) {
        console.error("Error al obtener trabajadores:", error);
      }
    };

    fetchWorkers();
  }, []);

  const handleAttendance = async (workerId, status) => {
    try {
      // Actualizar el estado local
      setWorkers((prevWorkers) =>
        prevWorkers.map((worker) =>
          worker.id === workerId
            ? { ...worker, attendanceStatus: status }
            : worker
        )
      );

      // Guardar el registro en Firebase
      const attendanceCollectionRef = collection(FIRESTORE_DB, "attendance");
      await addDoc(attendanceCollectionRef, {
        workerId,
        status,
        date: new Date().toISOString(),
      });

      console.log("Asistencia registrada con éxito");
    } catch (error) {
      console.error("Error al registrar asistencia:", error);
    }
  };

  return {
    workers,
    currentDate,
    handleAttendance,
  };
};

export default useListaViewModel;