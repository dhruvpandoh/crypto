const connectToMongo = require("./db")
const express = require("express")
var cors = require('cors')

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;


app.use(cors())

//middleware
app.use(express.json())
// app.get('/',(req,res)=>{
//     res.send("hello word")
// })
app.use('/api/crypto',require('./routes/crypto'))

app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})

