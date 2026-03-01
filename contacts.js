const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

// console.log(contactsPath);

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
    (contact) => contact.id === contactId,
  );

  if (contactIndex === -1) {
    return null;
  }

  const [result] = contactsList.splice(contactIndex, 1);
  fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  console.log("Contact was successfully removed");
  return result;
}

async function addContact(name, email, phone) {
  // Повертає об'єкт доданого контакту (з id).

  const contactsList = await listContacts();

  // if (
  //   contactsList.findIndex((contact) => contact.email === email) !== -1 ||
  //   contactsList.findIndex((contact) => contact.phone === phone) !== -1
  // ) {
  //   console.log("such contact already exists in the base");
  //   return null;
  // }

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

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
