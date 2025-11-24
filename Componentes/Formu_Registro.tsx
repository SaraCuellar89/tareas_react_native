import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Alert } from "react-native";
import { Text, TextInput, TouchableOpacity, View, ImageBackground } from "react-native";
import estilos from "../Estilos/Style";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Pages/App';

type navigationProp = NativeStackNavigationProp<RootStackParamList, 'Inicio_Sesion'>;

const Formu_Registro = () => {

    const navigation = useNavigation<navigationProp>();

    const [nombre, setNombre] = useState('');
    const [tipoDocumento, setTipoDocumento] = useState('C.C');
    const [documento, setDocumento] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');

    const Registrar_Usuario = async () => {
        try{
            const res = await fetch('https://backend-aplicacion-movil.vercel.app/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({nombre, tipo_documento: tipoDocumento, documento, correo, contrasena})
            })

            const datos = await res.json()
            console.log("RESPUESTA JSON:", datos);

            if (!datos.success) {
                return Alert.alert("Error", "No se pudo completar el registro");
            }

            Alert.alert("Éxito", "Registrado completado correctamente");
            navigation.navigate('Inicio_Sesion');
        }
        catch(error){
            console.error('Error: ' + error)
        }
    }

    return(
        <ImageBackground source={{ uri: 'https://images.justwatch.com/poster/304458967/s718/mas-alla-del-jardin.jpg' }} style={estilos.imagen_fondo}>
            <View style={estilos.contenedor_formulario}>

                <View style={estilos.caja_formulario}>
                    <View>
                        <Text style={estilos.label_fomulario}>Nombre de Usuario</Text>
                        <TextInput style={estilos.input_formulario} value={nombre} onChangeText={setNombre}/>
                    </View>

                    {/* Lista Desplegable */}
                    <View>
                        <Text style={estilos.label_fomulario}>Tipo Documento</Text>
                        <Picker selectedValue={tipoDocumento} onValueChange={(e) => setTipoDocumento(e)}>
                            <Picker.Item label="C.C" value="C.C" />
                            <Picker.Item label="T.I" value="T.I" />
                        </Picker>
                    </View>

                    <View>
                        <Text style={estilos.label_fomulario}>Numero de Documento</Text>
                        <TextInput style={estilos.input_formulario} value={documento} onChangeText={setDocumento}/>
                    </View>

                    <View>
                        <Text style={estilos.label_fomulario}>Correo</Text>
                        <TextInput style={estilos.input_formulario} value={correo} onChangeText={setCorreo}/>
                    </View>

                    <View>
                        <Text style={estilos.label_fomulario}>Contraseña</Text>
                        <TextInput style={estilos.input_formulario} value={contrasena} onChangeText={setContrasena} secureTextEntry/>
                    </View>

                    <TouchableOpacity style={estilos.boton_formulario} onPress={Registrar_Usuario}>
                        <Text style={estilos.texto_boton_formulario}>
                            Registrarse
                        </Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </ImageBackground>
    )
}

export default Formu_Registro