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

    const contactsQuery = ContactCollection.find({ user: userId });

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
            .populate('user', 'name')
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
    const contact = await ContactCollection.findOne({
        _id: contactId,
        user: userId,
    }).populate('user', 'name');
    return contact;
};

const createContact = async (payload) => {
    let newContact = await ContactCollection.create(payload);
    newContact = await newContact.populate('user', 'name');
    return newContact;
};

const deleteContact = async ({ contactId, userId }) => {
    const removedContact = await ContactCollection.findOneAndDelete({
        _id: contactId,
        user: userId,
    });
    return removedContact;
};

const updateContact = async (contactId, userId, payload, options = {}) => {
    const rawResult = await ContactCollection.findOneAndUpdate(
        { _id: contactId, user: userId },
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
        contact: await rawResult.value.populate('user', 'name'),
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
