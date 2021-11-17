# Express Template

This project is intended to be used as a boilerplate for creating Express API's or backend applications. The code is written in Typescript and uses and an opinionated, object oriented approach to development. It comes with features to interact with MongoDB using Mongoose. 

To get started run:
```bash
npm install
npm start
```

## Files and Folders
---

### environment/

Dotenv will be installed, create a file named `.env` and add necessary mongoDb parameters:
```
DB_NAME=<database name>
DB_USER=<user name>
DB_PASSWORD=<password>
DB_ACCOUNT=<account name>
PORT=<port>
```

---

### index.ts

Entry point for NodeJS to run the Express application. Use this file to create an App instance, connect to database and get the app to listn on provided port number. 

---

### middleware.ts

Use this file to build an array of middleware to be used at the app level (implemented with all routes) of your express application.

---
### routes/

Create a router file based on the template for each grouping of routes in your application. Add the exported express router to the array in the app instance object in the `index.ts` file

---
### controllers/

Create controller files for each grouping of functions the application performs. A good start would be a controller for each model in the database. 

#### base.controller.ts

This is an extendable class that expects you to use Mongoose/MongoDB and construct the models/schemas in the format used in the models folder. This base class provides commonly used CRUD functions for a very quick solution to developing CRUD APIs.

#### controllers.module.ts
Create instances of your controllers here, and you can then use it for simple imports of controllers into the routers

---

### models/

Create a model file for each model in your database. Use the `BaseModel` class to provide reusable CRUD funcitonality to each model to help stay DRY.


