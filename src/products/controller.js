const createError = require('http-errors');
const {ProductsService} = require('./services');
const debug = require('debug')('app:cars-controller');
const { Response } = require('../common/response');
module.exports.ProductsController = {
    getCars: async (req,res) =>{
        try{
            let products = await ProductsService.getAll();
            Response.success(res, 200,'Lista de autos:',products);
        }catch(error){
            debug(error);
            Response.error(res);
        }
    },
    getCar: async (req,res) =>{
        try{
            const {params:{id}} = req;
            const requestedCar = await ProductsService.getById(id);
            if(!requestedCar){
                Response.error(res, new createError.NotFound())
            }else{
                Response.success(res, 200,'Auto seleccionado:',requestedCar);
            }
        }catch(error){
            debug(error);
            Response.error(res);
        }
    },
    createCar: async (req,res) =>{
        try{
            const {body} = req;
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest())
            }else{
                const insertedId = await ProductsService.create(body);
                Response.success(res, 201,'Auto agregado:',insertedId);
            }
        }catch(error){
            debug(error);
            Response.error(res);
        }
    },
    updateCar: async (req,res) =>{
        try {
            const {params:{id}} = req;
            const {body} = req;
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest())
            }else{
                const carUpdated = await ProductsService.update(id,body);
                if(!carUpdated){
                    Response.error(res, new createError.NotFound())
                }else{
                    Response.success(res, 200,'Auto modificado:',carUpdated);
                }

            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    deleteCar: async (req,res) =>{
        try {
            const {params:{id}} = req;
            const carDeleted = await ProductsService.delet(id);
            if(carDeleted === 0){
                Response.error(res, new createError.NotFound())
            }else{          
                Response.success(res, 200,'Auto eliminado:',carDeleted);
            }
            
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    generateReport: async (req,res) =>{
        try{
            ProductsService.generateReport('Inventario',res)
        }catch(error){
            debug(error);
            Response.error(res);
        }
    }
}