const UserService = require('./user.service');
const Constant = require('../utils/constant')
const {hashPassword} = require('../middleware/bcrypt')
const ObjectId = require('mongoose').Types.ObjectId;

class UserController{

    async addUser(req,res,next){        
        try{
            req.body.password = await hashPassword(req.body.password)
            let exist = await UserService.getSingleUser({email:req.body.email});
            if(exist){
             return res.status(400).send({ errMsg:Constant.MESSAGE.EMAIL_ALREADY_EXIST })    
            }
            let data  = await UserService.addUser(req.body);
            res.status(200).send({data:data,msg:Constant.MESSAGE.DETAIL_SAVED})
        }catch(err){
            res.status(400).send({errMsg:err.message})
        }
    }

   async getSingleUser(req,res,next){
        try{
            let _id = req.params._id;
            let data =  await UserService.getSingleUser({_id})
            res.status(400).send({data:data,msg:Constant.MESSAGE.DETAIL_FETCHED})
        }catch(err){
            console.log(err)
            res.status(400).send({err:err.message})
        }
    }

    async getAllUsers(req,res,next){
        try{
            let data =  await UserService.getAllUsers();
            res.status(200).send({data:data,msg:Constant.MESSAGE.DETAIL_FETCHED})
        }catch(err){
            console.log(err)
            res.status(400).send({err:err.message})
        }
    }

    async updateUser(req,res,next){
        try{
            let _id = req.params._id    
            let IdExist = await UserService.getSingleUser({_id})
            if(!IdExist){
                return res.status(400).send({msg:'Id Not Exist'})
            }
            if (req.body.password) {
                req.body.password = await hashPassword(req.body.password)
            }
            let exist = await UserService.getSingleUser({email:req.body.email})
            if(exist){
                if(exist._id.toString()=== _id.toString()){
                    let data = await UserService.updateUser({_id},req.body);
                    res.status(200).send({data:data,msg:Constant.MESSAGE.DETAIL_UPDATED})
                }else{
                    res.status(200).send({msg:Constant.MESSAGE.EMAIL_ALREADY_EXIST})
                }
            }else{
                let data = await UserService.updateUser({_id},req.body);
                res.status(200).send({data:data,msg:Constant.MESSAGE.DETAIL_UPDATED})
            }
        }catch(err){
            res.status(400).send({err:err.message})
        }
    }

    async removeSingleUser(req,res,next){
        try{
        let _id = ObjectId(req.params._id);
        let data = await UserService.removeSingleUser({_id})
            res.status(200).send({msg:Constant.MESSAGE.DETAIL_REMOVED})
        }catch(err){
            res.status(400).send({errMsg:err.message})
        } 
    }

}

module.exports = new UserController();