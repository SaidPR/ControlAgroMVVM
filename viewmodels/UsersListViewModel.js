import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { FIRESTORE_DB } from "../firebaseConfig";
import { Alert, Linking } from "react-native";

const useUsersListViewModel = (navigation) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(FIRESTORE_DB, "users");
        const querySnapshot = await getDocs(usersCollection);
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch (error) {
        Alert.alert("Error", "No se pudieron cargar los usuarios");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const uploadImageToFirebase = async (uri, userId) => {
    const storage = getStorage();
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, `profilePhotos/${userId}`);
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  };

  const handleCameraAlert = async (user) => {
    const options = [
      { text: "Cámara", onPress: () => openCamera(user) },
      { text: "Galería", onPress: () => openGallery(user) },
      { text: "Cancelar", style: "cancel" },
    ];
    Alert.alert("Imagen de Perfil", "Selecciona una opción", options);
  };

  const openCamera = async (user) => {
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
        const imageURL = await uploadImageToFirebase(result.assets[0].uri, user.id);

        // Actualizar Firestore
        const userDocRef = doc(FIRESTORE_DB, "users", user.id);
        await updateDoc(userDocRef, { profilePhoto: imageURL });

        // Actualizar el estado local
        setUsers((prev) =>
          prev.map((u) => (u.id === user.id ? { ...u, profilePhoto: imageURL } : u))
        );
      } catch (error) {
        Alert.alert("Error", "No se pudo guardar la imagen.");
        console.error(error);
      }
    }
  };

  const openGallery = async (user) => {
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
        const imageURL = await uploadImageToFirebase(result.assets[0].uri, user.id);

        // Actualizar Firestore
        const userDocRef = doc(FIRESTORE_DB, "users", user.id);
        await updateDoc(userDocRef, { profilePhoto: imageURL });

        // Actualizar el estado local
        setUsers((prev) =>
          prev.map((u) => (u.id === user.id ? { ...u, profilePhoto: imageURL } : u))
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
    users,
    loading,
    handleCameraAlert,
    handleCall,
    handleWhatsApp,
  };
};

export default useUsersListViewModel;