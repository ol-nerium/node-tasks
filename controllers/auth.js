import { registerUser } from '../services/auth.js';

import { ctrlWrapper } from '../utils/ctrlWraper.js';

const registerUserCtrl = async (req, res, next) => {
    const newUser = await registerUser(req.body);

    console.log(newUser);

    res.status(201).json({
        status: 201,
        message: 'Successfully registered a user!',
        data: newUser,
    });
};

export const ctrl = {
    registerUserCtrl: ctrlWrapper(registerUserCtrl),
};
