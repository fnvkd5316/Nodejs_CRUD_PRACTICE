const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const foodSchema = mongoose.Schema({
    writer: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,  
        required: true,      
    },
    foodName: {
        type: String,        
    },
    category: {
        type: Number,
    },    
    thumbnailUrl: {
        type: String,
    },    
    comment: {
        type: String,
    },    
    expirationDate: {
        type: String,        
    },
    changeDate: {
        type: String,
    },
    modification: {
        type: boolean,
    },
});

module.exports = mongoose.model("Foods", foodSchema);