import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, ImageBackground, ScrollView } from "react-native";
import { Alert } from "react-native";
import estilos from "../Estilos/Style";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Pages/App';

type navigationProp = NativeStackNavigationProp<RootStackParamList, 'Inicio_Sesion'>;

const Formu_Inicio_Sesion = () => {

    const navigation = useNavigation<navigationProp>();

    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');

    const Iniciar_Sesion = async () => {
        try{
            const res = await fetch('https://backend-aplicacion-movil.vercel.app/inicio_sesion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({correo, contrasena})
            })

            const datos = await res.json()

            if (!datos.success) {
                return Alert.alert("Error", "No se pudo iniciar sesion");
            }

            Alert.alert("Éxito", "Inicio de Sesion exitoso");
            navigation.navigate('Tablero');
        }
        catch(error){
            console.error('Error: ' + error)
        }
    }

    return(

        <ImageBackground source={{ uri: 'https://images.justwatch.com/poster/178327671/s718/hora-de-aventura.jpg' }} style={estilos.imagen_fondo}>
            <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center'}}>

                <View style={estilos.contenedor_formulario}>

                    <View style={estilos.caja_formulario}>
                        <View>
                            <Text style={estilos.label_fomulario}>Nombre de Usuario</Text>
                            <TextInput style={estilos.input_formulario} value={correo} onChangeText={setCorreo}/>
                        </View>

                        <View>
                            <Text style={estilos.label_fomulario}>Contraseña</Text>
                            <TextInput style={estilos.input_formulario} value={contrasena} onChangeText={setContrasena} secureTextEntry/>
                        </View>

                        <TouchableOpacity style={estilos.boton_formulario} onPress={Iniciar_Sesion}>
                            <Text style={estilos.texto_boton_formulario}>
                                Entrar
                            </Text>
                        </TouchableOpacity>

                        <Text style={estilos.label_fomulario} onPress={() => navigation.navigate('Registro')}>Registrate</Text>
                    </View>

                </View>

            </ScrollView>
        </ImageBackground>
        
    )
}

export default Formu_Inicio_Sesion