import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories, Error } from './styles';
import api from '../../services/api';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  }
}

const Dashboard: React.FC = () => {

  const [ newRepo, setNewRepo ] = useState('');
  const [ inputError, setInputError ] = useState('');
  const [ repositories, setRepositories ] = useState<Repository[]>([]);

  async function handleSubmit(event: FormEvent<HTMLFormElement> ): Promise<void> {
    event.preventDefault();
    if(!newRepo) {
      setInputError('Digite autor/repositório para pesquisar');
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);

      // console.log(response);

      const repository = response.data;

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
          <a key={repository.full_name} href='#'>
            <img src={repository.owner.avatar_url}
              alt={repository.owner.login}/>

            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </a>

        ))}
        </Repositories>
    </>
  )
}

export default Dashboard;
