const express = require('express');

const { UsersController} = require('./controller');
const router = express.Router();

module.exports.UsersAPI = (app)=>{
    router
    .get('/',UsersController.getUsers)
    .get('/:id',UsersController.getUser)
    .post('/create',UsersController.createUser)
    .post('/upd/:id',UsersController.updateUser)
    .post('/del/:id',UsersController.deleteUser)  
    app.use('/api/users',router);
}