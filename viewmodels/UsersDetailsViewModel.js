import { deleteDoc, doc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";
import { Alert } from "react-native";

const useUsersDetailsViewModel = (navigation, user) => {
  const handleDeleteUser = async () => {
    try {
      await deleteDoc(doc(FIRESTORE_DB, "users", user.id));
      Alert.alert("Éxito", "Usuario eliminado correctamente.");
      navigation.goBack();
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      Alert.alert("Error", "No se pudo eliminar el usuario.");
    }
  };

  const handleEditUser = () => {
    navigation.navigate("EditUser", { user });
  };

  const handleGenerateQR = () => {
    navigation.navigate("GenerateQR", { user });
  };

  return {
    handleDeleteUser,
    handleEditUser,
    handleGenerateQR,
  };
};

export default useUsersDetailsViewModel;