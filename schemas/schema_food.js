const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const foodSchema = mongoose.Schema({
    writer: {
        type: String,
        required: true,
    },
    password: {
        type: Number,  
        required: true,      
    },
    foodName: {
        type: String,        
    },
    category: {
        type: String,
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
        type: Boolean,
    },
});

module.exports = mongoose.model("Foods", foodSchema);