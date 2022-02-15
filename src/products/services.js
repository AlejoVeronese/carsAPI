const { ObjectId} = require('mongodb');
const { Database} = require('../database/index');
const {Excel} = require('./util');
const COLLECTION = 'cars';


const getAll = async () =>{
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}
const getById = async (id) =>{
    const collection = await Database(COLLECTION);
    return await collection.findOne({_id:ObjectId(id)});
}

const create = async (car) =>{
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(car);
    return result.insertedId;
}
const update = async (id,newValue) =>{
    const collection = await Database(COLLECTION);
    const filter = { _id: ObjectId(id)};
    const options = {upsert:false};
    const updateCar = {
        $set:{
            ...newValue
        }
    };
    const result = await collection.updateOne(filter,updateCar,options)
    return await getById(id);

}
const delet = async (id) =>{
    const collection = await Database(COLLECTION);
    const query = {_id: ObjectId(id)};
    const car = await getById(id);
    const result = await collection.deleteOne(query);
    if (result.deletedCount === 1){
        return car
    }else{
        return 0
    }
}
const generateReport = async (name,res) =>{
    let cars = await getAll();
    Excel.excelGenerator(cars,name,res);

}
module.exports.ProductsService={
    getAll,
    getById,
    create,
    update,
    delet,
    generateReport
}