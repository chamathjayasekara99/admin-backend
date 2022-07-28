import express from "express";
import mongoose from "mongoose";
import logger from "../../utils/logger";

import { User, ToolAndTech } from '../models'


const router = express.Router()

router.route('/add-education').post( async(req, res)=>{ 
    
    try {
        
          const user = await User.find()
          const newtoolAndTechs = new ToolAndTech(res.body);
          await newtoolAndTechs.save()

           user.toolsAndTech.push(newtoolAndTechs)
           await user.save();
           res.status(200).send({status:"suceed"})
    } catch (e)
    {
        logger.error(e.message)
    }
   
})
router.route('/delete/:id').delete(getToolsAndTech,async (req, res) => { 
    try {
        const user = await User.findOne();
        user.toolsAndTech.pull(res.toolsAndTech);
        await user.save()
        await ToolAndTech.deleteOne(res.toolsAndTech);
        res.send(user)
    } catch (e) { 
        logger.error(e.message)
    }
})
router.route('/update/:id').patch(getToolsAndTech, async (req, res) => { 
  const { name, imgUrl } = res.body;
  if (name != null) { 
    res.toolsAndTech.name=name 
  }
  if (imgUrl != null) { 
    res.toolsAndTech.imgUrl=imgUrl
  }
  try {
    const updatedToolsAndTech = await res.toolsAndTech.save()
    res.json(updatedToolsAndTech)
    
   } catch (e) { logger.error(e.message)}

})

// router.route()

//middleware

async function getToolsAndTech(req, res, next) { 
    let objecId = req.params.id;
    let tooslsAndTech
    if (mongoose.Types.ObjectId.isValid(objecId)) {
      try {
        tooslsAndTech = await ToolAndTech.findById(objecId);
        if (tooslsAndTech == null)
          return res.status(400).send({ message: 'not found' });
      } catch (e) {
        logger.error(e.message);
      }
      res.toolsAndTech = tooslsAndTech;
     
    } else {
      logger.error('This id is not object id type');
    }
     next();
}

export default router