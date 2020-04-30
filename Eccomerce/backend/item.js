const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Items = new Schema({

    item_description: {
        type: String
    },    
    item_name: {
        type: String
    },
    item_quantity: {
        type: String
    },
    item_url: {
        type: String
    }
});

module.exports = mongoose.model('Item', Items);