const express = require('express');
const router = express.Router();
const cryptoRecord = require('../models/cryptoRecord')



router.get('/fetchalldata', async(req,res)=>{

  try {
    const data = await cryptoRecord.find();
    res.json(data);
  } catch (error) {
    res.status(500).send("Internal Server Error")
    
  }
   
})

//api for save crypto
router.post('/savecrypto',async(req,res)=>{

  
    try{
      const { name,symbol,currentprice} = req.body;
      const record = new cryptoRecord({
        name,symbol,currentprice
      })

      const savecrypto = await record.save()
      res.json(savecrypto);
      
    }
    catch(error){
        res.status(500).send("Internal Server Error")

    }
})

//api for delete
router.delete('/deletecrypto/:id',async(req,res)=>{
  try {
    let crypto = await cryptoRecord.findByIdAndDelete(req.params.id);
    res.json("successfuly deleted")
  } catch (error) {
    res.status(500).send("Internal Server Error")
    
  }
})

module.exports = router