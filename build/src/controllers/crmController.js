'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteContact = exports.updateContact = exports.getContactWithID = exports.getContacts = exports.addNewContact = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _crmModel = require('../models/crmModel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Contact = _mongoose2.default.model('Contact', _crmModel.ContactSchema);

var addNewContact = exports.addNewContact = function addNewContact(req, res) {
    var newContact = new Contact(req.body);

    newContact.save(function (err, contact) {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
};

var getContacts = exports.getContacts = function getContacts(req, res) {
    Contact.find({}, function (err, contact) {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
};

var getContactWithID = exports.getContactWithID = function getContactWithID(req, res) {
    Contact.findById(req.params.contactId, function (err, contact) {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
};

var updateContact = exports.updateContact = function updateContact(req, res) {
    Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, function (err, contact) {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
};

var deleteContact = exports.deleteContact = function deleteContact(req, res) {
    Contact.remove({ _id: req.params.contactId }, function (err, contact) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted contact' });
    });
};