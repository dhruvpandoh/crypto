const mongoose = require("mongoose")
// const CONNECTION_URL ="mongodb://localhost:27017/cryptoshow?directConnection=true"
const CONNECTION_URL ="mongodb+srv://mongodemo:mongodemo123@cluster0.oiummgz.mongodb.net/cryptoshow?retryWrites=true&w=majority"

const connetToMongo = () =>{
    mongoose.connect(CONNECTION_URL)
    .then(()=>{console.log('connection successful')})
    .catch((e)=>{
        console.log('no connection')
    })
}

module.exports = connetToMongo;