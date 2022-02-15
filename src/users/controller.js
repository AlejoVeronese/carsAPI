const createError = require('http-errors');
const {UserService} = require('./services');
const debug = require('debug')('app:users-controller');
const { Response } = require('../common/response');
module.exports.UsersController = {
    getUsers: async (req,res) =>{
        try{
            let users = await UserService.getAll();
            Response.success(res, 200,'Lista de users:',users);
        }catch(error){
            debug(error);
            Response.error(res);
        }
    },
    getUser: async (req,res) =>{
        try{
            const {params:{id}} = req;
            const requestedUser = await UserService.getById(id);
            if(!requestedUser){
                Response.error(res, new createError.NotFound())
            }else{
                Response.success(res, 200,'User seleccionado:',requestedUser);
            }
        }catch(error){
            debug(error);
            Response.error(res);
        }
    },
    createUser: async (req,res) =>{
        try{
            const {body} = req;
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest())
            }else{
                const insertedId = await UserService.create(body);
                Response.success(res, 201,'User agregado:',insertedId);
            }
        }catch(error){
            debug(error);
            Response.error(res);
        }
    },
    updateUser: async (req,res) =>{
        try {
            const {params:{id}} = req;
            const {body} = req;
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest())
            }else{
                const UserUpdated = await UserService.update(id,body);
                if(!UserUpdated){
                    Response.error(res, new createError.NotFound())
                }else{
                    Response.success(res, 200,'User modificado:',UserUpdated);
                }

            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    deleteUser: async (req,res) =>{
        try {
            const {params:{id}} = req;
            const userDeleted = await UserService.delet(id);
            if(userDeleted === 0){
                Response.error(res, new createError.NotFound())
            }else{          
                Response.success(res, 200,'User eliminado:',userDeleted);
            }
            
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    }
}