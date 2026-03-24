import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs/promises';

import { CLOUDINARY } from '../constants/index.js';
import { getEnvVariable } from './getEnvVariable.js';

cloudinary.config({
    secure: true,
    cloud_name: getEnvVariable(CLOUDINARY.CLOUD_NAME),
    api_key: getEnvVariable(CLOUDINARY.API_KEY),
    api_secret: getEnvVariable(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
    const res = await cloudinary.uploader.uplode(file.path);
    await fs.unlink(file.path);
    return res.secure_url;
};
