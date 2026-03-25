import { Router } from 'express';
import { ctrl } from '../controllers/auth.js';
import {
    loginUserSchema,
    loginWithGoogleOAuthSchema,
    registerUserSchema,
    requestResetEmailSchema,
    resetPasswordSchema,
} from '../validation/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const authRouter = Router();

authRouter.post(
    '/registration',
    validateBody(registerUserSchema),
    ctrl.registerUserCtrl,
);

authRouter.post('/login', validateBody(loginUserSchema), ctrl.loginUserCtrl);

authRouter.post('/refresh', ctrl.refreshUserSessionCtrl);

authRouter.post('/logout', ctrl.logoutUserCtrl);

authRouter.post(
    '/request-reset-email',
    validateBody(requestResetEmailSchema),
    ctrl.requestResetEmailCtrl,
);

authRouter.post(
    '/reset-password',
    validateBody(resetPasswordSchema),
    ctrl.resetPasswordCtrl,
);

authRouter.get('/get-oauth-url', ctrl.getGoogleOAuthUrlCtrl);

authRouter.post(
    '/confirm-oauth',
    validateBody(loginWithGoogleOAuthSchema),
    ctrl.loginWithGoogleCtrl,
);

export { authRouter };
