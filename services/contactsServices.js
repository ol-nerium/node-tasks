import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.join(process.cwd(), "./db/contacts.json");

async function listContacts() {
  // Повертає масив контактів.
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contactsList = await listContacts();

  const result = contactsList.find((contact) => contact.id === contactId);

  return result || null;
}

async function removeContact(contactId) {
  // Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contactsList = await listContacts();

  const contactIndex = contactsList.findIndex(
    (contact) => contact.id === contactId
  );

  if (contactIndex === -1) {
    return null;
  }

  const [result] = contactsList.splice(contactIndex, 1);
  fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return result;
}

async function addContact({ name, email, phone }) {
  // Повертає об'єкт доданого контакту (з id).

  const contactsList = await listContacts();

  const newContact = {
    name,
    email,
    phone,
    id: nanoid(),
  };

  contactsList.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return newContact;
}

async function updateContact(id, data) {
  const contactsList = await listContacts();
  // const contact = contactsList.find((item) => item.id === id);

  const contactIndex = contactsList.findIndex((contact) => contact.id === id);
  if (contactIndex === -1) {
    return null;
  }

  contactsList[contactIndex] = { ...contactsList[contactIndex], ...data };

  fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

  return contactsList[contactIndex];
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
