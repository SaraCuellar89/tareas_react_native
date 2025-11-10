import { StyleSheet, Dimensions } from "react-native";

const estilos = StyleSheet.create({
    container: {
        width: '100%',
        padding: 20
    },
    title: {
        fontSize: 20,
        color: 'darkred'
    },
    text: {
        fontSize: 16,
        color: '#6f6f6f'
    },
    textinput: {
        borderColor: '#6f6f6f',
        borderWidth: 1,
        borderRadius: 15,
        width: Dimensions.get('screen').width * 0.6
    },
    inputcontainer: {
        marginTop: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    caja_tarea: {
        flexDirection: 'row',
        gap: 10,
    },
    boton_fecha: {
        backgroundColor: '#5897fb',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        width: Dimensions.get('screen').width * 0.25,
        // Añadí algo de padding para que el texto no quede muy apretado
        paddingVertical: 5
    },
    boton: {
        backgroundColor: '#5b1515ff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        width: Dimensions.get('screen').width * 0.70,
        // Añadí algo de padding para que el texto no quede muy apretado
        paddingVertical: 10,
        marginBottom: 20
    },
    texto_boton: {
        color: 'white',
    },
    itemcointaner:{
        paddingVertical: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textDone: {
        fontSize: 16, 
        color: 'darkgreen',
        textDecorationLine: 'line-through'
    },
    removeBoton:{
        backgroundColor: 'darkred',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderRadius: 10
    },
    removeText:{
        color: 'white'
    }
})

export default estilos