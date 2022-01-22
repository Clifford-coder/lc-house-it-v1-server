import { IResolvers } from 'apollo-server-express';

export const viewerResolvers: IResolvers = {
  Query: {
    authUrl: () => 'Query.authUrl',
  },
  Mutation: {
    logIn: () => 'Mutation.logIn',
    logOut: () => 'Mutation.logOut',
  },
};
