import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Platform,
  TouchableHighlight,
  Alert,
  ScrollView
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import shortid from 'shortid';

const Formulario = ({citas, setCitas, SetMostrarForm}) => {
  const [paciente, setPaciente] = useState('');
  const [propietario, setPropietario] = useState('');
  const [telefono, setTelefono] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [dia, setDia] = useState('');
  const [horario, setHorario] = useState('');
  const [sintomas, setSintomas] = useState('');

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    const opciones = {year: 'numeric', month: 'long', day: '2-digit'};
    let dDate = tempDate.toLocaleDateString('es-ES', opciones);
    console.log(dDate);
    setDia(dDate);
  };

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let hDate = tempDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    setHorario(hDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
    //currentMode = 'date' || 'time'
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  //Crear NUeva Cita
  const crearNuevaCita = () => {
    //Validación
    if( paciente.trim() === ''||
        propietario.trim() === ''||
        telefono.trim() === ''||
        dia.trim() === ''||
        horario.trim() === ''||
        sintomas.trim() === '' ) {
          mostrarAlerta();
          return;
        }
    //Asignación
    const cita = {paciente, propietario, telefono, dia, horario, sintomas};
    cita.id = shortid.generate();
    const citasNuevo = [...citas, cita];
    setCitas(citasNuevo);
    //Ocultar Formulario
    SetMostrarForm(false)
    //Resetear Formulario
  };

  const mostrarAlerta = () => {
    Alert.alert(
      'Error', //titulo
      'Todos los campos son obligatorios', //cuerpo del msje.
      [{
        text: 'OK' // Array de btns.
      }]
    )
  }

  return (
    <>
      <ScrollView style={styles.formulario}>
        <View>
          <Text style={styles.label}>Paciente:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => setPaciente(texto)}
            keyboardType="default"
          />
        </View>

        <View>
          <Text style={styles.label}>Dueño:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => setPropietario(texto)}
            keyboardType="default"
          />
        </View>

        <View>
          <Text style={styles.label}>Télefono contacto:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => setTelefono(texto)}
            keyboardType="numeric"
          />
        </View>

        <View>
          <View style={styles.btnDate}>
          <TouchableHighlight
            onPress={() => showDatepicker()}
            style={styles.btnTopModal}>
            <Text style={styles.btnModal}>Escoge un día</Text>            
          </TouchableHighlight>
          <Text>{dia === '' ? null : 'Día: ' + dia}</Text>
            {/* <Button onPress={() => showDatepicker()} title="Escoge un día" />
            <Text>{dia === '' ? null : 'Día: ' + dia}</Text> */}
          </View>
          <View>
          <TouchableHighlight
            onPress={() => showTimepicker()}
            style={styles.btnTopModal}>
            <Text style={styles.btnModal}>Escoge una hora</Text>            
          </TouchableHighlight>
            {/* <Button onPress={() => showTimepicker()} title="Escoge una hora" /> */}
            <Text>{horario === '' ? null : 'Hora: ' + horario}</Text>
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={mode === 'date' ? onChangeDate : onChangeTime}
              locale="es_ES"
            />
          )}
        </View>

        <View>
          <Text style={styles.label}>Sintomas:</Text>
          <TextInput
            multiline
            style={styles.input}
            onChangeText={texto => setSintomas(texto)}
            keyboardType="default"
          />
        </View>

        <View>
          <TouchableHighlight
            onPress={() => crearNuevaCita()}
            style={styles.btnSubmit}>
            <Text style={styles.textoSubmit}>Crear Nueva Cita</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#E8D0B3',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
  input: {
    marginTop: 10,
    height: 50,
    backgroundColor: '#e1e1e1',
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  btnDate: {
    marginTop: 20,
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: '#7EB5A6',
    marginVertical: 10,
},
textoSubmit: {
  color: '#86340A',
  fontWeight: 'bold',
  textAlign: 'center',
},
btnTopModal: {
  padding: 10,
  backgroundColor: '#86340A',
  marginVertical: 10,
},
btnModal: {
  color: '#E8D0B3',
  fontWeight: 'bold',
  textAlign: 'center',
}
});

export default Formulario;
