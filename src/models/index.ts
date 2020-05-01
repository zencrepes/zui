import { global } from './global';
import { githubPullrequests } from './githubPullrequests';
import { githubVulnerabilities } from './githubVulnerabilities';

export interface RootModel {
  global: typeof global;
  githubPullrequests: typeof githubPullrequests;
  githubVulnerabilities: typeof githubVulnerabilities;
}

//export { global, githubPullrequests };
export const models: RootModel = { global, githubPullrequests, githubVulnerabilities };
