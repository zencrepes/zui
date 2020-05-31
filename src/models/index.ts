import { global } from './global';
import { githubPullrequests } from './githubPullrequests';
import { githubVulnerabilities } from './githubVulnerabilities';
import { githubRepositories } from './githubRepositories';
import { githubWatchers } from './githubWatchers';
import { githubLabels } from './githubLabels';
import { githubMilestones } from './githubMilestones';
import { githubProjects } from './githubProjects';
import { githubReleases } from './githubReleases';
import { githubIssues } from './githubIssues';
import { jiraIssues } from './jiraIssues';
import { circleciEnvvars } from './circleciEnvvars';
import { circleciPipelines } from './circleciPipelines';
import { circleciInsights } from './circleciInsights';

export interface RootModel {
  global: typeof global;
  githubPullrequests: typeof githubPullrequests;
  githubVulnerabilities: typeof githubVulnerabilities;
  githubRepositories: typeof githubRepositories;
  githubWatchers: typeof githubWatchers;
  githubLabels: typeof githubLabels;
  githubMilestones: typeof githubMilestones;
  githubProjects: typeof githubProjects;
  githubReleases: typeof githubReleases;
  githubIssues: typeof githubIssues;
  jiraIssues: typeof jiraIssues;
  circleciEnvvars: typeof circleciEnvvars;
  circleciPipelines: typeof circleciPipelines;
  circleciInsights: typeof circleciInsights;
}

export const models: RootModel = {
  global,
  githubPullrequests,
  githubVulnerabilities,
  githubRepositories,
  githubWatchers,
  githubLabels,
  githubMilestones,
  githubProjects,
  githubReleases,
  githubIssues,
  jiraIssues,
  circleciEnvvars,
  circleciPipelines,
  circleciInsights,
};
