# node_tasks

Small collection of Node.js homework exercises and utilities.

## About

This repository holds small, self-contained Node.js tasks used for learning and practice (e.g., algorithmic exercises, file/IO examples, small servers).

## Prerequisites

- Node.js 14+ (recommend latest LTS)
- npm (bundled with Node)

## Installation

1. Clone the repo:
   git clone <repo-url>
2. Install dependencies:
   npm install

## Project structure

- tasks/ — individual task scripts (e.g. task1.js, task2.js)
- bin/ — runnable helpers (optional)
- test/ — unit tests
- package.json — scripts and metadata
- README.md — this file

## Routes description

- GET /api/contacts - returns all contacts array in json format (200 success)

- GET /api/contacts/:id - calls getContactById function, returns contact by id (200 success) or error (404 {"message": "Not found"} )

- DELETE /api/contacts/:id - calls removeContact function, returns removed contact by id (200 success) or error (404 {"message": "Not found"} )

- POST /api/contacts - gets {name, email, phone} body, validate by schemas/contactsSchemas.js createContactSchema function (all fields required),
  calls addContact function if body is valid, returns new contact (201 success) or error (400 {"message": error.message} )

- PUT /api/contacts/:id - gets body {name, email, phone} (required at least 1 field if not => error 400 {"message": "Body must have at least one field"}), validate by schemas/contactsSchemas.js function updateContactSchema, if ok - calls getContactById function, changes record and returns contact by id (200 success) or error 404 {"message": "Not found"} , if not - error (400 {"message": error.message} )
