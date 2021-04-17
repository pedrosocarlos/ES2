const express = require('express');

const userController = require('./controllers/userController');
const restaurantController = require('./controllers/userController');
const menuController = require('./controllers/menuController');
const profileUserController = require('./controllers/profileUserController');
const profileRestController = require('./controllers/profileRestController');
const sessionUserController = require('./controllers/sessionUserController');
const sessionRestController = require('./controllers/sessionRestController');

const routes = express.Router();

//rotas dos usuários
routes.get('/users', userController.index);
routes.post('/users', userController.create);
//rotas dos restaurantes
routes.get('/restaurant', restaurantController.index);
routes.post('/restaurant', restaurantController.create);
//rotas dos menu
routes.get('/menu', menuController.index);
routes.post('/menu', menuController.create);
routes.delete('/menu/:id', menuController.delete);
//demais rotas
routes.get('/profileRest', profileRestController.index);
routes.get('/profileUser', profileUserController.index);
routes.post('/sessionUser', sessionUserController.create);
routes.post('/sessionRest', sessionRestController.create);


module.exports = routes;
