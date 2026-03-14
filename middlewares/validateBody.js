import { httpError } from '../utils/httpError.js';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    // console.log(error.details[0].message)
    next(httpError(400, error));
  }
};
