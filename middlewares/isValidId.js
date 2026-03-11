import { isValidObjectId } from 'mongoose'

export const isValidId = (req, res, next) => {
    const { contactId } = req.params
    if (!isValidObjectId(contactId)) {
        const error = new Error('Not found')
        error.status = 404
        return next(error)
    }
    next()
}
