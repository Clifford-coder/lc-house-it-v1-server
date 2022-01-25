import * as crypto from 'crypto';
import { IResolvers } from 'apollo-server-express';
import { Google } from '../../../lib/api';
import { Database, User, Viewer } from '../../../lib/types';
import { LogInArgs } from './types';

const logInViaGoogle = async (
  code: string,
  token: string,
  db: Database
): Promise<User | undefined> => {
  const { user } = await Google.logIn(code);

  if (!user) {
    throw new Error('Google login error');
  }

  //user id
  const userId =
    user.names && user.names.length ? user.names[0].metadata?.source?.id : null;

  // user display name
  const userName =
    user.names && user.names.length ? user.names[0].displayName : null;

  // user avatar
  const userAvatar =
    user.photos && user.photos.length ? user.photos[0].url : null;

  // user email
  const userEmail =
    user.emailAddresses && user.emailAddresses.length
      ? user.emailAddresses[0].value
      : null;

  if (!userName || !userAvatar || !userEmail || !userId)
    throw new Error('Google login error');

  // check for existing users
  const updateRes = await db.users.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        name: userName,
        avatar: userAvatar,
        contact: userEmail,
        token,
      },
    },
    { returnOriginal: false }
  );

  let viewer = updateRes.value;

  if (!viewer) {
    const insertResult = await db.users.insertOne({
      _id: userId,
      token,
      name: userName,
      avatar: userAvatar,
      contact: userEmail,
      income: 0,
      bookings: [],
      listings: [],
    });

    viewer = insertResult.ops[0];

    return viewer;
  }
};

export const viewerResolvers: IResolvers = {
  Query: {
    authUrl: () => {
      try {
        return Google.authUrl;
      } catch (error) {
        throw new Error(`Failed to query Google Auth Url: ${error}`);
      }
    },
  },
  Mutation: {
    logIn: async (
      _parent: undefined,
      { input }: LogInArgs,
      { db }: { db: Database }
    ): Promise<Viewer> => {
      try {
        const code = input.code || null;
        // create session token
        const token = crypto.randomBytes(16).toString('hex');

        const viewer: User | undefined = code
          ? await logInViaGoogle(code, token, db)
          : undefined;

        if (!viewer) return { didRequest: true };

        return {
          didRequest: true,
          _id: viewer._id,
          token: viewer.token,
          avatar: viewer.avatar,
          walletId: viewer.walletId,
        };
      } catch (error) {
        throw new Error(`Failed to log in: ${error}`);
      }
    },
    logOut: (): Viewer => {
      try {
        return { didRequest: true };
      } catch (error) {
        throw new Error(`Failed to log out`);
      }
    },
  },
  Viewer: {
    id: (viewer: Viewer): string | undefined => viewer._id,
    hasWallet: (viewer: Viewer): true | undefined =>
      viewer.walletId ? true : undefined,
  },
};
