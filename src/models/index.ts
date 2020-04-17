import { global } from './global';
import { githubPullrequests } from './githubPullrequests';

export interface RootModel {
  global: typeof global;
  githubPullrequests: typeof githubPullrequests;
}

//export { global, githubPullrequests };
export const models: RootModel = { global, githubPullrequests };
