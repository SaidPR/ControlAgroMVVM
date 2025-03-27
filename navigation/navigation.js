import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Inicio from "../views/Inicio.js";
import LoginScreen from "../views/Log_In.js";
import RegistroUsuario from "../views/Reg_Usuario.js";
import RecoverPasswordScreen from "../views/RecoverPassword.js";
import Home from "../views/Home.js"; // Menú principal
import WorkersList from "../views/WorkersList.js"; // Gestión de trabajadores
import WorkerDetails from "../views/WorkerDetails.js"; // Detalles del trabajador
import ProductionControl from "../views/ProductionControl.js"; // Control de producción
import ProductionDetails from "../views/ProductionDetails.js"; // Detalles de producción
import Reports from "../views/Reports.js"; // Gestión de reportes
import DetailsReports from "../views/DetailsReports.js"; // Detalles de reportes
import Reg_Docs from "../views/Reg_Docs.js"; // Importa la pantalla RegDocs
import UsersList from "../views/UsersList.js"; // Gestión de Usuarios
import UsersDetails from "../views/UsersDetails.js"; // Detalles del usuario
import GenerateQR from "../views/GenerateQR.js";
import EditUser from "../views/EditUser.js"
import AddProductionRecord from "../views/AddProductionRecord.js"
import AddWorker from "../views/AddWorker.js"
import Lista from "../views/Lista.js";
import useNavigationViewModel from "../viewmodels/NavigationViewModel.js";
import AccountSettings from "../views/AccountSettings.js";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const { user } = useNavigationViewModel();

  return (
    <Stack.Navigator initialRouteName={user ? "Home" : "Inicio"}>
      <Stack.Screen
        name="Inicio"
        component={Inicio}
        options={{ title: "Inicio", headerShown: false }}
      />
      <Stack.Screen
        name="LogIn"
        component={LoginScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "Menú Principal" }}
      />
      <Stack.Screen
        name="RegUsuario"
        component={RegistroUsuario}
        options={{ title: "Registro de Usuario" }}
      />
      <Stack.Screen
        name="RecoverPassword"
        component={RecoverPasswordScreen}
        options={{ title: "Recuperar Contraseña" }}
      />
      <Stack.Screen
        name="UsersList"
        component={UsersList}
        options={{ title: "Administrar Usuarios" }}
      />
      <Stack.Screen
        name="UsersDetails"
        component={UsersDetails}
        options={({ route }) => ({
          title: `Detalles de ${route.params?.worker?.name || "Usuarios"}`,
        })}
      />
      <Stack.Screen
        name="WorkersList"
        component={WorkersList}
        options={{ title: "Gestión de Trabajadores" }}
      />
      <Stack.Screen
        name="WorkerDetails"
        component={WorkerDetails}
        options={({ route }) => ({
          title: `Detalles de ${route.params?.worker?.name || "Trabajador"}`,
        })}
      />
      <Stack.Screen
        name="ProductionControl"
        component={ProductionControl}
        options={{ title: "Control de Producción" }}
      />
      <Stack.Screen
        name="ProductionDetails"
        component={ProductionDetails}
        options={{ title: "Detalles de Producción" }}
      />
      <Stack.Screen
        name="Reports"
        component={Reports}
        options={{ title: "Gestión de Reportes" }}
      />
      <Stack.Screen
        name="DetailsReports"
        component={DetailsReports}
        options={({ route }) => ({
          title: `Detalles de ${route.params?.report?.title || "Reporte"}`,
        })}
      />
      <Stack.Screen
        name="Reg_Docs"
        component={Reg_Docs}
        options={{ title: "Subida de Documentos" }}
      />
      <Stack.Screen
        name="GenerateQR"
        component={GenerateQR}
        options={{ title: "Generar Código QR" }}
      />
      <Stack.Screen
        name="EditUser"
        component={EditUser}
        options={{ title: "Editar datos de usuario" }}
      />
      <Stack.Screen
        name="AddProductionRecord"
        component={AddProductionRecord}
        options={{ title: "Agregar registros" }}
      />
      <Stack.Screen
        name="AddWorker"
        component={AddWorker}
        options={{ title: "Registrar trabajador" }}
      />
      <Stack.Screen
        name="Lista"
        component={Lista}
        options={{ title: "Pase de Lista" }}
      />
      <Stack.Screen
        name="AccountSettings"
        component={AccountSettings}
        options={{ title: "Configuración" }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
