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
    const [date, setDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)

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

    //Generar y mostrar fecha
    const OnDateChange = (event: any, selectedDate?: Date) => {
        if (event.type === 'set' && selectedDate) {
            setDate(selectedDate)
            setShowTimePicker(true) 
        }
        setShowDatePicker(false)
    }

    //Generar y mostrar hora
    const onTimeChange = (event: any, selectedTime?: Date) => {
        setShowTimePicker(false)
        if (event.type === 'set' && selectedTime) {
            const newDate = new Date(date)
            newDate.setHours(selectedTime.getHours())
            newDate.setMinutes(selectedTime.getMinutes())
            setDate(newDate)
        }
    }

    //Añadir tarea
    const addTasks = () => {
        if(text.trim() === '') return
        const tmp = [...tasks] // copiar array de tareas
        const newTask: Task = {
            title: text,
            done: false,
            date: date
        }
            tmp.push(newTask) // agregar nueva tarea
            setTasks(tmp)
            storeData(tmp)
            setText('')
            setDate(new Date())
    }

    //Marcar tarea como finalizada
    const markDone = (task: Task) => {
        const tmp = [...tasks]
        const index = tmp.findIndex(el => el.title === task.title)
        const todo = tmp[index]
        todo.done=!todo.done
        setTasks(tmp)
        storeData(tmp)
    }

    //Eliminar tarea finalizada
    const deleteFunction = (task: Task) => {
        const tmp = [...tasks]
        const index = tmp.findIndex(el => el.title === task.title)
        tmp.splice(index, 1)
        setTasks(tmp)
        storeData(tmp)
    }

    const formatDate=(date:Date)=>{
        return date.toLocaleDateString('es-ES',{
            day:'2-digit',
            month:'2-digit',
            year:'numeric',
            hour:'2-digit',
            minute:'2-digit'
        })
    }

    //Ir a inicio de Sesion

    return (
        <View style={estilos.container}> 
            <Text style={estilos.title}>Lista de tareas</Text>
            <View style={estilos.inputcontainer}>
                <View style={estilos.caja_tarea}>
                    <TextInput placeholder="Escriba" style={estilos.textinput} value={text} onChangeText={(t:string) => setText(t)}/>

                    <TouchableOpacity style={estilos.boton_fecha} onPress={()=>setShowDatePicker(true)}>
                        <Text>📅</Text>
                    </TouchableOpacity>
                </View>

                {showDatePicker && (
                    <DateTimePicker value={date} mode="date" display="default" onChange={OnDateChange} minimumDate={new Date()}/>
                )}

                {showTimePicker && (
                    <DateTimePicker value={date} mode="time" display="default" onChange={onTimeChange}/>
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
