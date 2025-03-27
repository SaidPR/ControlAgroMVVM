import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import useHomeViewModel from "../viewmodels/HomeViewModel";

const { width, height } = Dimensions.get("window");

const AccountSettings = ({ navigation }) => {
  const { navigateTo } = useHomeViewModel(navigation);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración de Cuenta</Text>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigateTo("ChangePassword")} 
      >
        <Text style={styles.menuText}>Cambio de Contraseña</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigateTo("TwoFactorAuth")}
      >
        <Text style={styles.menuText}>Método de Doble Factor</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigateTo("EditAccountInfo")}
      >
        <Text style={styles.menuText}>Editar Información</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    padding: width * 0.05,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#28a745",
    marginBottom: height * 0.05,
  },
  menuButton: {
    width: "100%",
    paddingVertical: height * 0.02,
    backgroundColor: "#0E8C47",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: height * 0.02,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  menuText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AccountSettings;
