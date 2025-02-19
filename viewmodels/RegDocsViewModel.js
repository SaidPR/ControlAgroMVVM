import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { Alert } from "react-native";

const useRegDocsViewModel = () => {
  const [documents, setDocuments] = useState([]);

  const handleDocumentPick = async () => {
    try {
      // Abre el selector de documentos
      const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });

      // Imprimir el resultado para depuración
      console.log("Resultado del picker:", result);

      // Verifica si el usuario canceló la selección o si no se seleccionó un archivo
      if (result.canceled) {
        console.log("El usuario canceló la selección del documento.");
        Alert.alert("Selección cancelada", "No se seleccionó ningún documento.");
      } else if (result.assets && result.assets.length > 0) {
        // Si la selección es exitosa, agrega el documento al estado
        const selectedDocument = result.assets[0];
        setDocuments((prevDocs) => [...prevDocs, selectedDocument]);
        console.log("Documento seleccionado:", selectedDocument);
        Alert.alert("Documento cargado", "Documento cargado exitosamente.");
      }
    } catch (error) {
      console.error("Error al seleccionar documento:", error);
      Alert.alert("Error", "Hubo un error al seleccionar el documento.");
    }
  };

  return {
    documents,
    handleDocumentPick,
  };
};

export default useRegDocsViewModel;