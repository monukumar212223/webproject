const mongoose = require('mongoose');
const env=require('./environment');


var MONGODB_URI = process.env.MONGODB_URL || `mongodb://localhost/${env.db}`;
mongoose.connect(MONGODB_URI);
//mongoose.connect(process.env.MONGODB_URI || process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/short_urls');
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

mongoose.set('useFindAndModify', false);
module.exports = db;