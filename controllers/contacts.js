import { ContactCollection } from '../models/contacts.js'
import { ctrlWrapper } from '../utils/ctrlWraper.js'
import { httpError } from '../utils/httpError.js'

const getAllContacts = async (req, res) => {
    const contacts = await ContactCollection.find()
    res.status(200).json(contacts)
}

const getContactById = async (req, res) => {
    const { contactId } = req.params
    const contact = await ContactCollection.findById(contactId)

    if (!contact) {
        throw httpError(404, 'Not found')
    }

    res.status(200).json({ contact })
}

const createContact = async (req, res) => {
    const newContact = await ContactCollection.create(req.body)

    if (!newContact) {
        throw httpError(400)
    }

    res.status(201).json(newContact)
}

const deleteContact = async (req, res) => {
    const { contactId } = req.params
    const removedContact = await ContactCollection.findByIdAndDelete(contactId)
    if (!removedContact) {
        throw httpError(404)
    }

    res.status(200).json({ message: 'Succesfully removed' })
}

const updateContact = async (req, res) => {
    const { contactId } = req.params
    const payload = req.body
    const rawUpdatedContact = await ContactCollection.findByIdAndUpdate(
        contactId,
        payload,
        {
            returnDocument: 'after',
            includeResultMetadata: true,
        },
    )
    if (!rawUpdatedContact || !rawUpdatedContact.value) {
        throw httpError(404)
    }

    res.status(200).json(rawUpdatedContact.value)
}

export const ctrl = {
    getAllContacts: ctrlWrapper(getAllContacts),
    createContact: ctrlWrapper(createContact),
    getContactById: ctrlWrapper(getContactById),
    deleteContact: ctrlWrapper(deleteContact),
    updateContact: ctrlWrapper(updateContact),
}
