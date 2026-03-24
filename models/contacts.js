import { model, Schema } from 'mongoose';

const contactsShema = new Schema(
    {
        photo: { type: String },
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
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export { contactsShema };

export const ContactCollection = model('contact', contactsShema);
