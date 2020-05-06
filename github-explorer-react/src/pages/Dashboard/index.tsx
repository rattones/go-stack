import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form>
        <input placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href='#'>
          <img src="https://avatars2.githubusercontent.com/u/28392040?s=460&u=f1110b52c0c0b36a38bd423ccd2c6ea55e611a3c&v=4"
            alt="Marcelo Ratton"/>

          <div>
            <strong>rattones/linux-setup-xubuntu</strong>
            <p>creating a setup to my xubuntu</p>
          </div>

          <FiChevronRight size={20} />
        </a>
        <a href='#'>
          <img src="https://avatars2.githubusercontent.com/u/28392040?s=460&u=f1110b52c0c0b36a38bd423ccd2c6ea55e611a3c&v=4"
            alt="Marcelo Ratton"/>

          <div>
            <strong>rattones/linux-setup-xubuntu</strong>
            <p>creating a setup to my xubuntu</p>
          </div>

          <FiChevronRight size={20} />
        </a>
        <a href='#'>
          <img src="https://avatars2.githubusercontent.com/u/28392040?s=460&u=f1110b52c0c0b36a38bd423ccd2c6ea55e611a3c&v=4"
            alt="Marcelo Ratton"/>

          <div>
            <strong>rattones/linux-setup-xubuntu</strong>
            <p>creating a setup to my xubuntu</p>
          </div>

          <FiChevronRight size={20} />
        </a>
        <a href='#'>
          <img src="https://avatars2.githubusercontent.com/u/28392040?s=460&u=f1110b52c0c0b36a38bd423ccd2c6ea55e611a3c&v=4"
            alt="Marcelo Ratton"/>

          <div>
            <strong>rattones/linux-setup-xubuntu</strong>
            <p>creating a setup to my xubuntu</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  )
}

export default Dashboard;
