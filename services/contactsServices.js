import { ContactsCollection } from "../models/contact.js";

async function listContacts() {
  // Повертає масив контактів.
  const contacts = ContactsCollection.find();
  return contacts;
}

async function getContactById(contactId) {
  // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contact = await ContactsCollection.findById(contactId);
  return contact;
}

async function removeContact(contactId) {
  const contact = await ContactsCollection.findByIdAndDelete(contactId);
  return contact;
}

async function addContact({ name, email, phone }) {
  // Повертає об'єкт доданого контакту (з id).

  const contact = await ContactsCollection.create({ name, email, phone });
  return contact;
}

async function updateContact(id, data) {
  const contact = await ContactsCollection.findByIdAndUpdate(id, data, {
    new: true,
  });
  return contact;
}

async function updateStatusContact(id, data) {
  const contact = await ContactsCollection.findByIdAndUpdate(id, data, {
    new: true,
  });
  return contact;
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
