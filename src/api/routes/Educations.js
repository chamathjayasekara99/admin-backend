import express from 'express'
import mongoose from 'mongoose';
import logger from '../../utils/logger';

import { User, Education } from '../models'

const router = express.Router();

router.route("/add-education").post(async (req, res) => { 
    try { 
        const user = await User.find()
        const education = new Education(education);
        await education.save();
        user.education.push(education)
        await user.save();

        res.json(user)
        
    } catch (e) { logger.error(e.message)}
})

router.route("/update/:id").patch(getEducation, async (req, res) => {
    const { level, school, streamOrSpecialisation, Grade } = req.body;
    
    if (level != null) {
        res.education.level= level; 
    }
    if (school != null) { 
        res.education.school=school
    }
    if (streamOrSpecialisation != null) { 
        res.education.streamOrSpecialisation=streamOrSpecialisation
    }
    if (Grade != null) { 
        res.education.Grade=Grade
    }
    try {
        const updatedEduction = await res.education.save();
        res.json(updatedEduction)
    } catch (e) { 
        logger.error(e.message)
    }

})
router.route("/delete/:id").delete(getEducation,async (req, res) => {
    const education = res.education;
    try {
        const user = await User.find();
        user.education.pull(education);
        await user.save();
        await Education.deleteOne(education)
        res.status(200).send({message:"Education deleted successfull"})
    } catch (e) { 
        logger.error(e.message)    }
    
})
async function getEducation(req, res, next) { 
    const objectid = req.params.id
    let education 
    
    if (!mongoose.Types.ObjectId.isValid(objectid)) {
       logger.error("ObjectId is not found")
    } else { 
        try {
            education = await Education.findById(objectid);
            if (education == null) return res
              .status(400)
                .send({ message: 'Education qualification is not found' });
             
            res.education = education;
            
        } catch (e) { logger.error(e.message) }

        next()
        
         
    }
}

export default router; 