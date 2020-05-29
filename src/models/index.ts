import { global } from './global';
import { githubPullrequests } from './githubPullrequests';
import { githubVulnerabilities } from './githubVulnerabilities';
import { githubRepositories } from './githubRepositories';
import { githubWatchers } from './githubWatchers';
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
  jiraIssues: typeof jiraIssues;
  circleciEnvvars: typeof circleciEnvvars;
  circleciPipelines: typeof circleciPipelines;
  circleciInsights: typeof circleciInsights;
}

//export { global, githubPullrequests };
export const models: RootModel = {
  global,
  githubPullrequests,
  githubVulnerabilities,
  githubRepositories,
  githubWatchers,
  jiraIssues,
  circleciEnvvars,
  circleciPipelines,
  circleciInsights,
};
