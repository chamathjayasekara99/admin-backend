import express from 'express'
import mongoose from 'mongoose'
import logger from '../../utils/logger'

import { User, Achievement } from '../models'

const router = express.Router()

router.route("/add-acheivement").post(async (req, res) => { 
    try {
        const user = await User.find();
        const acheivement = new Achievement(req.body)
        await acheivement.save()
        user.acheivements.push(acheivement);
        await user.save()
        res.json(user)
    } catch (e) { 
        logger.error(e.message)
    }
})
router.route('/update/:id').patch(getAcheivement, async (req, res) => {
  const { acheivementTitle, description, associatedWith, imageUrl } = req.body;

  if (acheivementTitle != null) {
    res.acheivement.acheivementTitle = acheivementTitle;
  }
  if (description != null) {
    res.acheivement.description = description;
  }
  if (associatedWith != null) {
    res.acheivement.associatedWith = associatedWith;
  }
  if (imageUrl != null) {
    res.acheivement.imageUrl = imageUrl;
  }
  try {
    const updated = await res.acheivement.save();
    res.json(updated);
  } catch (e) {
    logger.error(e.message);
  }
});
router.route('/delete/:id').delete(getAcheivement, async (req, res) => {

    const acheivement = res.acheivement;
    try {
        const user = await User.find()
        user.acheivements.poll(acheivement);
        await user.save()
        await Achievement.deleteOne(acheivement)
        res.status(200).send({ message: "deleted successfully"})
    } catch (e) { logger.error(e.message) }
    
})
async function getAcheivement(req, res,next) { 
    const objectId = req.params.id 
    let acheivement 
    if (!mongoose.Types.ObjectId.isValid(objectId)) {
           logger.error("This is not a objectId type")
    } else {
        try { 
            acheivement = await Achievement.findById(objectId)
            if (acheivement ==null) { 
                return res.status(400).send({ message:"Ahceivement is not found"})
            }
            res.acheivement = acheivement;

        } catch (e) { logger.error(e.message)}
       next();
    }
   
}

export default router;