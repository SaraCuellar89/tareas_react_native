import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, ImageBackground } from "react-native";
import estilos from "../Estilos/Style";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Pages/App';

type navigationProp = NativeStackNavigationProp<RootStackParamList, 'Inicio_Sesion'>;

const Formu_Registro = () => {

    const navigation = useNavigation<navigationProp>();

    const Imprimir = () => {
        navigation.navigate('Inicio_Sesion');
    }

    return(
        <ImageBackground source={{ uri: 'https://images.justwatch.com/poster/304458967/s718/mas-alla-del-jardin.jpg' }} style={estilos.imagen_fondo}>
            <View style={estilos.contenedor_formulario}>

                <View style={estilos.caja_formulario}>
                    <View>
                        <Text style={estilos.label_fomulario}>Nombre de Usuario</Text>
                        <TextInput style={estilos.input_formulario}/>
                    </View>

                    {/* Lista Desplegable */}
                    <View>
                        <Text style={estilos.label_fomulario}>Tipo Documento</Text>
                        <Picker>
                            <Picker.Item label="C.C" value="C.C" />
                            <Picker.Item label="T.I" value="T.I" />
                        </Picker>
                    </View>

                    <View>
                        <Text style={estilos.label_fomulario}>Numero de Documento</Text>
                        <TextInput style={estilos.input_formulario}/>
                    </View>

                    <View>
                        <Text style={estilos.label_fomulario}>Correo</Text>
                        <TextInput style={estilos.input_formulario}/>
                    </View>

                    <View>
                        <Text style={estilos.label_fomulario}>Contraseña</Text>
                        <TextInput style={estilos.input_formulario}/>
                    </View>

                    <TouchableOpacity style={estilos.boton_formulario} onPress={Imprimir}>
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