import { MongoClient } from 'mongodb';

import { Database, Booking, Listing, User } from '../lib/types';

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.sma3w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
	const client = await MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });

	const db = client.db('tinyhouse_main');

	return {
		bookings: db.collection<Booking>('bookings'),
		listings: db.collection<Listing>('listings'),
		users: db.collection<User>('users'),
	};
};
