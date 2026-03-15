import { UserCollection } from '../models/user.js';

export const registerUser = async (payload) => {
    return await UserCollection.create(payload);
};
