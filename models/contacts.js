import { model, Schema } from 'mongoose'
import Joi from 'joi'

const schema = Joi.object({
    name: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    email: Joi.string(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal'),
})

const contactsShema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            // required: true,
        },
        isFavourite: {
            type: Boolean,
            // required: true,
            default: false,
        },
        contactType: {
            type: String,
            enum: ['work', 'home', 'personal'],
            required: true,
            default: 'personal',
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
)

export { contactsShema }
export const ContactCollection = model('contact', contactsShema)
