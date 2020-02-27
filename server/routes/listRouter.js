const express=require('express');
const router=express.Router();

const Member=require('../models').Member;

router.post('/delList', async (req,res)=>{
    try{
        const result = await Member.destroy({
            where:{id:req.body.id}
        })

        res.json({message:"success"})
    }catch(err){
        console.log(err);
        res.json({message:false})
    }
})


router.post('/new', async (req,res)=>{
    try{
        let gender=false
        if(req.body.gender==="남자"){
            gender=true;
        }
        let isStudent=false
        if(req.body.isStudent==="학생"){
            gender=true;
        }
        let b_day
        if(!req.body.b_day){
            b_day = null
        }
        let year
        if(!req.body.year){
            year = null;
        }
        
        const result = await Member.create({
            pasture:req.body.pasture,
            farm:req.body.farm,
            name:req.body.name,
            b_day:b_day,
            school:req.body.school,
            year:year,
            area:req.body.area,
            phone:req.body.phone,
            parents_phone:req.body.parents_phone,
            gender,
            isStudent,
        });
        res.json({message:"success"});
    } catch(err){
        console.log(err);
        res.json({message:false});
    }
})

router.post('/expelled', async (req,res)=>{
    try{
        const result = await Member.update({
           expelled:req.body.expelled,
        },{
            where:{id:req.body.id}
        })

        res.json({message:"success"})

    }catch(err){
        console.log(err);
        res.json({message:false});
    }
})

router.post('/submit', async (req,res)=>{
    try{
        let gender=false
        if(req.body.gender==="남자"){
            gender=true;
        }
        const result = await Member.update({
            pasture:req.body.pasture,
            farm:req.body.farm,
            name:req.body.name,
            b_day:req.body.b_day,
            school:req.body.school,
            year:req.body.year,
            area:req.body.area,
            phone:req.body.phone,
            parents_phone:req.body.parents_phone,
            gender,
        },{
            where:{id:req.body.id}
        })

        res.json({message:"success"})

    }catch(err){
        console.log(err);
        res.json({message:false});
    }
})




router.post('/update', async (req,res)=>{
    try{
        const info = await Member.findOne({
            where:{id:req.body.id}
        })
        res.json({info});

    }catch(err){
        console.log(err);
        res.json({info:"error"});
    }
})


router.post('/newList', async (req,res)=>{
    try{
        const list = await Member.findAll({
            where: {expelled:false, newFriend:true}
        },{
            order:[['pasture', 'asc'], ['farm', 'asc']]
        },)
        res.json({list});
    }catch(err){
        console.log(err);
        res.json({list:"error"});
    }
})

router.post('/expelledlist', async (req,res)=>{
    try{
        const list = await Member.findAll({
            where: {expelled:true}
        },{
            order:[['pasture', 'asc'], ['farm', 'asc']]
        },)
        res.json({list});
    }catch(err){
        console.log(err);
        res.json({list:"error"});
    }
})

router.post('/show', async (req,res)=>{
    try{
        const list = await Member.findAll({
            where: {expelled:false, newFriend:false},        
            order:[['pasture', 'asc'], ['farm', 'asc'], ['isStudent', 'desc']]
        },)
        res.json({list});
    }catch(err){
        console.log(err);
        res.json({list:"error"});
    }
})


module.exports=router;