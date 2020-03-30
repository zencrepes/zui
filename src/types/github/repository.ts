import { RepositoryOwner } from './repositoryOwner';

export interface Repository {
  id: string;
  name: string;
  url: string;
  owner: RepositoryOwner;
}
