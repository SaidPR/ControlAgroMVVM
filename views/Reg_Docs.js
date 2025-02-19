import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Button, Dimensions } from "react-native";
import useRegDocsViewModel from "../viewmodels/RegDocsViewModel";

const { width, height } = Dimensions.get("window");

const Reg_Docs = ({ navigation }) => {
  const { documents, handleDocumentPick } = useRegDocsViewModel();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subida de Documentos</Text>
      <Text style={styles.description}>
        Aquí podrás subir los documentos requeridos para completar tu registro.
      </Text>

      {/* Botones para subir documentos */}
      <TouchableOpacity style={styles.button} onPress={handleDocumentPick}>
        <Text style={styles.buttonText}>Subir Acta de Nacimiento</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleDocumentPick}>
        <Text style={styles.buttonText}>Subir CURP</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleDocumentPick}>
        <Text style={styles.buttonText}>Subir INE</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleDocumentPick}>
        <Text style={styles.buttonText}>Subir Comprobante de Domicilio</Text>
      </TouchableOpacity>

      {/* Mostrar los documentos cargados */}
      <View style={styles.documentsContainer}>
        <Text style={styles.subTitle}>Documentos Subidos:</Text>
        {documents.length > 0 ? (
          documents.map((doc, index) => (
            <Text key={index} style={styles.documentText}>
              {doc.name}
            </Text>
          ))
        ) : (
          <Text>No se han cargado documentos aún.</Text>
        )}
      </View>

      {/* Botón para regresar */}
      <Button
        title="Volver al Registro"
        onPress={() => navigation.navigate("RegistroUsuario")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  button: {
    width: "100%",
    paddingVertical: height * 0.02,
    backgroundColor: "#50B3F9",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.045,
    fontWeight: "bold",
  },
  documentsContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  documentText: {
    fontSize: 16,
    color: "#555",
  },
});

export default Reg_Docs;
