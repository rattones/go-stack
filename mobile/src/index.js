import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';

import api from './services/api';

export default function App() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [owner, setOwner] = useState('');

  useEffect(() => {
    api.get('projects').then((response) => {
      console.log(response.data);
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    const response = await api.post('projects', {
      title,
      owner,
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={(project) => project.id}
          renderItem={({item: project}) => (
            <>
              <Text style={styles.title}>{project.title}</Text>
              <Text style={styles.owner}>{project.owner}</Text>
            </>
          )}
        />

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Título do Projeto"
            onChangeText={(text) => setTitle(text)}
            value={title}
          />
          <TextInput
            style={styles.input}
            placeholder="Proprietário"
            onChangeText={(text) => setOwner(text)}
            value={owner}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleAddProject}>
          <Text style={styles.buttonText}>Adcionar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#369',
    padding: 10,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  owner: {
    color: '#ccc',
    fontSize: 25,
    paddingLeft: 30,
  },
  button: {
    backgroundColor: '#fff',
    margin: 20,
    height: 50,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  formContainer: {
    padding: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 4,
    borderColor: '#ccc',
    marginTop: 10,
  },
});
