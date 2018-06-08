var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Define collection and schema for items
var Item = new Schema({
        item : {
            type: String
        },
    }, 
    {
        collection: 'items'
    }
);

module.exports = mongoose.model('Item', Item); 