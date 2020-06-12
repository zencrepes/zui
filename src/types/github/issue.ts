import { Repository } from './repository';
import { Milestone } from './milestone';
import { Actor } from './actor';
import { LabelConnection } from './labelConnection';
import { UserConnection } from './userConnection';

export interface Issue {
  id: string;
  createdAt: string;
  updatedAt: string;
  closedAt: string;
  title: string;
  state: string;
  repository: Repository;
  milestone: Milestone;
  url: string;
  number: number;
  author: Actor;
  labels: LabelConnection;
  assignees: UserConnection;
  reviewRequests: any;
  reviews: any;
}