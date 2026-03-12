import express from 'express'
import pino from 'pino-http'
import cors from 'cors'

import { getEnvVariable } from './utils/getEnvVariable.js'
import { contactRouter } from './routers/contacts.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { notFoundHandler } from './middlewares/notFoundHandler.js'

const PORT = Number(getEnvVariable('PORT'))

const setupServer = () => {
    const app = express()
    app.use(express.json())
    app.use(cors())

    // app.use(
    //     pino({
    //         transport: { target: 'pino-pretty' },
    //     }),
    // )

    app.get('/', (req, res) => {
        res.send('Hello express..')
    })

    app.use('/api/contacts', contactRouter)

    app.use(notFoundHandler)
    app.use(errorHandler)

    app.listen(PORT, () => {
        console.log(`Server started on ${PORT} port`)
    })
}

export { setupServer }
