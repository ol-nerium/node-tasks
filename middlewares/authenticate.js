import { SessionCollection } from '../models/session.js';
import { UserCollection } from '../models/user.js';
import { httpError } from '../utils/httpError.js';

export const authenticate = async (req, res, next) => {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        next(httpError(401, 'Please provide Authorization header'));
        return;
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
        next(401, 'Auth header should be of type Bearer');
        return;
    }
    const session = await SessionCollection.findOne({ accessToken: token });

    if (!session) {
        next(httpError(401, 'Session not found'));
        return;
    }

    const isAccessTokenExpired =
        new Date() > new Date(session.accessTokenValidUntil);

    if (isAccessTokenExpired) {
        next(httpError(401, 'Session access token expired'));
        return;
    }

    // const user = await UserCollection.findOne({ _id: session.userId });
    const user = await UserCollection.findById(session.userId);
    if (!user) {
        next(httpError(401));
        return;
    }

    req.user = user;

    next();
};
