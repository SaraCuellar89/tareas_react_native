import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import Inicio_Sesion from "./Inicio_Sesion";
import Tablero from "../Componentes/Tablero";
import Registro from "./Registro";

export type RootStackParamList = {
    Inicio_Sesion: undefined
    Registro: undefined
    Tablero: undefined   
}

const Stack = createStackNavigator<RootStackParamList>()

const App = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Inicio_Sesion">
                <Stack.Screen 
                    name="Inicio_Sesion" 
                    component={Inicio_Sesion}
                    options={{
                        title: 'Inicio de Sesion'
                    }}
                ></Stack.Screen>

                <Stack.Screen 
                    name="Registro" 
                    component={Registro}
                    options={{
                        title: 'Registro'
                    }}
                    >
                </Stack.Screen>

                <Stack.Screen 
                    name="Tablero" component={Tablero}
                    options={{ 
                        headerLeft: () => null,// NO flecha
                        title: 'Lista de Tareas'
                    }} >
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App