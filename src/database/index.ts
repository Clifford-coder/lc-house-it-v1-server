import { MongoClient } from 'mongodb';

import { Database } from '../lib/types';

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.rwksy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
	const client = await MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });

	const db = client.db('tinyhouse_main');

	return {
		listings: db.collection('test_listings'),
	};
};
