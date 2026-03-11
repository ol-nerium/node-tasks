import dotenv from 'dotenv';

dotenv.config();

const getEnvVariable = (name, defaultValue) => {
    const value = process.env[name];

    if (value) return value;
    if (defaultValue) return defaultValue;
    throw new Error(`Missing enviromental variable named ${name}`);
};

export { getEnvVariable };
