import { ProjectColumn } from './projectColumn';
import { Project } from './project';

export interface ProjectCard {
  id: string;
  column: ProjectColumn;
  project: Project;
}
