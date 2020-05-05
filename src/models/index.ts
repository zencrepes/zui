import { global } from './global';
import { githubPullrequests } from './githubPullrequests';
import { githubVulnerabilities } from './githubVulnerabilities';
import { githubRepositories } from './githubRepositories';

export interface RootModel {
  global: typeof global;
  githubPullrequests: typeof githubPullrequests;
  githubVulnerabilities: typeof githubVulnerabilities;
  githubRepositories: typeof githubRepositories;
}

//export { global, githubPullrequests };
export const models: RootModel = { global, githubPullrequests, githubVulnerabilities, githubRepositories };
