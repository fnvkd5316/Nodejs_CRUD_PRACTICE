const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const foodSchema = mongoose.Schema({
    foodId: {
        type: Number,
        required: true,
        unique: true,
    },
    writer: {
        type: String,
        required: true,
    },
    password: {
        type: String,  
        required: true,      
    },
    foodName:       String,        
    category:       String,
    thumbnailUrl:   String,
    contents:       String,
    expirationDate: String,
    changeDate:     String,

    modification:   Boolean,
    
    commentNum:     Number,
});

module.exports = mongoose.model("Foods", foodSchema);