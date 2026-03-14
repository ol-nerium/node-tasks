import { ContactCollection } from '../models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

const getAllContacts = async ({ page, perPage, sortOrder, sortBy, filter }) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactCollection.find();

    if (filter.isFavourite) {
        contactsQuery.where('isFavourite').equals(filter.isFavourite);
    }
    if (filter.type) {
        contactsQuery.where('contactType').equals(filter.type);
    }

    // if (filter.gender) {
    //     contactsQuery.where('gender').equals(filter.gender);
    // }
    // if (filter.maxAge) {
    //     contactsQuery.where('maxAge').lte(filter.maxAge);
    // }
    // if (filter.minAge) {
    //     contactsQuery.where('minAge').gte(filter.minAge);
    // }
    // if (filter.maxAvgMark) {
    //     contactsQuery.where('maxAvgMark').lte(filter.maxAvgMark);
    // }
    // if (filter.minAvgMark) {
    //     contactsQuery.where('minAvgMark').gte(filter.minAvgMark);
    // }

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

const getContactById = async (contactId) => {
    const contact = await ContactCollection.findById(contactId);
    return { data: contact };
};

const createContact = async (payload) => {
    const newContact = await ContactCollection.create(payload);
    return { data: newContact };
};

const deleteContact = async (contactId) => {
    const removedContact = await ContactCollection.findByIdAndDelete(contactId);

    return { data: removedContact };
};

const updateContact = async (contactId, payload, options = {}) => {
    const rawResult = await ContactCollection.findByIdAndUpdate(
        contactId,
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
        data: rawResult.value,
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
