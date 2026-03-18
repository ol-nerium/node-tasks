import { Router } from 'express';
import { ctrl } from '../controllers/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
    createContactSchema,
    updateContactSchema,
} from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';

const contactsRouter = Router();
contactsRouter.use(authenticate);

contactsRouter.get('/', ctrl.getAllContactsCtrl);
contactsRouter.get('/:contactId', isValidId, ctrl.getContactByIdCtrl);

contactsRouter.post(
    '/',
    validateBody(createContactSchema),
    ctrl.createContactCtrl,
);
contactsRouter.delete('/:contactId', isValidId, ctrl.deleteContactCtrl);
contactsRouter.put(
    '/:contactId',
    isValidId,
    validateBody(createContactSchema),
    ctrl.upsertContactCtrl,
);
contactsRouter.patch(
    '/:contactId',
    isValidId,
    validateBody(updateContactSchema),
    ctrl.patchContactCtrl,
);

export { contactsRouter };
