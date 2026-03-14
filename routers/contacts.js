import { Router } from 'express';
import { ctrl } from '../controllers/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
    createContactSchema,
    updateContactSchema,
} from '../validation/contacts.js';

const contactRouter = Router();

contactRouter.get('/', ctrl.getAllContactsCtrl);
contactRouter.get('/:contactId', isValidId, ctrl.getContactByIdCtrl);

contactRouter.post(
    '/',
    validateBody(createContactSchema),
    ctrl.createContactCtrl,
);
contactRouter.delete('/:contactId', isValidId, ctrl.deleteContactCtrl);
contactRouter.put(
    '/:contactId',
    isValidId,
    validateBody(updateContactSchema),
    ctrl.upsertContactCtrl,
);
contactRouter.patch(
    '/:contactId',
    isValidId,
    validateBody(updateContactSchema),
    ctrl.patchContactCtrl,
);

export { contactRouter };
