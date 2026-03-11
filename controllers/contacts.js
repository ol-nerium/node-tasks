import {
    createContact,
    deleteContact,
    getAllContacts,
    getContactById,
    updateContact,
} from '../services/contacts.js'
import { ctrlWrapper } from '../utils/ctrlWraper.js'
import { httpError } from '../utils/httpError.js'

const getAllContactsCtrl = async (req, res) => {
    const contacts = await getAllContacts()
    res.status(200).json(contacts)
}

const getContactByIdCtrl = async (req, res) => {
    const { contactId } = req.params
    const contact = await getContactById(contactId)

    if (!contact) {
        throw httpError(404, 'Not found')
    }

    res.status(200).json({ contact })
}

const createContactCtrl = async (req, res) => {
    const newContact = await createContact(req.body)

    if (!newContact) {
        throw httpError(400)
    }

    res.status(201).json(newContact)
}

const deleteContactCtrl = async (req, res) => {
    const { contactId } = req.params
    const removedContact = await deleteContact(contactId)
    if (!removedContact) {
        throw httpError(404)
    }

    res.status(200).json({ message: 'Succesfully removed' })
}

const updateContactCtrl = async (req, res) => {
    const { contactId } = req.params
    const payload = req.body
    const rawUpdatedContact = await updateContact(contactId, payload, {
        returnDocument: 'after',
        includeResultMetadata: true,
    })
    if (!rawUpdatedContact || !rawUpdatedContact.value) {
        throw httpError(404)
    }

    res.status(200).json(rawUpdatedContact.value)
}

export const ctrl = {
    getAllContactsCtrl: ctrlWrapper(getAllContactsCtrl),
    createContactCtrl: ctrlWrapper(createContactCtrl),
    getContactByIdCtrl: ctrlWrapper(getContactByIdCtrl),
    deleteContactCtrl: ctrlWrapper(deleteContactCtrl),
    updateContactCtrl: ctrlWrapper(updateContactCtrl),
}
