import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import estilos from "../Estilos/Style";
import { Task } from "../Componentes/Tablero"

interface intemProps{
    item: Task,
    markDone: () => void, //Funcion que no devuelve nada
    deleteFunction: () => void 
}

export default function RenderItem({ item, markDone, deleteFunction }: intemProps) {
    return(
        <View>
            <TouchableOpacity onPress={markDone}>
                <Text style={item.done ? estilos.textDone : estilos.text}>{item.title}</Text>
                <Text>{new Date(item.date).toDateString()}</Text>
            </TouchableOpacity>
            {
                item.done && 
                (<TouchableOpacity style = {estilos.removeBoton} onPress={deleteFunction}>
                    <Text style = {estilos.removeText}>Eliminar</Text>
                </TouchableOpacity>)
            }
        </View>
    )
}
