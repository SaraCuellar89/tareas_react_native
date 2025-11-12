import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, ImageBackground } from "react-native";
import estilos from "../Estilos/Style";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Pages/App';

type navigationProp = NativeStackNavigationProp<RootStackParamList, 'Inicio_Sesion'>;

const Formu_Inicio_Sesion = () => {

    const navigation = useNavigation<navigationProp>();

    const [miembro, setMiembro] = useState('')
    const [nombre, setNombre] = useState('')

    const Imprimir = () => {
        navigation.navigate('Tablero');
    }

    return(

        <ImageBackground source={{ uri: 'https://images.justwatch.com/poster/178327671/s718/hora-de-aventura.jpg' }} style={estilos.imagen_fondo}>
            <View style={estilos.contenedor_formulario}>

                <View style={estilos.caja_formulario}>
                    <View>
                        <Text style={estilos.label_fomulario}>Nombre de Usuario</Text>
                        <TextInput style={estilos.input_formulario} value={nombre} onChangeText={text => setNombre(text)}/>
                    </View>

                    <View>
                        <Text style={estilos.label_fomulario}>Contraseña</Text>
                        <TextInput style={estilos.input_formulario}/>
                    </View>

                    {/* Lista Desplegable */}
                    <Picker selectedValue={miembro} onValueChange={setMiembro}>
                        <Picker.Item label="Usuario" value="Usuario" />
                        <Picker.Item label="Miembro" value="Miembro" />
                    </Picker>

                    <TouchableOpacity style={estilos.boton_formulario} onPress={Imprimir}>
                        <Text style={estilos.texto_boton_formulario}>
                            Entrar
                        </Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </ImageBackground>
        
    )
}

export default Formu_Inicio_Sesion