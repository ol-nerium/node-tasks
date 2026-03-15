import { Router } from 'express';
import { ctrl } from '../controllers/auth.js';
import { registerUserSchema } from '../validation/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const authRouter = Router();

authRouter.post(
    '/registration',
    validateBody(registerUserSchema),
    ctrl.registerUserCtrl,
);

export { authRouter };
