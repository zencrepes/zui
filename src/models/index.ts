import { global } from './global';
import { loading } from './loading';
import { chip } from './chip';
import { githubPullrequests } from './githubPullrequests';
import { githubVulnerabilities } from './githubVulnerabilities';
import { githubRepositories } from './githubRepositories';
import { githubMavenPoms } from './githubMavenPoms';
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
import { testingStates } from './testingStates';
import { testingRuns } from './testingRuns';
import { bambooRuns } from './bambooRuns';

export interface RootModel {
  global: typeof global;
  loading: typeof loading;
  chip: typeof chip;
  githubPullrequests: typeof githubPullrequests;
  githubVulnerabilities: typeof githubVulnerabilities;
  githubRepositories: typeof githubRepositories;
  githubMavenPoms: typeof githubMavenPoms;
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
  testingStates: typeof testingStates;
  testingRuns: typeof testingRuns;
  bambooRuns: typeof bambooRuns;
}

export const models: RootModel = {
  global,
  loading,
  chip,
  githubPullrequests,
  githubVulnerabilities,
  githubRepositories,
  githubMavenPoms,
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
  testingStates,
  testingRuns,
  bambooRuns,
};
