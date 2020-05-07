import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom'

import logoImg from '../../assets/logo.svg';

import { Header, RepositoryInfo, Issues, Loading } from './styles';
import { FiChevronsLeft, FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

interface RepositoryParams {
  repository: string;
}

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

interface Issue {
  id: string;
  title: string;
  html_url: string;
  user: {
    login: string;
  }
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  const [repository, setRepository] = useState<RepositoryDTO | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  async function getRepositoryLocalData(repositoryName: string): Promise<RepositoryDTO | null>  {
    const storageData = localStorage.getItem('@GithubExplorer:repositories');
    if (!storageData) {
      return null;
    }
    const repositories = JSON.parse(storageData);

    const repository = repositories.filter((repo:RepositoryDTO) => repo.full_name === repositoryName);

    return repository.pop();
  }

  useEffect(() => {
    getRepositoryLocalData(params.repository)
      .then(response => {
        setRepository(response);
      });
    api.get(`repos/${params.repository}/issues`)
      .then(response => {
        setIssues(response.data);
      });
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/">
          <FiChevronsLeft size={16} />
          Voltar
        </Link>
      </Header>
      { repository ? (
        <RepositoryInfo>
          <header>
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
            <div>
              <strong>{repository.owner.login}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      ) : (
        <Loading>Carregando... </Loading>
      )}

      <Issues>
        {issues.map(issue => (
          <a key={issue.id} href={issue.html_url} target="_blank">
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  )
}

export default Repository;
