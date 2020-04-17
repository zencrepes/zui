import { init, RematchRootState, RematchDispatch } from '@rematch/core';
//import * as models from './models';
import { models, RootModel } from './models';

export const store = init({
  models,
});

export type Store = typeof store;
//export type Dispatch = typeof store.dispatch;
export type Dispatch = RematchDispatch<RootModel>;
//export type iRootState = RematchRootState<typeof models>;
export type iRootState = RematchRootState<RootModel>;
