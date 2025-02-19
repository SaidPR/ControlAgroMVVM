import React from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert, Dimensions  } from "react-native";
import useEditUserViewModel from "../viewmodels/EditUserViewModel";

const EditUser = ({ route, navigation }) => {
  const user = route.params?.user;
  const {
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    handleUpdateUser,
    error,
  } = useEditUserViewModel(navigation, user);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Usuario</Text>

      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nombre del usuario"
      />

      <Text style={styles.label}>Correo Electrónico:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Correo del usuario"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Número de teléfono:</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Teléfono del usuario"
      />

      <View style={styles.buttonContainer}>
        <Button title="Guardar Cambios" onPress={handleUpdateUser} />
        <Button
          title="Cancelar"
          onPress={() => navigation.goBack()}
          color="#aaa"
        />
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#555",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default EditUser;
