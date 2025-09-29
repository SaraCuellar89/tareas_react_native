import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, TextInput } from "react-native";
import estilos from "../Estilos/Style";
import RenderItem from "../Pages/RenderItem";

const task = [
    {
        title: 'Comer',
        done: true,
        date: new Date()
    },
    {
        title: 'Dormir',
        done: false,
        date: new Date()
    },
    {
        title: 'Sacar la basura',
        done: false,
        date: new Date()
    }
]

export interface Task {
    title: string,
    done: boolean,
    date: Date
}

export default function Tablero() {

    const markDone = () => {console.log('Marcado hecho')}
    const deleteFunction = () => {console.log('Marcado Borrado')}

    return (
        <View style={estilos.container}>
            <Text style={estilos.title}>Lista de tareas</Text>
            <View style={estilos.inputcontainer}>
                <TextInput placeholder="Escriba" style={estilos.textinput} />
                <TouchableOpacity style={estilos.boton}>
                    <Text>Agregar</Text>
                </TouchableOpacity>
            </View>

            <View>
                <FlatList
                    data={task}
                    renderItem={({item}) => 
                        <RenderItem
                        item={item}
                        markDone = {markDone}
                        deleteFunction = {deleteFunction}/>
                    }  
                />
            </View>
        </View>
    )
}
