import { ContactCollection } from '../models/contacts.js'

const createContact = async (payload) => {
    const newContact = await ContactCollection.create(payload)
    return newContact
}

const deleteContact = async (contactId) => {
    const removedContact = await ContactCollection.findByIdAndDelete(contactId)

    return removedContact
}

const getAllContacts = async () => {
    const contacts = await ContactCollection.find()
    return contacts
}

const getContactById = async (contactId) => {
    const contact = await ContactCollection.findById(contactId)
    return contact
}

const updateContact = async (contactId, payload, params) => {
    const rawUpdatedContact = await ContactCollection.findByIdAndUpdate(
        contactId,
        payload,
        params,
    )
    return rawUpdatedContact
}

export {
    createContact,
    deleteContact,
    getContactById,
    getAllContacts,
    updateContact,
}
