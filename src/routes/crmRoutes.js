import {
  addNewContact,
  getContacts,
  getContactWithID,
  updateContact,
  deleteContact,
} from "../controllers/crmController.js";
import {
  loginRequired,
  register,
  login,
  isAdmin,
} from "../controllers/userControllers.js";

const routes = (app) => {
  app
    .route("/contacts")
    .get(
      (req, res, next) => {
        // middleware
        console.log(`Request from: ${req.originalUrl}`);
        console.log(`Request type: ${req.method}`);
        next();
      },
      loginRequired,
      isAdmin,
      getContacts
    )
    .post(loginRequired, addNewContact);

  app
    .route("/contact/:contactId")
    // get specific contact
    .get(loginRequired, getContactWithID)

    // put request
    .put(loginRequired, updateContact)

    // delete request
    .delete(loginRequired, deleteContact);

  // registration route
  app.route("/register").post(register);

  // login route
  app.route("/login").post(login);
};

export default routes;
