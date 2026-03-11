import { Router } from 'express'
import { ctrl } from '../controllers/contacts.js'
import { isValidId } from '../middlewares/isValidId.js'

const contactRouter = Router()

contactRouter.get('/', ctrl.getAllContactsCtrl)
contactRouter.get('/:contactId', isValidId, ctrl.getContactByIdCtrl)

contactRouter.post('/', ctrl.createContactCtrl)
contactRouter.delete('/:contactId', isValidId, ctrl.deleteContactCtrl)
contactRouter.put('/:contactId', isValidId, ctrl.updateContactCtrl)
contactRouter.patch('/:contactId', isValidId, ctrl.updateContactCtrl)

export { contactRouter }
