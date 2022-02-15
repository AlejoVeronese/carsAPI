const createError = require('http-errors');
const {SalesService} = require('./services');
const debug = require('debug')('app:sales-controller');
const { Response } = require('../common/response');
module.exports.SalesController = {
    getSales: async (req,res) =>{
        try{
            let sales = await SalesService.getAll();
            Response.success(res, 200,'Lista de ventas:',sales);
        }catch(error){
            debug(error);
            Response.error(res);
        }
    },
    getOneSales: async (req,res) =>{
        try{
            const {params:{id}} = req;
            const requestedSales = await SalesService.getById(id);
            if(!requestedSales){
                Response.error(res, new createError.NotFound())
            }else{
                Response.success(res, 200,'Venta seleccionada:',requestedSales);
            }
        }catch(error){
            debug(error);
            Response.error(res);
        }
    },
    createSales: async (req,res) =>{
        try{
            const {body} = req;
            const {body:{product_id}} = req;
            const {body:{cant}} = req;
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest())
            }else{
                const insertedId = await SalesService.create(body,product_id,cant);
                if(insertedId === 0){
                    Response.error(res, new createError(401,"No se encuentra el producto asociado a la venta"))
                }else if(insertedId === 1){
                    Response.error(res, new createError(401,"No contamos con esa cantidad de producto"))
                }
                else{
                    Response.success(res, 201,'Venta agregada:',insertedId);
                }
            }
        }catch(error){
            debug(error);
            Response.error(res);
        }
    },
    updateSales: async (req,res) =>{
        try {
            const {params:{id}} = req;
            const {body} = req;
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest())
            }else{
                const SalesUpdated = await SalesService.update(id,body);
                if(!SalesUpdated){
                    Response.error(res, new createError.NotFound())
                }else{
                    Response.success(res, 200,'Venta modificada:',SalesUpdated);
                }

            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    deleteSales: async (req,res) =>{
        try {
            const {params:{id}} = req;
            const userDeleted = await SalesService.delet(id);
            if(userDeleted === 0){
                Response.error(res, new createError.NotFound())
            }else{          
                Response.success(res, 200,'Venta eliminada:',userDeleted);
            }
            
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    }
}