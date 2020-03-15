const express=require('express');
const router=express.Router();

const Member=require('../models').Member;


router.post('/expelled', async (req,res)=>{
    if(!req.session.name){
        res.json({message:'관리자 로그인이 필요합니다'});
    }else{
        try{
            await Member.update({
            expelled:req.body.expelled,
            },{
                where:{id:req.body.id}
            })
            if(req.body.expelled){
                res.json({message:"제적되었습니다"})
            }else{
                res.json({message:"복귀되었습니다"})
            }
        }catch(err){
            console.log(err);
            res.json({message:false});
        }
    }
})

router.post('/update', async (req,res)=>{
    if(!req.session.name){
        res.json({message:'관리자 로그인이 필요합니다'});
    }else{
        
        try{
            let gender=false
            if(req.body.gender==="남자"){
                gender=true;
            }
            let isStudent=true
            if(req.body.gender==='선생'){
                isStudent=false;
            }
            await Member.update({
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
                isStudent,
            },{
                where:{id:req.body.id}
            })
            
            res.json({message:"수정되었습니다"})
        
        }catch(err){
            console.log(err);
            res.json({message:false});
        }
    }
})

router.post('/getInfo', async (req,res)=>{
    try{
        const result = await Member.findOne({
            where:{id:req.body.id}
        })
        res.json({info:result});
    }catch(err){
        console.log(err);
        res.json({info:false})
    }
})

router.post('/register', async (req,res)=>{
    if(!req.session.name){
        res.json({message:'관리자 로그인이 필요합니다'});
    }else{

        try{
            await Member.update({
                newFriend:false,
            },{
                where:{id:req.body.id}
            })
            res.json({message:"등반되었습니다"});
            
        }catch(err){
            console.log(err);
            res.json({message:false});
        }
    }
})

router.post('/new', async (req,res)=>{
    if(!req.session.name){
        res.json({message:'관리자 로그인이 필요합니다'});
    }else{

        try{
            let gender=false
            if(req.body.gender==="남자"){
                gender=true;
            }
            let isStudent=false
            if(req.body.isStudent==="학생"){
                gender=true;
            }
            let b_day;
            if(!req.body.b_day){
                b_day = null
            }else{
                b_day = req.body.b_day
            }
            let year
            if(!req.body.year){
                year = null;
            }else{
                year = req.body.year;
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
            res.json({message:"추가 되었습니다"});
        } catch(err){
            console.log(err);
            res.json({message:false});
        }
    }
})


router.post('/expelledList', async (req,res)=>{
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

router.post('/newList', async (req,res)=>{
    try{
        const list = await Member.findAll({
            where: {newFriend:true}
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
            where: {newFriend:false, expelled:false}, 
            order:[['pasture', 'asc'], ['farm', 'asc'], ['isStudent', 'desc']]
        })
        res.json({list});
    }catch(err){
        console.log(err);
        res.json({list:false});
    }
})

module.exports=router;