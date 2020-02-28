const express=require('express');
const router=express.Router();

const Days=require('../models').Days;

router.post('/editAtt', async (req,res)=>{
    try{
        const days_result = await Days.findOne({
            where:{id: req.body.id}
        });
        const filter_result =  req.body.checkAtt.filter((item)=>{
            if(item !== null){
                return item;
            }
        })
        await days_result.setMembers(filter_result)
      
        res.json({message:"수정되었습니다"});
    }catch(err){
        console.log(err);
        res.json({message:false})
    }
})

router.post('/editList', async (req,res)=>{
    try{
        const isDay = await Days.findOne({
            where:{id: req.body.id},
        })
        
        const list = await isDay.getMembers();

        res.json({list})
    }catch(err){
        console.log(err);
        res.json({list:false})
    }
})

router.post('/checkAtt', async (req,res)=>{
    try{
        const isDay = await Days.findOne({
            where:{attendance_day: Date.now()}
        })
        
        if(isDay){
            res.json({message:"오늘은 이미 출석하였습니다!"})
        }else{
            const days_result = await Days.create({
                attendance_day: Date.now()
            });

            const filter_result = req.body.checkAtt.filter((item)=>{
                if(item !== null){
                    return item;
                }
            })
            days_result.addMembers(filter_result);
        }
        res.json({message:"출석이 완료 되었습니다"});

    } catch(err){
        console.log(err);
        res.json({message:false});
    }
})

router.post('/showgraph', async (req,res)=>{
    try{
        const daysList = await Days.findAll({  
            order:[['attendance_day', 'asc']]
        },)

        const listMap = await Promise.all(daysList.map((item)=>{
            return Days.findOne({
                where:{attendance_day:item.attendance_day},
            })
        }))

        const AttList = await Promise.all(listMap.map((item)=>{
            return item.getMembers();
        }))

        res.json({message:true, daysList, AttList})
    }catch(err){
        console.log(err)
        res.json({message:false});
    }
    
})

module.exports=router;