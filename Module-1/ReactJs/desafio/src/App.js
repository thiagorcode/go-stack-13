import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repository, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then(rep => {
      setRepository(rep.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Repositório 1',
      techs: 'Aula',
      url: 'api.get.com.br'
    })
    setRepository([...repository, response.data]);
  }

  async function handleRemoveRepository(id) {
    const res = await api.delete(`repositories/${id}`)
    repository.find()

  }

  return (
    <div>
      {repository.map(rep => {
        return (<ul key={rep.id} data-testid="repository-list">
          <li>
            {rep.title}
            <button onClick={() => handleRemoveRepository(rep.id)}>
              Remover
            </button>
          </li>
        </ul>);
      })}

      <button onClick={handleAddRepository}>Adicionar</button>
    </div >
  );
}

export default App;
