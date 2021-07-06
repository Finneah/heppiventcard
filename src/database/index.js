import VasernDB from './db';

// import {UserSchema} from './Schemas/UserSchema';
// import {StampsSchema} from './Schemas/StampsSchema';
// import {StampCardsSchema} from './Schemas/StampCardsSchema';

const {StampCards, Stamps, User} = VasernDB;

export default VasernDB;

// StampCards.validateProps(Object.keys(new StampCardsSchema().props));
// Stamps.validateProps(Object.keys(new StampsSchema().props));
// User.validateProps(Object.keys(new UserSchema().props));

export {StampCards, Stamps, User};
