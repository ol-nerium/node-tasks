import { Router } from 'express';
import { ctrl } from '../controllers/auth.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
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

export { authRouter };
