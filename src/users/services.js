const { ObjectId} = require('mongodb');
const { Database} = require('../database/index');
const COLLECTION = 'users';


const getAll = async () =>{
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}
const getById = async (id) =>{
    const collection = await Database(COLLECTION);
    return await collection.findOne({_id:ObjectId(id)});
}
const create = async (user) =>{
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(user);
    return result.insertedId;
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

module.exports.UserService={
    getAll,
    getById,
    create,
    update,
    delet,
}