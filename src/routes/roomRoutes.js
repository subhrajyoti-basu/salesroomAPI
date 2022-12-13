import { createRoom, deleteRoom, getAllRoom, getRoom, updateRoom } from "../controllers/roomController";
import { login, loginRequired, register, userNameExists } from "../controllers/userControllers";

const routes = (app) => {

    // addroom
    app.route('/addroom')
        .post(loginRequired, createRoom)

    app.route('/room/:roomId')
        // get specific contact
        .get(getRoom)

        // put request
        .put(loginRequired, updateRoom)

        // delete request
    
    app.route('/delroom/:roomIds')
        .delete(loginRequired, deleteRoom)    

    // registration route

    app.route('/allrooms')
        .get(loginRequired, getAllRoom)

    app.route('/register')
        .post(userNameExists, register);

    // login route
    app.route('/login')
        .post(login);
}

export default routes;