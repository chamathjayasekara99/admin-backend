import express from 'express'
import mongoose from 'mongoose';
import logger from '../../utils/logger';
import { User, PLAndFrameworks } from '../models';

const router = express.Router()

router.route('/add-plandframe').post(async (req, res) => {
    try {
        const user = await User.find();
        const newToolAndTech= new PLAndFrameworks(req.body) 
        user.plAndFrameworks.push(newToolAndTech);
        await newToolAndTech.save();
        await user.save();

        res.status(ok).send({ message:"New PL or Framework added",user })

    } catch (e) { logger.error(e.message) }
    
})

router.route('/update/:id').patch(getPLandFrameWowrk, async (req, res) => { 
    const { name, imgUrl } = req.body
    if (name != null)
        res.PLandFramework.name = name 
    if (imgUrl != null)
        res.PLandFramework.imgUrl = imgUrl
    
    try {
        const updatedPlandFrameworks = await res.PLandFramework.save()
        res.json(updatedPlandFrameworks)

    } catch (e) { 
        logger.error(e.message)
    }
})
router.route('/delete/:id').delete(getPLandFrameWowrk, async (req, res) => { 
    try {
        const user = await User.findB()
        user.plAndFrameworks.pull(res.PLandFramework);
        await user.save();
        await PLAndFrameworks.deleteOne(res.PLandFramework)
        res.status(200).send({ message: "Pl and framework deleted." })
    } catch (e) { logger.error(e.message) }
})

async function getPLandFrameWowrk(req, res, next) { 
    const objectId = req.params.id 
    let PLandFramework
    if (!mongoose.Types.ObjectId.isValid(objectId)) {
        logger.error("not object type id")
    } else { 
        try {
            PLandFramework = await PLAndFrameworks.findById(objectId)
            if (PLandFramework == null)
                return res.status(400).send({ message: "Pl and framework is not found is not found" })
        } catch (e) { 
            logger.error(e.message)
        }
     
        res.PLandFramework = PLandFramework       
        
    }
            
        next();
}



export default router
 