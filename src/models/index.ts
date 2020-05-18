import { global } from './global';
import { githubPullrequests } from './githubPullrequests';
import { githubVulnerabilities } from './githubVulnerabilities';
import { githubRepositories } from './githubRepositories';
import { githubWatchers } from './githubWatchers';
import { jiraIssues } from './jiraIssues';

export interface RootModel {
  global: typeof global;
  githubPullrequests: typeof githubPullrequests;
  githubVulnerabilities: typeof githubVulnerabilities;
  githubRepositories: typeof githubRepositories;
  githubWatchers: typeof githubWatchers;
  jiraIssues: typeof jiraIssues;
}

//export { global, githubPullrequests };
export const models: RootModel = {
  global,
  githubPullrequests,
  githubVulnerabilities,
  githubRepositories,
  githubWatchers,
  jiraIssues,
};
