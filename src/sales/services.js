const { ObjectId} = require('mongodb');
const { Database} = require('../database/index');
const COLLECTION = 'sales';
const {ProductsService} = require('../products/services');
const {UserService} = require('../users/services');

const getAll = async () =>{
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}
const getById = async (id) =>{
    const collection = await Database(COLLECTION);
    const finded = await collection.findOne({_id:ObjectId(id)});
    const prod = await ProductsService.getById(finded.product_id);
    const user = await UserService.getById(finded.buyer_id);
    return {...finded,
        "Detalle del producto": {Marca:prod['marca'],Modelo:prod['modelo'],Año:prod['año']},
        "Detalle del comprador": {Nombre:user['nombre'],Apellido:user['apellido']} };
}
const create = async (sales,prod_id,cant) =>{
    const collection = await Database(COLLECTION);
    const car = await ProductsService.getById(ObjectId(prod_id));
    const unid = car.unidades;
    const precio = car.precio;
        if(!car){
            return 0
        }else{
            if(unid > cant){
                let result = await collection.insertOne(sales);
                let unidades = (unid-cant);
                await ProductsService.update(ObjectId(prod_id),{"unidades":unidades});
                return result.insertedId;

            }else{
                return 1
            }
        }
}
const update = async (id,newValue) =>{
    const collection = await Database(COLLECTION);
    const filter = { _id: ObjectId(id)};
    const options = {upsert:false};
    const updateUser = {
        $set:{
            ...newValue
        }
    };
    const result = await collection.updateOne(filter,updateUser,options)
    return await getById(id);

}
const delet = async (id) =>{
    const collection = await Database(COLLECTION);
    const query = {_id: ObjectId(id)};
    const user = await getById(id);
    const result = await collection.deleteOne(query);
    if (result.deletedCount === 1){
        return user
    }else{
        return 0
    }
}

module.exports.SalesService={
    getAll,
    getById,
    create,
    update,
    delet,
}