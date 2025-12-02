import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, TextInput, FlatListComponent, AppState, Alert } from "react-native";
import estilos from "../Estilos/Style";
import RenderItem from "../Componentes/RenderItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from '@react-native-community/datetimepicker';
import notifee, { TimestampTrigger, TriggerType } from "@notifee/react-native";

export interface Task {
    title: string,
    done: boolean,
    date: Date,
    id: string,
    notificationId?: string
}

export default function Tablero() {

    const [text, setText] = useState('')
    const [tasks, setTasks] = useState<Task[]>([])
    const [selected_date, setSelected_date] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)


    useEffect(() => {
        const checkAndUpdateOverdueTasks = async () => {
            try {
                const value = await AsyncStorage.getItem('my-todo');

                if (value !== null) {
                    const storedTasks = JSON.parse(value);

                    // Convertir fechas desde string a objetos Date
                    const tasksWithDates = storedTasks.map((t: any) => ({
                        ...t,
                        date: new Date(t.date)
                    }));

                    setTasks(tasksWithDates);
                }
            } catch (error) {
                console.log('Error:', error);
            }
        };

        const handleAppStateChange = (nextAppState: string) => {
            if (nextAppState === 'active') {
                checkAndUpdateOverdueTasks();
            }
        };

        // ---- EJECUCIÓN INICIAL ----
        const setup = async () => {
            // 1. Pedir permisos
            await notifee.requestPermission();

            // 2. Crear canal
            const channelId = await notifee.createChannel({
                id: 'task-reminders',
                name: 'Recordatorio de tareas',
                description: 'Notificaciones creadas por la app',
                sound: 'default',
                vibration: true,
                importance: 4,
            });

            console.log("Canal creado o existente:", channelId);
        };

        setup();

        // ---- SUSCRIPCIÓN ----
        const subscription = AppState.addEventListener(
            'change',
            handleAppStateChange
        );

        // ---- LIMPIEZA ----
        return () => {
            subscription.remove();
        };

    }, []);

    

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
           
           if(value !== null){
            const Tlocales = JSON.parse(value)

            const tasksWithDates = Tlocales.map((t: any) => ({
                        ...t,
                        date: new Date(t.date)
                    }));

            setTasks(tasksWithDates);
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


    const scheduleNotification = async (task: Task) => {
        const now = new Date();
        if (task.date <= now) return; // no programar notificaciones pasadas

        const notificationId = Math.floor(Math.random() * 1000000).toString();

        const trigger: TimestampTrigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: task.date.getTime(),
            alarmManager: true, // para asegurar que se dispare incluso en sleep
        };

        await notifee.createTriggerNotification(
            {
                id: notificationId,
                title: 'Recordatorio 😈',
                body: `Es hora de ${task.title}`,
                android: {
                    channelId: 'task-reminders',
                    smallIcon: 'ic_launcher',
                    color: '#4CAF50',
                },
                data: {
                    taskId: task.id,
                    taskTitle: task.title,
                },
            },
            trigger
        );

        return notificationId;
    };


    const cancelNotification = async (notificationId:string) => {
        await notifee.cancelNotification(notificationId);
    }


    const generateTaskId = () => {
        return Date.now().toString()+Math.random().toString(36).substr(2,9)
    }


    //Generar y mostrar fecha
    const OnDateChange = (event: any, selectedDate?: Date) => {
        setShowTimePicker(false)

        if (selectedDate) {
            setSelected_date(selectedDate)
            setShowTimePicker(true) 
        }
        setShowDatePicker(false)
    }

    //Generar y mostrar hora
    const onTimeChange = (event: any, selectedTime?: Date) => {
        setShowTimePicker(false)
        if (event.type === 'set' && selectedTime) {
            const newDate = new Date(selected_date)
            newDate.setHours(selectedTime.getHours())
            newDate.setMinutes(selectedTime.getMinutes())
            newDate.setSeconds(0)
            newDate.setMilliseconds(0)
            setSelected_date(newDate)
        }
    }

    //Añadir tarea
    const addTasks = async () => {
        if(text.trim() === ''){
            return Alert.alert('La tarea no puede estar vacia')
        }
        const tmp = [...tasks] // copiar array de tareas
        const newTask: Task = {
            id: generateTaskId(),
            title: text.trim(),
            done: false,
            date: selected_date,
        }

        console.log("Nueva tarea creada con fecha:", newTask.date.toString());

        const notificationId = await scheduleNotification(newTask);

        if(notificationId){
            newTask.notificationId = notificationId
        }

        tmp.push(newTask)
        setTasks(tmp)
        storeData(tmp)
        setText('')
        setSelected_date(new Date())

        if(notificationId){
            Alert.alert(
                `La tarea "${newTask.title}", esta agendedada para ${formatDate(selected_date)}`
            )
        }
    }

    console.log(tasks)

    //Marcar tarea como finalizada
    const markDone = async (task: Task) => {
        const tmp = [...tasks]
        const index = tmp.findIndex(el => el.id === task.id)

        if(index !== -1){
            tmp[index].done = !tmp[index].done

            if(tmp[index].done && tmp[index].notificationId){
                await cancelNotification(tmp[index].notificationId)
            }
            else if(!tmp[index].done){
                const notificationId = await scheduleNotification(tmp[index])
                if(notificationId){
                    tmp[index].notificationId = notificationId
                }
            }
        }

        setTasks(tmp)
        storeData(tmp)
    }

    //Eliminar tarea finalizada
    const deleteFunction = (task: Task) => {
        Alert.alert(
            'Confirmas la eliminacion',
            '¿Seguro que deseas eliminar?',
            [
                {text: 'Cancelar', style: 'cancel'},
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => {
                        const tmp = [...tasks]
                        const index = tmp.findIndex(el => el.id === task.id)

                        if(index !== -1){
                            if(task.notificationId){
                                cancelNotification(task.notificationId)
                            }
                            tmp.splice(index, 1)
                            setTasks(tmp)
                            storeData(tmp)
                        }
                    }
                }
            ]
        )
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

    // Función para probar notificación inmediata
const testNotification = async () => {
    try {
        // 1️⃣ Pedir permisos (especialmente importante en Android 13+)
        await notifee.requestPermission();

        // 2️⃣ Crear canal (si no existe, no se duplica)
        const channelId = await notifee.createChannel({
            id: 'test-channel',
            name: 'Canal de prueba',
            importance: 4,
            vibration: true,
        });

        // 3️⃣ Mostrar notificación inmediata
        await notifee.displayNotification({
            title: '🚀 Notificación de prueba',
            body: '¡Funciona!',
            android: {
                channelId,
                smallIcon: 'ic_launcher', // Asegúrate que existe en res/drawable
                color: '#4CAF50',
            },
        });

        console.log('Notificación enviada ✅');
    } catch (error) {
        console.error('Error mostrando la notificación:', error);
    }
};

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
                    <DateTimePicker value={selected_date} mode="date" display="default" onChange={OnDateChange} minimumDate={new Date()}/>
                )}

                {showTimePicker && (
                    <DateTimePicker value={selected_date} mode="time" display="default" onChange={onTimeChange}/>
                )}

                <TouchableOpacity style={estilos.boton} onPress={addTasks}>
                    <Text style={estilos.texto_boton}>Agregar</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={estilos.boton} onPress={testNotification}>
    <Text style={estilos.texto_boton}>Probar Notificación</Text>
</TouchableOpacity>

            <View>
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id} // o algún id único
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
