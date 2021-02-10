import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import { Title, Form, Repositories } from './style';
// 17:23
const Dashboard: React.FC = () => (
  <>
    <img src={logoImg} alt="Git Hub Explorer" />
    <Title>Explore repositórios no Github</Title>
    <Form>
      <input placeholder="Digite o nome do repositório" />
      <button type="submit">Pesquisar</button>
    </Form>
    <Repositories>
      <a href="Teste">
        <img src="https://avatars.githubusercontent.com/u/54317829?s=460&u=4be6d3b6128129b992f3b6b0673d6d4ae3b9f6ae&v=4" alt="Foto de perfil" />
        <div>
          <strong>thiagorcode/ElectronStudies</strong>
          <p>Estudos de ElectronJS</p>
        </div>
        <FiChevronRight size={20} />
      </a>
    </Repositories>

  </>
);

export default Dashboard;
