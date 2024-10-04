const mongoose = require("mongoose")
const {Schema}  = mongoose;

const CryptoData = new Schema({
    name:{
        type:String,
    },
    symbol:{
        type:String,
    },
    currentprice:{
        type:String,
    }

})

const cryptoRecord = mongoose.model('cryptoRecord',CryptoData);
cryptoRecord.createIndexes();
module.exports = cryptoRecord;