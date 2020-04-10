import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';

import Header from './components/Header';

function App() {

  /*
   * useState retorna um array com 2 posições
   * 
   * 1. Variável com o seu valor inicial
   * 2. Função para atualizar esse valor
   */

  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [owner, setOwner] = useState('');

  useEffect(() => {
    api.get('projects').then(response => {
      // console.log(response)
      setProjects(response.data);
    });
  }, [])

  async function handleAddProject() {

    if (title === '' || owner === '') {
      alert('Os campos são obrigatórios');
      return false;
    }

    const response = await api.post('projects', {
      title, owner
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="Projetos" />
        <ul>
          {projects.map(project => <li key={project.id}>{project.title}<br /><span className="small">{project.owner}</span></li>)}
        </ul>

        <form>
          <input type="text" 
            placeholder="Projeto"
            onChange={(event)=>setTitle(event.target.value)}
            />
          <input type="text" 
            placeholder="Proprietário"
            onChange={(event)=>setOwner(event.target.value)}
            />
          <button type="button" onClick={handleAddProject}>Adiocionar Projeto</button>
        </form>

    </>
  );
}

export default App;