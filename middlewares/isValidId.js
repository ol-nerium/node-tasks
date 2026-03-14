import { isValidObjectId } from 'mongoose';
import { httpError } from '../utils/httpError.js';

export const isValidId = (req, res, next) => {
    const { contactId } = req.params;
    if (!isValidObjectId(contactId)) {
        return next(httpError(400));
    }
    next();
};
