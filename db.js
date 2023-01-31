const ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;


function connectDatabase() {
    if (!global.connection)
        MongoClient.connect(process.env.MONGODB_CONNECTION,
            { useUnifiedTopology: true })
            .then(connection => {
                global.connection = connection.db('mongoAula')
                console.log('-----------CONECTADO-----------')
            })
            .catch(error => {
                console.log(error)
                global.connection = null
            })
}

function findCustomers() {
    connectDatabase()
    return global.connection
        .collection('clientes')
        .find({})
        .toArray();
}


function findCustomer(id) {
    connectDatabase()
    const objectId = new ObjectId(id)
    return global.connection
        .collection('clientes')
        .findOne({ _id: objectId })

}

function insertCustomer(customer) {
    connectDatabase()
    return global.connection
        .collection('clientes')
        .insertOne(customer)
}


function updateCustomer(id, customer) {
    connectDatabase()
    const objectId = new ObjectId(id)
    return global.connection
        .collection('clientes')
        .updateOne({ _id: objectId }, { $set: customer });
}

function deleteCustomer(id) {
    connectDatabase()
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