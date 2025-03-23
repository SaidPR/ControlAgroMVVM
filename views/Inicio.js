import React, { useState, useEffect } from "react";
import { 
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert
} from "react-native";
import { Asset } from "expo-asset";
import useInicioViewModel from "../viewmodels/InicioViewModel";

const { width, height } = Dimensions.get("window");

const VentanaVistaUsuario = ({ navigation }) => {
  const { navigateTo } = useInicioViewModel(navigation);
  
  // Estado para la imagen
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      const asset = Asset.fromModule(require("../assets/agro.jpg"));
      await asset.downloadAsync();
      setBackgroundImage(asset.localUri || asset.uri);
    };
    loadImage();
  }, []);

  return (
    <ImageBackground
      source={backgroundImage ? { uri: backgroundImage } : null}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Logotipo */}
        <Image
          style={styles.logoAgricola}
          resizeMode="contain"  
          source={require("../assets/Agro.webp")}
        />

        {/* Botones principales */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.button1]}
            onPress={() => navigateTo("LogIn")}
          >
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.button2]}
            onPress={() => navigateTo("RegUsuario")}
          >
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>

        {/* Botón adicional */}
        <TouchableOpacity
          style={styles.eresNuevoButton}
          onPress={() => navigateTo("RegUsuario")}
        >
          <Text style={styles.eresNuevo}>¿Eres nuevo?</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: height * 0.07,
  },
  logoAgricola: {
    width: width * 0.6,
    height: width * 0.6,
    marginTop: height * 0.09,
    borderRadius: 15,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0,
  },
  button: {
    width: width * 0.8,
    paddingVertical: height * 0.02,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: height * 0.02,
    elevation: 4,
  },
  button1: {
    backgroundColor: "#0E8C47",
  },
  button2: {
    backgroundColor: "#6B5700",
  },
  buttonText: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  eresNuevoButton: {
    backgroundColor: "#953233",
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.2,
    borderRadius: 20,
    elevation: 6,
  },
  eresNuevo: {
    color: "#fff",
    fontSize: width * 0.045,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default VentanaVistaUsuario;
