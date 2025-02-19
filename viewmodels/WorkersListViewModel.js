import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { FIRESTORE_DB } from "../firebaseConfig";
import { Alert, Linking } from "react-native";

const useWorkersListViewModel = (navigation) => {
  const [workerList, setWorkerList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const workersRef = collection(FIRESTORE_DB, "users");
        const q = query(workersRef, where("role", "==", "TRABAJADOR"));
        const querySnapshot = await getDocs(q);
        const workers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWorkerList(workers);
      } catch (error) {
        Alert.alert("Error", "No se pudieron cargar los trabajadores");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, []);

  const uploadImageToFirebase = async (uri, workerId) => {
    const storage = getStorage();
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, `profilePhotos/${workerId}`);
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  };

  const handleCameraAlert = async (worker) => {
    const options = [
      { text: "Cámara", onPress: () => openCamera(worker) },
      { text: "Galería", onPress: () => openGallery(worker) },
      { text: "Cancelar", style: "cancel" },
    ];
    Alert.alert("Imagen de Perfil", "Selecciona una opción", options);
  };

  const openCamera = async (worker) => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permiso requerido", "Se requiere acceso a la cámara.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      try {
        const imageURL = await uploadImageToFirebase(result.assets[0].uri, worker.id);

        // Actualizar Firestore
        const workerDocRef = doc(FIRESTORE_DB, "users", worker.id);
        await updateDoc(workerDocRef, { profilePhoto: imageURL });

        // Actualizar el estado local
        setWorkerList((prev) =>
          prev.map((w) => (w.id === worker.id ? { ...w, profilePhoto: imageURL } : w))
        );
      } catch (error) {
        Alert.alert("Error", "No se pudo guardar la imagen.");
        console.error(error);
      }
    }
  };

  const openGallery = async (worker) => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permiso requerido", "Se requiere acceso a la galería.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      try {
        const imageURL = await uploadImageToFirebase(result.assets[0].uri, worker.id);

        // Actualizar Firestore
        const workerDocRef = doc(FIRESTORE_DB, "users", worker.id);
        await updateDoc(workerDocRef, { profilePhoto: imageURL });

        // Actualizar el estado local
        setWorkerList((prev) =>
          prev.map((w) => (w.id === worker.id ? { ...w, profilePhoto: imageURL } : w))
        );
      } catch (error) {
        Alert.alert("Error", "No se pudo guardar la imagen.");
        console.error(error);
      }
    }
  };

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`).catch((err) =>
      Alert.alert("Error", "No se pudo realizar la llamada")
    );
  };

  const handleWhatsApp = (phone) => {
    Linking.openURL(`https://wa.me/${phone}`).catch((err) =>
      Alert.alert("Error", "No se pudo abrir WhatsApp")
    );
  };

  return {
    workerList,
    loading,
    handleCameraAlert,
    handleCall,
    handleWhatsApp,
  };
};

export default useWorkersListViewModel;