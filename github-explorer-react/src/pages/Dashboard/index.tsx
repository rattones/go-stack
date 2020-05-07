import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories, Error } from './styles';
import api from '../../services/api';

interface RepositoryDTO {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  }
}

const Dashboard: React.FC = () => {

  const [ newRepo, setNewRepo ] = useState('');
  const [ inputError, setInputError ] = useState('');
  const [ repositories, setRepositories ] = useState<RepositoryDTO[]>(() => {
    const storageRepositories = localStorage.getItem('@GithubExplorer:repositories');

    return storageRepositories? JSON.parse(storageRepositories): [];
  });

  useEffect(() => {
    localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories));
  }, [repositories])

  async function handleSubmit(event: FormEvent<HTMLFormElement> ): Promise<void> {
    event.preventDefault();
    if(!newRepo) {
      setInputError('Digite autor/repositório para pesquisar');
      return;
    }

    try {
      const response = await api.get<RepositoryDTO>(`repos/${newRepo}`);

      const {
        full_name,
        description,
        stargazers_count,
        forks_count,
        open_issues_count,
        owner: {login,avatar_url}
      }: RepositoryDTO = response.data;

      const repository:RepositoryDTO = {
        full_name,
        description,
        stargazers_count,
        forks_count,
        open_issues_count,
        owner: {login, avatar_url}
      };

      console.log(repository);

      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputError('');

    } catch (err) {
      setInputError('Erro na busca por esse repositório');
    }

  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleSubmit}>
        <input
          value={newRepo}
          onChange={(event) => setNewRepo(event.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      { inputError &&  <Error>{inputError}</Error> }

      <Repositories>
        {repositories.map(repository => (
          <Link key={repository.full_name} to={`repositories/${repository.full_name}`}>
            <img src={repository.owner.avatar_url}
              alt={repository.owner.login}/>

            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
        </Repositories>
    </>
  )
}

export default Dashboard;
