import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, TextInput, FlatListComponent } from "react-native";
import estilos from "../Estilos/Style";
import RenderItem from "../Pages/RenderItem";

export interface Task {
    title: string,
    done: boolean,
    date: Date
}

export default function Tablero() {

    const [text, setText] = useState('')
    const [tasks, setTasks] = useState<Task[]>([])

    const addTasks = () => {
        if(text.trim() === '') return
        const tmp = [...tasks] // copiar array de tareas
        const newTask: Task = {
            title: text,
            done: false,
            date: new Date()
        }
            tmp.push(newTask) // agregar nueva tarea
            setTasks(tmp)
            setText('')
    }

    const markDone = (task: Task) => {
        const tmp = [...tasks]
        const index = tmp.findIndex(el => el.title === task.title)
        const todo = tmp[index]
        todo.done=!todo.done
        setTasks(tmp)
    }


    const deleteFunction = (task: Task) => {
        const tmp = [...tasks]
        const index = tmp.findIndex(el => el.title === task.title)
        tmp.splice(index, 1)
        setTasks(tmp)
    }

    return (
        <View style={estilos.container}>
            <Text style={estilos.title}>Lista de tareas</Text>
            <View style={estilos.inputcontainer}>
                <TextInput placeholder="Escriba" style={estilos.textinput} value={text} onChangeText={(t:string) => setText(t)}/>
                <TouchableOpacity style={estilos.boton} onPress={addTasks}>
                    <Text>Agregar</Text>
                </TouchableOpacity>
            </View>

            <View>
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.title} // o algún id único
                    renderItem={({item}) => 
                        <RenderItem
                        item={item}
                        markDone = {() => markDone(item)}
                        deleteFunction = {() => deleteFunction(item)}/>
                    }  
                />
            </View>
        </View>
    )
}
