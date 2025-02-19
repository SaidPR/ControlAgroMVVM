import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import useListaViewModel from "../viewmodels/ListaViewModel";

const { width, height } = Dimensions.get("window");

const Lista = () => {
  const { workers, currentDate, handleAttendance } = useListaViewModel();

  const renderWorker = ({ item }) => {
    return (
      <View style={styles.workerContainer}>
        <Text style={styles.workerText}>{item.name}</Text>
        {item.attendanceStatus === null ? (
          <>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={() => handleAttendance(item.id, "Confirmada")}
            >
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.denyButton]}
              onPress={() => handleAttendance(item.id, "Negada")}
            >
              <Text style={styles.buttonText}>Negar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={[
              styles.button,
              item.attendanceStatus === "Confirmada"
                ? styles.confirmedStatusButton
                : styles.deniedStatusButton,
            ]}
          >
            <Text style={styles.buttonText}>
              {item.attendanceStatus === "Confirmada"
                ? "Asistencia Confirmada"
                : "Asistencia Negada"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Trabajadores</Text>
      <Text style={styles.date}>{currentDate}</Text>
      <FlatList
        data={workers}
        keyExtractor={(item) => item.id}
        renderItem={renderWorker}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "#333",
    marginBottom: height * 0.01,
    textAlign: "center",
  },
  date: {
    fontSize: width * 0.045,
    color: "#555",
    textAlign: "center",
    marginBottom: height * 0.02,
  },
  listContainer: {
    flexGrow: 1,
  },
  workerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: width * 0.04,
    marginBottom: height * 0.01,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  workerText: {
    fontSize: width * 0.045,
    flex: 1,
  },
  button: {
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.03,
    borderRadius: 10,
    marginLeft: width * 0.02,
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
  },
  denyButton: {
    backgroundColor: "#F44336",
  },
  confirmedStatusButton: {
    backgroundColor: "#2196F3",
  },
  deniedStatusButton: {
    backgroundColor: "#9E9E9E",
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.035,
    fontWeight: "bold",
  },
});

export default Lista;
