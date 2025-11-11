import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, ImageBackground } from "react-native";
import estilos from "../Estilos/Style";
import { Picker } from "@react-native-picker/picker";

const Formu_Inicio_Sesion = () => {

    const [miembro, setMiembro] = useState('')
    const [nombre, setNombre] = useState('')

    const Imprimir = () => {
        console.log('hola')
    }

    return(

        <View style={estilos.contenedor_formulario}>

            <Text style={estilos.titulo_formulario}>Inicio de Sesion</Text>

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
        
    )
}

export default Formu_Inicio_Sesion