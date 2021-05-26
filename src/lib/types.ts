import { ObjectId, Collection } from 'mongodb';

export enum ListingType {
	Apartment = 'APARTMENT',
	House = 'HOUSE',
}
export interface BookingsIndexMonth {
	[key: string]: boolean;
}
export interface BookingsIndexYear {
	[key: string]: BookingsIndexMonth;
}

export interface BookingsIndex {
	[key: string]: BookingsIndexYear;
}
export interface Listing {
	_id: ObjectId; //starts with underscore because mongo requires so.
	title: string;
	description: string;
	image: string;
	host: string;
	type: ListingType;
	address: string;
	country: string;
	admin: string;
	city: string;
	bookings: ObjectId[];
	bookingsIndex: BookingsIndex;
	price: number;
	numOfGuests: number;
}
export interface User {
	_id: string;
	token: string;
	name: string;
	avatar: string;
	contact: string;
	walletId: string | undefined;
	income: number;
	bookings: ObjectId[];
	listings: ObjectId[];
}

export interface Booking {
	_id: ObjectId;
	tenant: string;
	checkIn: string;
	checkOut: string;
}
export interface Database {
	listings: Collection<Listing>;
	users: Collection<User>;
	bookings: Collection<Booking>;
}

//-----TS Generics------
/* It is a tool that exist in C# and Java to help create reuseable components that can work with a variety of 
different types. This is same for TS. It allows us to create code that can work with different types. It 
does so by allowing us to abstract types used in funtions and variables. 
eg from the ts docs
*/
//Eg 1.
//  const identity = <T>(args:T):T => args

//  identity<number>(9);
//  identity<string>('9');

//Eg 2.
// interface IdentityObj<T> {
//   field : T;
// }
// const identity = <T>(args:T) :T =>{
//   const obj : IdentityObj<T> = {
//     field: args
//   }

//   return obj.field
// }
