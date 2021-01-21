import React, { useState, useEffect } from "react";

import api from './services/api';

import './styles.css';
import './style/app.css'

function App() {
  const [repository, setRepository] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState([]);

  async function handleAddRepository(e) {
    e.preventDefault();
    const response = await api.post('repositories', {
      title,
      techs,
      url,
    })
    setRepository([...repository, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const updatedRepositories = repository.filter(rep => {
      return rep.id !== id;
    });
    setRepository(updatedRepositories);
  }
  useEffect(() => {
    api.get('repositories').then(rep => {
      setRepository(rep.data);
    });
  }, []);

  return (
    <div id="container">
      <form>
        <div className="input-block">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="input-block">
          <label htmlFor="techs">Techs:</label>
          <input
            type="text"
            id="techs"
            value={techs}
            onChange={e => setTechs(e.target.value)}
          />
        </div>
        <div className="input-block">
          <label htmlFor="url">Git Hub URL:</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
        </div>
        <button onClick={handleAddRepository}>Adicionar</button>
      </form>
      <ul data-testid="repository-list">
        {repository.map(rep => {
          return (
            <li key={rep.id}>
              {rep.title}
              <button onClick={() => handleRemoveRepository(rep.id)}>
                Remover
              </button>
            </li>
          );
        })
        }
      </ul>


    </div >
  );
}

export default App;
