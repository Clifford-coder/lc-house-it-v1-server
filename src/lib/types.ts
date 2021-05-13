import { ObjectId, Collection } from 'mongodb';

export interface Listing {
	_id: ObjectId; //starts with underscore because mongo requires so.
	title: string;
	image: string;
	address: string;
	price: number;
	numOfGuests: number;
	numOfBeds: number;
	numOfBaths: number;
	rating: number;
}

export interface Database {
	listings: Collection<Listing>;
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
