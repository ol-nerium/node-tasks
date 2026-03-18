import {
    createContact,
    deleteContact,
    getAllContacts,
    getContactById,
    updateContact,
} from '../services/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWraper.js';
import { httpError } from '../utils/httpError.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

const getAllContactsCtrl = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortOrder, sortBy } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const userId = req.user._id;

    const contacts = await getAllContacts({
        page,
        perPage,
        sortOrder,
        sortBy,
        filter,
        userId,
    });
    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        ...contacts,
    });
};

const getContactByIdCtrl = async (req, res) => {
    const { contactId } = req.params;
    const userId = req.user._id;

    const contact = await getContactById({ contactId, userId });

    if (!contact) {
        throw httpError(404, 'Not found');
    }

    res.json({ status: 200, data: contact });
};

const createContactCtrl = async (req, res) => {
    const userId = req.user._id;

    const newContact = await createContact({
        ...req.body,
        userId,
    });

    // if (!newContact) {
    //     throw httpError(400);
    // }

    res.json({ status: 201, data: newContact });
};

const deleteContactCtrl = async (req, res, next) => {
    const { contactId } = req.params;
    const userId = req.user._id;

    const removedContact = await deleteContact({ contactId, userId });
    if (!removedContact) {
        next(httpError(404, 'Contact not found'));
        return;
    }

    res.json({ status: 200, message: 'Succesfully removed' });
};

const upsertContactCtrl = async (req, res, next) => {
    const { contactId } = req.params;
    const userId = req.user._id;

    const payload = req.body;
    const result = await updateContact(contactId, userId, payload, {
        upsert: true,
    });

    if (!result) {
        next(httpError(404, 'Contact not found'));
        return;
    }

    const status = result.isNew ? 201 : 200;

    res.json({
        status,
        message: 'Successfully upserted a contact',
        data: result.contact,
    });
};

const patchContactCtrl = async (req, res, next) => {
    const { contactId } = req.params;
    const payload = req.body;
    const userId = req.user._id;

    const result = await updateContact(contactId, userId, payload);

    if (!result) {
        next(httpError(404, 'Contact not found'));
        return;
    }

    res.json({
        status: 200,
        message: 'Successfully upserted a contact',
        data: result.contact,
    });
};

export const ctrl = {
    getAllContactsCtrl: ctrlWrapper(getAllContactsCtrl),
    createContactCtrl: ctrlWrapper(createContactCtrl),
    getContactByIdCtrl: ctrlWrapper(getContactByIdCtrl),
    deleteContactCtrl: ctrlWrapper(deleteContactCtrl),
    upsertContactCtrl: ctrlWrapper(upsertContactCtrl),
    patchContactCtrl: ctrlWrapper(patchContactCtrl),
};
