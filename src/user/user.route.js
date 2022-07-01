const apiRoutes = require('express').Router();
const UserController = require('./user.controller')

apiRoutes.post('/', UserController.addUser);
apiRoutes.get('/', UserController.getAllUsers)
apiRoutes.get('/:_id', UserController.getSingleUser)
apiRoutes.put('/:_id', UserController.updateUser)
apiRoutes.delete('/:_id', UserController.removeSingleUser)

module.exports = apiRoutes; 