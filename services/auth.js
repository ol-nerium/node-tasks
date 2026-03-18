import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';

import { UserCollection } from '../models/user.js';
import { httpError } from '../utils/httpError.js';

import { FIFTEEN_MINUTES, MONTH } from '../constants/index.js';

import { SessionCollection } from '../models/session.js';

const createSession = () => {
    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');

    return {
        accessToken,
        refreshToken,
        accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
        refreshTokenValidUntil: new Date(Date.now() + MONTH),
    };
};

export const registerUser = async (payload) => {
    const user = await UserCollection.findOne({ email: payload.email });
    if (user) throw httpError(409, 'Email already in use');

    const encryptedPassword = await bcrypt.hash(payload.password, 10);

    return await UserCollection.create({
        ...payload,
        password: encryptedPassword,
    });
};

export const loginUser = async (payload) => {
    const user = await UserCollection.findOne({ email: payload.email });
    if (!user) throw httpError(404, 'Wrong email or password');

    const isEqual = bcrypt.compare(payload.password, user.password);
    if (!isEqual) {
        throw httpError(401);
    }

    await SessionCollection.deleteOne({ userId: user._id });

    const newSession = createSession();

    return await SessionCollection.create({
        userId: user._id,
        ...newSession,
    });
};

export const logoutUser = async (sessionId) => {
    await SessionCollection.deleteOne({ _id: sessionId });
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
    const session = await SessionCollection.findOne({
        _id: sessionId,
        refreshToken,
    });

    if (!session) {
        throw httpError(401, 'Session not found');
    }

    const isSessionTokenExpired =
        new Date() > new Date(session.refreshTokenValidUntil);

    if (isSessionTokenExpired) {
        throw httpError(401, 'Session token expired');
    }

    const newSession = createSession();

    await SessionCollection.deleteOne({ _id: sessionId, refreshToken });

    return await SessionCollection.create({
        userId: session.userId,
        ...newSession,
    });
};
