import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import * as Notifications from "expo-notifications";
import useLogInViewModel from "../viewmodels/LogInViewModel";
import { Ionicons } from "@expo/vector-icons"; // Importamos los iconos

const { width, height } = Dimensions.get("window");

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const LoginScreen = ({ navigation }) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleLogin,
  } = useLogInViewModel(navigation);

  const [secureTextEntry, setSecureTextEntry] = useState(true); 

  useEffect(() => {
    if (error) {
      sendErrorNotification();
    }
  }, [error]);

  const sendErrorNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Error de inicio de sesión",
        body: "Correo o contraseña incorrectos. Inténtalo de nuevo.",
        sound: "default",
      },
      trigger: null,
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Círculo de fondo */}
        <View style={styles.backgroundCircle} />

        <Text style={styles.title}>Iniciar Sesión</Text>

        <TextInput
          placeholder="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />
        {/* Campo de contraseña con botón de visibilidad */}
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureTextEntry}
            style={styles.passwordInput}
          />
          <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)} style={styles.eyeIcon}>
            <Ionicons name={secureTextEntry ? "eye-off" : "eye"} size={24} color="#888" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("RecoverPassword")}>
          <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: width * 0.05,
    backgroundColor: "#f5f6fa",
  },
  backgroundCircle: {
    position: "absolute",
    top: -500, 
    left: -width * 0.9, 
    width: height * 1.4, 
    height: height * 1.4, 
    borderRadius: height * 0.7, 
    backgroundColor: "#FFBDD1", 
    opacity: 0.3, 
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: "600",
    color: "#272B35",
    marginBottom: height * 0.05,
  },
  input: {
    width: "100%",
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.05,
    borderWidth: 1,
    borderColor: "#dcdde1",
    borderRadius: 20,
    backgroundColor: "#ffffff",
    marginBottom: height * 0.03,
    fontSize: width * 0.04,
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dcdde1",
    borderRadius: 20,
    backgroundColor: "#ffffff",
    marginBottom: height * 0.03,
    paddingRight: 15,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.05,
    fontSize: width * 0.04,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
  },
  button: {
    width: "80%",
    paddingVertical: height * 0.02,
    backgroundColor: "#1abc9c",
    borderRadius: 20,
    alignItems: "center",
    marginBottom: height * 0.03,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: "#1A1A1A",
    fontSize: width * 0.045,
    fontWeight: "600",
  },
  forgotPasswordText: {
    color: "#0E3D5D",
    fontSize: width * 0.04,
    marginTop: 10,
  },
});

export default LoginScreen;
