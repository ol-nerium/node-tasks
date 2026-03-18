import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const createContactSchema = Joi.object({
    name: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    email: Joi.string(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal'),
    userId: Joi.string().custom((value, helpers) => {
        if (value && !isValidObjectId(value)) {
            return helpers.message('User id should be a valid mongo id');
        }
        return true;
    }),
});

const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).messages({
        'string.base': 'Username should be a string',
        'string.min': 'Username should have at least {#limit} characters',
        'string.max': 'Username should have at most {#limit} characters',
        'any.required': 'Username is required',
    }),
    phoneNumber: Joi.string().min(3).max(20).messages({
        'string.base': 'Phone Number should be a string',
        'string.min': 'Phone Number should have at least {#limit} characters',
        'string.max': 'Phone Number should have at most {#limit} characters',
    }),
    email: Joi.string().min(3).max(20).pattern(emailRegex).messages({
        'string.base': 'Email should be a string',
        'string.min': 'Email should have at least {#limit} characters',
        'string.max': 'Email should have at most {#limit} characters',
        'string.pattern': 'Wrong email format!',
    }),
    isFavourite: Joi.boolean(),
    contactType: Joi.string()
        .min(3)
        .max(20)
        .valid('work', 'home', 'personal')
        .messages({
            'string.base': 'Contact Type should be a string',
            'string.min':
                'Phone Number should have at least {#limit} characters',
            'string.max':
                'Phone Number should have at most {#limit} characters',
            'string.valid':
                'should be one of the type "work", "home", "personal" ',
        }),
});

export { createContactSchema, updateContactSchema };
