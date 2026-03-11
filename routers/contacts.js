import { Router } from 'express'
import { ctrl } from '../controllers/contacts.js'
import { isValidId } from '../middlewares/isValidId.js'

const contactRouter = Router()

contactRouter.get('/', ctrl.getAllContacts)
contactRouter.get('/:contactId', isValidId, ctrl.getContactById)

contactRouter.post('/', ctrl.createContact)
contactRouter.delete('/:contactId', isValidId, ctrl.deleteContact)
contactRouter.put('/:contactId', isValidId, ctrl.updateContact)
contactRouter.patch('/:contactId', isValidId, ctrl.updateContact)

export { contactRouter }
