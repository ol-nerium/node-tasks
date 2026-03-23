import nodemailer from 'nodemailer';

import { SMTP } from '../constants/index.js';

import { getEnvVariable } from '../utils/getEnvVariable.js';

const transporter = nodemailer.createTransport({
    host: getEnvVariable(SMTP.SMTP_HOST),
    port: Number(getEnvVariable(SMTP.SMTP_PORT)),
    secure: true,
    auth: {
        user: getEnvVariable(SMTP.SMTP_USER),
        pass: getEnvVariable(SMTP.SMTP_PASSWORD),
    },
    // host: getEnvVariable(SMTP.SMTP_FROM),
});

export const sendEmail = async (options) => {
    return await transporter.sendMail(options);
};
