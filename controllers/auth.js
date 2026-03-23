import { MONTH } from '../constants/index.js';
import {
    loginUser,
    logoutUser,
    refreshUsersSession,
    registerUser,
    requestResetToken,
} from '../services/auth.js';

import { ctrlWrapper } from '../utils/ctrlWraper.js';

import { resetPassword } from '../services/auth.js';

const setupSession = (res, session) => {
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + MONTH),
    });
    res.cookie('sessionId', session.id, {
        httpOnly: true,
        expires: new Date(Date.now() + MONTH),
    });
};

const registerUserCtrl = async (req, res) => {
    const newUser = await registerUser(req.body);

    res.json({
        status: 201,
        message: 'Successfully registered a user!',
        data: newUser,
    });
};

const loginUserCtrl = async (req, res) => {
    // const user =
    const session = await loginUser(req.body);
    setupSession(res, session);

    res.json({
        status: 200,
        message: 'Successfully logged in a user!',
        data: { accessToken: session.accessToken },
    });
};

const refreshUserSessionCtrl = async (req, res) => {
    const session = await refreshUsersSession({
        sessionId: req.cookies.sessionId,
        refreshToken: req.cookies.refreshToken,
    });
    setupSession(res, session);

    res.json({
        status: 200,
        message: 'Successfully refreshed a session',
        data: {
            accessToken: session.accessToken,
        },
    });
};

const logoutUserCtrl = async (req, res) => {
    if (req.cookies.sessionId) {
        await logoutUser(req.cookies.sessionId);
    }

    res.clearCookie('refreshToken');
    res.clearCookie('sessionId');

    res.status(204).send();
};

const requestResetEmailCtrl = async (req, res) => {
    await requestResetToken(req.body.email);

    res.json({
        message: 'Reset password email was successfully sent',
        status: 200,
        data: {},
    });
};

const resetPasswordCtrl = async (req, res) => {
    await resetPassword(req.body);
    res.json({
        message: 'Password was successfully reset',
        status: 200,
        data: {},
    });
};

export const ctrl = {
    registerUserCtrl: ctrlWrapper(registerUserCtrl),
    loginUserCtrl: ctrlWrapper(loginUserCtrl),
    logoutUserCtrl: ctrlWrapper(logoutUserCtrl),
    refreshUserSessionCtrl: ctrlWrapper(refreshUserSessionCtrl),
    requestResetEmailCtrl: ctrlWrapper(requestResetEmailCtrl),
    resetPasswordCtrl: ctrlWrapper(resetPasswordCtrl),
};
