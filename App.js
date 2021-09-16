import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import Cita from './components/Cita';
import Formulario from './components/Formulario';

const App = () => {
  const [mostrarForm, SetMostrarForm] = useState(false);
  const [citas, setCitas] = useState([
    {id: '1', paciente: 'Terry', propietario: 'Pedro Saldiva', sintomas: 'Está decaido'},
  ]);

  const eliminarPaciente = id => {
    setCitas(citasActuales => {
      return citasActuales.filter(cita => cita.id !== id);
    });
  };

  const mostrarFormulario = () => {
    SetMostrarForm(!mostrarForm);
  };

  const cerrarTeclado = () => {
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador de Citas</Text>
        <Text style={styles.subtitulo}>Veterinaria Canina</Text>
        <View>
          <TouchableHighlight
            onPress={() => mostrarFormulario()}
            style={styles.btnForm}>
            <Text style={styles.textoForm}>{mostrarForm ? 'Cancelar Crear Cita' : 'Crear Nueva Cita'}</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.contenido}>
          {mostrarForm ? (
            <>
              <Text style={styles.titulo}>Crear Nueva Cita</Text>
              <Formulario
                citas={citas}
                setCitas={setCitas}
                SetMostrarForm={SetMostrarForm}
              />
            </>
          ) : (
            <>
              <Text style={styles.titulo}>
                {citas.length > 0 ? 'Administra tus citas' : 'No hay citas'}
              </Text>

              <FlatList
                style={styles.listado}
                data={citas}
                renderItem={({item}) => (
                  <Cita item={item} eliminarPaciente={eliminarPaciente} />
                )}
                keyExtractor={cita => cita.id}
              />
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  //7EB5A6
  //86340A
  //C36839
  //E8D0B3
  contenedor: {
    backgroundColor: '#C36839',
    flex: 1,
  },
  titulo: {
    textAlign: 'center',
    marginTop: Platform.OS === 'ios' ? 40 : 10,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E8D0B3',
  },
  subtitulo: {
    textAlign: 'center',
    marginTop: Platform.OS === 'ios' ? 10 : 5,
    marginBottom: 20,
    fontSize: 16,
    color: '#E8D0B3',
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  listado: {
    flex: 1,
  },
  btnForm: {
    padding: 10,
    backgroundColor: '#7EB5A6',
    marginVertical: 10,
  },
  textoForm: {
    color: '#86340A',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
