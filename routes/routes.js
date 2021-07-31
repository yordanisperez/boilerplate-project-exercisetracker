const express = require('express');
const handle= require('../handleRoutes/handleRoutes');

const router = express.Router(option={});


module.exports = function(req,res,next) { // Router factory
   
    router.get('/', handle.handleHom);                          //show home page
    router.post('/api/users',handle.handlePostUsers);           //Add a new User
    router.get('/api/users',handle.handleGetUsers);             //Shows all Users
    router.post('/api/users/:_id/exercises',handle.handlePostEjerc)   //Add a new Ejercicio 
    router.get('/api/users/:_id/logs',handle.handleGetLogs);// shows all ejercice log of _id users

return router;
};