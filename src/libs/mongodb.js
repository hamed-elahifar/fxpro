const mongoose  = require('mongoose').Mongoose

const options   = {
    useNewUrlParser:      true,
    // autoIndex:          false,            // Don't build indexes
    connectTimeoutMS:     5000,
    family:               4,
    useUnifiedTopology:   true,
};

DB = new mongoose();

DB.connection.on('reconnected',() => {
    logger.info('DB reconnected');
});

DB.connection.on('disconnected',() => {
    logger.info('DB disconnected');
    // DBConnection();
});

DBConnection = function() {
    try{
        DB.connect(getConfig('DB_connectionString'),options)
            .then (async (connection) => {
                logger.info(getConfig('DB_onSuccess'))
            })
            .catch (err => {
                errorLog(err)
                logger.error(getConfig('DB_onError'))
            });
    }
    catch(err){
        logger.error(err)
    }
}

// if (getConfig('DB_debug')){
//     DB.set('debug',function(collectionName,method,query,doc){
    
//         const txt = `Mongoose: ${collectionName} ${method} (
// ${JSON.stringify(query,null,4)}
// ${JSON.stringify(doc,null,2)}
// )`
//         logger.debug(txt)
//     });
// }

module.exports = {
    DB,
    DBConnection,
}
