const ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017',
    { useUnifiedTopology: true },
    (error, connection) => {
        if (error) return console.log(error);
        global.connection = connection.db('mongoAula');
        console.log('-----------CONECTADO-----------')
    })


function findCustomers() {
    return global.connection
        .collection('clientes')
        .find({})
        .toArray();
}


function findCustomer(id) {
    const objectId = new ObjectId(id)
    return global.connection
        .collection('clientes')
        .findOne({ _id: objectId })

}

function insertCustomer(customer) {
    return global.connection
        .collection('clientes')
        .insertOne(customer)
}


function updateCustomer(id, customer) {
    const objectId = new ObjectId(id)
    return global.connection
        .collection('clientes')
        .updateOne({ _id: objectId }, { $set: customer });
}

function deleteCustomer(id) {
    const objectId = new ObjectId(id);
    return global.connection
        .collection('clientes')
        .deleteOne({ _id: ObjectId });

}


module.exports = {
    findCustomers,
    insertCustomer,
    updateCustomer,
    deleteCustomer,
    findCustomer
}