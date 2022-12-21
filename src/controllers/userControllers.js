import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserSchema } from '../models/userModel';
import { RoomSchema } from '../models/roomModel';


const User = mongoose.model('User', UserSchema);
const Room = mongoose.model('room', RoomSchema);

export const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
}

export const userNameExists = (req, res, next) => {
    User.findOne({username: req.body.username}, (err, user) => {
        if(user){
            return res.status(401).json({message: 'Username Already Exist'});
        }else{
            next();
        }
    })
}

export const checkRoomLimit = (req,res, next) => {
    Room.find({ roomCreatedBy: req.user.username }, (err, room) => {
        if (err) {
            return res.send(err);
        }else if(room.length < req.user.number_of_rooms){
            next()
        }else{
            return res.status(401).json({message: 'Cannot make more rooms!'})
        }
    });
    
}

export const accountStatus = (req, res, next) => {
    User.findOne({_id: req.user._id}, (err, user) => {
        if(user.account_status == 'active') {
            next()
        }else{
            return res.status(401).json({ message: 'inactive user' });
        }
    })
    
}

export const isAdmin = (req, res, next) => {
    if (req.user.role == 'admin') {
        console.log(req.user)
        next()
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
}



export const register = (req, res) => {
    const newUser = new User(req.body);
    newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
    newUser.save((err, user) => {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            user.hashPassword = undefined;
            return res.json(user);
        }
    })
}

export const login = (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.status(401).json({ message: 'Authentication failed. No user found' });
        } else if (user) {
            if (!user.comparePassword(req.body.password, user.hashPassword)) {
                res.status(401).json({ message: 'Authentication failed. Wrong password' });
            } else {
                return res.json({ token: jwt.sign({ email: user.email, username: user.username, _id: user.id, number_of_rooms: user.number_of_rooms }, 'RESTFULAPIs') });
            }
        }
    });
}
