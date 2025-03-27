import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import * as Notifications from "expo-notifications";
import useHomeViewModel from "../viewmodels/HomeViewModel";

const { width, height } = Dimensions.get("window");

const Home = ({ navigation }) => {
  const { navigateTo } = useHomeViewModel(navigation);

  const handleLogout = async () => {
    // Enviar notificación de despedida
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Sesión cerrada",
        body: "¡Esperamos verte pronto!",
        sound: "default",
      },
      trigger: null,
    });

    setTimeout(() => {
      navigateTo("Inicio");
    }, 1300);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Menú Principal</Text>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigateTo("Lista")}>
          <Text style={styles.menuText}>Pase de lista</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={() => navigateTo("UsersList")}>
          <Text style={styles.menuText}>Administrar Usuarios</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={() => navigateTo("WorkersList")}>
          <Text style={styles.menuText}>Gestión de Trabajadores</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={() => navigateTo("ProductionControl")}>
          <Text style={styles.menuText}>Control de Producción</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={() => navigateTo("Reports")}>
          <Text style={styles.menuText}>Gestión de Reportes</Text>
        </TouchableOpacity>

        {/* Botón de configuración de cuenta */}
        <TouchableOpacity style={styles.menuButton} onPress={() => navigateTo("AccountSettings")}>
          <Text style={styles.menuText}>Configuración de Cuenta</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    padding: width * 0.05,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#28a745",
    marginVertical: height * 0.03,
  },
  menuContainer: {
    width: "100%",
    marginBottom: height * 0.05,
  },
  menuButton: {
    width: "100%",
    paddingVertical: height * 0.015,
    backgroundColor: "#0E8C47",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: height * 0.02,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutButton: {
    width: "100%",
    paddingVertical: height * 0.02,
    backgroundColor: "#953233",
    borderRadius: 10,
    alignItems: "center",
    marginTop: height * 0.05,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Home;
