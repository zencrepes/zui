import { UserEdge } from './userEdge';

export interface UserConnection {
  edges: UserEdge[];
  totalCount: number;
}
