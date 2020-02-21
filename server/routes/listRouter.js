const express=require('express');
const router=express.Router();

const Member=require('../models').Member;


router.post('/show', async (req,res)=>{
    console.log("get data");
    try{
        const list = await Member.findAll({
            order:[['pasture', 'asc'], ['farm', 'asc']]
        },)
        console.log(list);
        res.json({list});
    }catch(err){
        console.log(err);
        res.json({list:"error"});
    }
})


module.exports=router;