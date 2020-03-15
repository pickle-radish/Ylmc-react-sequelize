const express=require('express');
const router=express.Router();

const Manager=require('../models').Manager;

router.post('/login', async (req,res)=>{
    try{
        const login = await Manager.findOne({
            where:{
                managerid:req.body.id,
                password:req.body.password},
        })
        if(login){
            req.session.name=req.body.id;
            console.log(req.body.id);
            console.log(req.session.name);
            res.json({login:true})
        }else{
            res.json({login:false})
        }
    }catch(err){
        console.log(err);
        res.json({login:false});
    }
})

router.post('/logout', async (req,res)=>{
    try{
        req.session.destroy(()=>{
            res.json({logout:true})
        })
    }catch(err){
        console.log(err);
        res.json({logout:false})
    }
})
module.exports=router;