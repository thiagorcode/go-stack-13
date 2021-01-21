import React, { useState } from 'react';

import './App.css'
import backgroundImage from './assets/background.jpg'

import Header from './components/Header';

/**
 * Componente 
 * Propriedade
 * Estado & Imutabilidade
 */

function App() {
  const [projects, setProjects] = useState(['Desenvolveimento de App', 'Front-End Web']);

  function handleAddProject() {
    setProjects([...projects, `Novo Projeto | | |${Date.now()}`])
  }
  return (
    <>
      <Header title="Projects">
        <img width={400} src={backgroundImage} alt="background" />
        <ul>
          {projects.map(project => <li key={project}>{project}</li>)}
        </ul>

        <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
      </Header>
    </>
  )
}

export default App;