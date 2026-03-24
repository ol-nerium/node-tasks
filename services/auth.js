import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';

import { UserCollection } from '../models/user.js';
import { httpError } from '../utils/httpError.js';

import { FIFTEEN_MINUTES, MONTH, TEMPLATES_DIR } from '../constants/index.js';

import { SessionCollection } from '../models/session.js';

import { getEnvVariable } from '../utils/getEnvVariable.js';

import { sendEmail } from '../utils/sendMail.js';

import { SMTP } from '../constants/index.js';

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

    const isEqual = await bcrypt.compare(payload.password, user.password);
    console.log(isEqual);
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

export const requestResetEmail = async (email) => {
    const user = UserCollection.findOne({ email });
    if (!user) {
        throw httpError(404, 'User not found');
    }

    //
};

export const requestResetToken = async (email) => {
    const user = await UserCollection.findOne({ email });
    if (!user) {
        throw httpError(404, 'User not found');
    }

    const resetToken = jwt.sign(
        {
            sub: user._id,
            email,
        },
        getEnvVariable('JWT_SECRET'),
        { expiresIn: '15m' },
    );

    const resetPasswordTemplatePath = path.join(
        TEMPLATES_DIR,
        'reset-password-email.html',
    );
    const templateSource = (
        await fs.readFile(resetPasswordTemplatePath)
    ).toString();
    const template = handlebars.compile(templateSource);
    const html = template({
        name: user.name,
        link: `${getEnvVariable('APP_DOMAIN')}/reset-password?token=${resetToken}`,
    });

    await sendEmail({
        from: getEnvVariable(SMTP.SMTP_FROM),
        to: email,
        subject: 'Reset your password',
        html,
    });
};

export const resetPassword = async (payload) => {
    let entries;

    try {
        entries = jwt.verify(payload.token, getEnvVariable('JWT_SECRET'));
    } catch (error) {
        throw httpError(401, error.message);
    }

    const user = await UserCollection.findOne({
        email: entries.email,
        _id: entries.sub,
    });

    if (!user) {
        throw httpError(404, 'User not found');
    }

    const encryptedPassword = await bcrypt.hash(payload.password, 10);

    await UserCollection.updateOne(
        { _id: user.id },
        { password: encryptedPassword },
    );
};
