const express=require('express');
const router=express.Router();

const Days=require('../models').Days;
const db=require('../models/index');



router.post('/editAtt', async (req,res)=>{
    try{

        const days_result = await Days.findOne({
            where:{id: req.body.id}
        });

        const map_result = req.body.checkAtt.map((item,index)=>{
            if(item===true){
                return index
            }
        });
        const filter_result = map_result.filter((item)=>{
            if(item !== null){
                return item;
            }
        })

        const result = await days_result.setMembers(filter_result)

      
        res.json({message:"success"});

    }catch(err){
        console.log(err);
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
        res.json({list:false})
        
    }
})


router.post('/checkAtt', async (req,res)=>{
    try{
        
        const isDay = await Days.findOne({
            where:{attendance_day: Date.now()}
        })
        
        if(isDay){
            const del = await Days.destroy({
                where:{attendance_day: Date.now()}
            })
        }
            
        const days_result = await Days.create({
            attendance_day: Date.now()
        });


        const map_result = req.body.checkAtt.map((item,index)=>{
            if(item===true){
                return index
            }
        });
        const filter_result = map_result.filter((item)=>{
            if(item !== null){
                return item;
            }
        })

        days_result.addMembers(filter_result);
        res.json({message:"success"});
    
    

    } catch(err){
        console.log(err);
        res.json({message:false});
    }
})


router.post('/show', async (req,res)=>{
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

        /* const daysList = await Days.findOne({
            where:{id:37},
           
        },)
        const result = await daysList.getMembers();
        console.log(result); */

        // const dayCount = daysList.map((item)=>{
        //     return await 
        // })
        res.json({daysList,AttList});   
    }catch(err){
        console.log(err);
        res.json({daysList:false});
    }
})

module.exports=router;