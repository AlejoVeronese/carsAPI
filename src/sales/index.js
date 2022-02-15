const express = require('express');

const { SalesController} = require('./controller');
const router = express.Router();

module.exports.SalesAPI = (app)=>{
    router
    .get('/',SalesController.getSales)
    .get('/:id',SalesController.getOneSales)
    .post('/create',SalesController.createSales)
    .post('/upd/:id',SalesController.updateSales)
    .post('/del/:id',SalesController.deleteSales)  
    app.use('/api/sales',router);
}