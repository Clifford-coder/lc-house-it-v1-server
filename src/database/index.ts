import { MongoClient } from 'mongodb';

import { Database, Booking, Listing, User } from '../lib/types';

const url = `${process.env.MONGO_URI}`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  const db = client.db('lc_house_it');

  return {
    bookings: db.collection<Booking>('bookings'),
    listings: db.collection<Listing>('listings'),
    users: db.collection<User>('users'),
  };
};
