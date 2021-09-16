import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight
} from 'react-native';

const Cita = ({item, eliminarPaciente}) => {

    const dialogoEliminar = (id) => {
        console.log('Eliminando ...', id);
        eliminarPaciente(id);
    }

    return ( 
        <View style={styles.cita}>
            <View>
                <Text style={styles.label}>Paciente:</Text>
                <Text style={styles.texto}>{item.paciente}</Text>
            </View>
            <View>
                <Text style={styles.label}>Propietario:</Text>
                <Text style={styles.texto}>{item.propietario}</Text>
            </View>
            <View>
                <Text style={styles.label}>Sintomas:</Text>
                <Text style={styles.texto}>{item.sintomas}</Text>
            </View>
            {/* <Button 
                title='Eliminar'
            /> */}
            <View>
                <TouchableHighlight onPress={() => dialogoEliminar(item.id)} style={styles.btnEliminar}>
                    <Text style={styles.textoEliminar}> Eliminar &times; </Text>
                </TouchableHighlight>
            </View>
        </View>
        
     );
}

const styles = StyleSheet.create({
    cita: {
        backgroundColor: '#E8D0B3',
        borderBottomColor: '#e1e1e1',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20,
    },
    texto: {
        fontSize: 18,
    },
    btnEliminar: {
        padding: 10,
        backgroundColor: '#7EB5A6',
        marginVertical: 10,
    },
    textoEliminar: {
        color: '#86340A',
        fontWeight: 'bold',
        textAlign: 'center',
    }
})
 
export default Cita;