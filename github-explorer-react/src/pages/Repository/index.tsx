import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom'

import logoImg from '../../assets/logo.svg';

import { Header, RepositoryInfo, Issues } from './styles';
import { FiChevronsLeft, FiChevronRight } from 'react-icons/fi';

interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();
  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/">
          <FiChevronsLeft size={16} />
          Voltar
        </Link>
      </Header>
      <RepositoryInfo>
        <header>
          <img src="https://avatars1.githubusercontent.com/u/28392040?v=4" alt="Marcelo Ratton" />
          <div>
            <strong>{params.repository}</strong>
            <p>descrição do repositorio</p>
          </div>
        </header>
        <ul>
        <li>
            <strong>1080</strong>
            <span>Stars</span>
          </li>
          <li>
            <strong>10</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>8</strong>
            <span>Issues abertas</span>
          </li>
        </ul>
      </RepositoryInfo>

      <Issues>
        <Link to="issue-teste">
          <div>
            <strong>repository.full_name</strong>
            <p>repository.description</p>
          </div>

          <FiChevronRight size={20} />
        </Link>
      </Issues>
    </>
  )
}

export default Repository;
