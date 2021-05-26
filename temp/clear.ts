require('dotenv').config();

import { connectDatabase } from '../src/database';

const clear = async () => {
	try {
		console.log('[clear] : running....');
		const db = await connectDatabase();

		const listing = await db.listings.find({}).toArray();
		const booking = await db.bookings.find({}).toArray();
		const user = await db.users.find({}).toArray();

		if (listing.length > 0) await db.listings.drop();
		if (booking.length > 0) await db.listings.drop();
		if (user.length > 0) await db.users.drop();

		console.log('[clearing] : sucsess!');
	} catch (err) {
		throw new Error('failed to clear database');
	}
};

clear();
