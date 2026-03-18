import { ContactCollection } from '../models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

const getAllContacts = async ({
    page,
    perPage,
    sortOrder,
    sortBy,
    filter,
    userId,
}) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactCollection.find({ userId });

    if (filter.isFavourite) {
        contactsQuery.where('isFavourite').equals(filter.isFavourite);
    }
    if (filter.type) {
        contactsQuery.where('contactType').equals(filter.type);
    }

    const [contactsCount, contacts] = await Promise.all([
        ContactCollection.find().merge(contactsQuery).countDocuments(),

        contactsQuery
            .skip(skip)
            .limit(limit)
            .sort({ [sortBy]: sortOrder })
            .exec(),
    ]);

    const paginationData = calculatePaginationData(
        contactsCount,
        perPage,
        page,
    );
    return { data: contacts, ...paginationData };
};

const getContactById = async ({ contactId, userId }) => {
    const contact = await ContactCollection.findOne({ _id: contactId, userId });
    return contact;
};

const createContact = async (payload) => {
    const newContact = await ContactCollection.create(payload);
    return newContact;
};

const deleteContact = async ({ contactId, userId }) => {
    const removedContact = await ContactCollection.findOneAndDelete({
        _id: contactId,
        userId,
    });
    return removedContact;
};

const updateContact = async (contactId, userId, payload, options = {}) => {
    const rawResult = await ContactCollection.findOneAndUpdate(
        { _id: contactId, userId },
        payload,
        {
            returnDocument: 'after',
            includeResultMetadata: true,
            ...options,
        },
    );

    if (!rawResult || !rawResult.value) {
        return null;
    }

    return {
        contact: rawResult.value,
        isNew: !rawResult?.lastErrorObject?.updatedExisting,
    };
};

export {
    createContact,
    deleteContact,
    getContactById,
    getAllContacts,
    updateContact,
};
