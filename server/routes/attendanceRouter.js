const express=require('express');
const router=express.Router();

const Days=require('../models').Days;
const Attendance=require('../models').Attendance;
const Member=require('../models').Member;


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
        
        const newMember = await Member.findAll({
            where:{newFriend:1},
        })

        await Promise.all(newMember.forEach((item)=>{
            Attendance.update(
                {newFriend:1},
                {where:{memberid:item.id}}
            )
        }))
        
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
            await Days.create({
                attendance_day: Date.now()
            });

            const filter_result = req.body.checkAtt.filter((item)=>{
                if(item !== null){
                    return item;
                }
            })

            const dayId = await Days.findOne({
                where:{attendance_day:Date.now()},
            })
            
            filter_result.forEach( async (item)=>{
                const isnew = await Member.findOne({
                    where:{id:item}
                })
                await Attendance.create({
                    dayId:dayId.id,
                    memberId:item,
                    newFriend:isnew.newFriend,
                })
            })
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
        })

        const AttList= await Promise.all(daysList.map(async(item)=>{
            return await Attendance.findAll({
                where:{dayId:item.id},
            })
        }))
    
        res.json({message:true, daysList, AttList})
    }catch(err){
        console.log(err)
        res.json({message:false});
    }
    
})

module.exports=router;