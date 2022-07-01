const UserModel = require('./user.model');

class UserService {

    addUser(params){
        let user = new UserModel(params);
        return user.save();
    }

    getSingleUser(filter = {}){
        filter['isActive']= true;
        return UserModel.findOne(filter)    
    }

    getAllUsers(filter ={}){ 
        filter['isActive'] = true;
        return UserModel.find(filter);
    }

    updateUser(query ={}, detail = {}){
        detail['updatedAt'] = new Date();
        return UserModel.updateOne(query,{$set: detail})
    }

    removeSingleUser(filter ={}){
        return UserModel.deleteOne(filter);
    }

}

module.exports = new UserService();

