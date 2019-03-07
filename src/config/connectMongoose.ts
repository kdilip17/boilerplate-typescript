'use strict';

let mongoose = require('mongoose');
let localConfig: any = require('../../localConfig');

export const conn = mongoose.connection;

conn.on('error', function(err) {
    console.error('mongodb connection error:', err);
    process.exit(1);
});

conn.once('open', function() {
    console.info('Connected to Mongodb.');
});

console.log(`Connecting to ${localConfig.MongodbConnection.uri} ...`);

mongoose.connect(localConfig.MongodbConnection.uri, localConfig.MongodbConnection.options);

export default conn;
