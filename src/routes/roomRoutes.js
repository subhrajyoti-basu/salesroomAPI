import { createRoom, deleteRoom, getAllRoom, getRoom, updateRoom } from "../controllers/roomController";
import { getRoomData } from "../controllers/roomDataController";
import { accountStatus, checkRoomLimit, login, loginRequired, register, userNameExists } from "../controllers/userControllers";

const routes = (app) => {

    // addroom
    app.route('/addroom')
        .post(loginRequired, checkRoomLimit, createRoom)

    app.route('/room/:roomId')
        // get specific contact
        .get(getRoomData)

        // put request
        .put(loginRequired, accountStatus, updateRoom)

        // delete request
    
    app.route('/delroom/:roomIds')
        .delete(loginRequired, deleteRoom)    

    // registration route

    app.route('/allrooms')
        .get(loginRequired, accountStatus, getAllRoom)

    app.route('/register')
        .post(userNameExists, register);

    // login route
    app.route('/login')
        .post(login);
}

export default routes;