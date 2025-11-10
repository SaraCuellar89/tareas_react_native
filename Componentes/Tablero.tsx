import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, TextInput, FlatListComponent } from "react-native";
import estilos from "../Estilos/Style";
import RenderItem from "../Pages/RenderItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from '@react-native-community/datetimepicker';

export interface Task {
    title: string,
    done: boolean,
    date: Date
}

export default function Tablero() {

    const [text, setText] = useState('')
    const [tasks, setTasks] = useState<Task[]>([])
    const [fecha, setFecha] = useState(new Date())

    //Crear Fecha
    const Crear_Fecha = (event:any, fecha_seleccionada?: Date) => {
        setMostrar_fecha(false)
        if(fecha_seleccionada) setFecha(fecha_seleccionada)
    }

    //Guardar datos
    const storeData = async (value: Task[]) => {
        try{
            await AsyncStorage.setItem('my-todo', 
                JSON.stringify(value)
            )
        }
        catch(error){
            console.error('Error: ' + error)
        }
    }

    //Obtener datos
    const getData = async () => {
        try{
            const value = await AsyncStorage.getItem('my-todo')
            if(value !=null){
                const tasksLLocal = JSON.parse(value)
                setTasks(tasksLLocal)
            }
        }
        catch(error){
            console.error('Error: ' + error)
        }
    }

    //Renderizar datos
    useEffect(() => {
        getData()
    }, [])

    const addTasks = () => {
        if(text.trim() === '') return
        const tmp = [...tasks] // copiar array de tareas
        const newTask: Task = {
            title: text,
            done: false,
            date: fecha
        }
            tmp.push(newTask) // agregar nueva tarea
            setTasks(tmp)
            storeData(tmp)
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

    const [mostrar_fecha, setMostrar_fecha] = useState(false)

    const Ver_Fecha = () => {
        if(mostrar_fecha === false){
            setMostrar_fecha(true)
        }
        else{
            setMostrar_fecha(false)
        }
    }

    return (
        <View style={estilos.container}>
            <Text style={estilos.title}>Lista de tareas</Text>
            <View style={estilos.inputcontainer}>
                <View style={estilos.caja_tarea}>
                    <TextInput placeholder="Escriba" style={estilos.textinput} value={text} onChangeText={(t:string) => setText(t)}/>

                    <TouchableOpacity style={estilos.boton_fecha} onPress={Ver_Fecha}>
                        <Text>📅</Text>
                    </TouchableOpacity>
                </View>

                {mostrar_fecha && (
                    <DateTimePicker value={fecha} mode="date" display="default" is24Hour={true} onChange={Crear_Fecha}/>
                )}

                <TouchableOpacity style={estilos.boton} onPress={addTasks}>
                    <Text style={estilos.texto_boton}>Agregar</Text>
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
