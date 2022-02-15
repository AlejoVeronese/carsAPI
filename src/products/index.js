const express = require('express');

const { ProductsController} = require('./controller');
const router = express.Router();

module.exports.ProductsAPI = (app)=>{
    router
    .get('/',ProductsController.getCars)
    .get('/report',ProductsController.generateReport)
    .get('/:id',ProductsController.getCar)
    .post('/create',ProductsController.createCar)
    .post('/upd/:id',ProductsController.updateCar)
    .post('/del/:id',ProductsController.deleteCar)  
    app.use('/api/products',router);
}
