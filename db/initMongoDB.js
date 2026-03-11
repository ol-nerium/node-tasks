import mongoose from 'mongoose'
import { getEnvVariable } from '../utils/getEnvVariable.js'

getEnvVariable
const initMongoDB = async () => {
    try {
        const user = getEnvVariable('MONGODB_USER')
        const pwd = getEnvVariable('MONGODB_PASSWORD')
        const url = getEnvVariable('MONGODB_URL')
        const db = getEnvVariable('MONGODB_DB')

        await mongoose.connect(
            `mongodb+srv://${user}:${pwd}@${url}/${db}?appName=Cluster0`,
        )

        console.log('MongoDB connected success')
    } catch (error) {
        console.log('Error while setting up mongo connection ', error)
        throw error
    }
}

export { initMongoDB }
