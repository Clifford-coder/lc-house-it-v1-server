import { IResolvers } from 'apollo-server-express';
import { ObjectId } from 'bson';
import { Database, Listing } from '../../../lib/types';

export const listingResolvers: IResolvers = {
	Query: {
		listings: async (
			_root: undefined,
			_args: Record<string, unknown>,
			{ db }: { db: Database }
		): Promise<Listing[]> => await db.listings.find({}).toArray(),
	},
	Mutation: {
		deleteListing: async (_root: undefined, { id }: { id: string }, { db }: { db: Database }): Promise<Listing> => {
			const delteResult = await db.listings.findOneAndDelete({ _id: new ObjectId(id) });
			if (!delteResult.value) throw new Error('Failed to delete item of id ' + id);
			return delteResult.value;
		},
	},
	Listing: {
		id: (listing: Listing): string => listing._id.toHexString(),
	},
};
