import express from 'express';

import { User,MyProject} from '../models';
import logger from '../../utils/logger';
import mongoose from 'mongoose';

const router= express.Router();
router.route('/').get(async (req,res)=>{
   try{
    const  projects= await MyProject.find()
    res.send(projects)
   }catch(e){
    logger.error(e.message)
   }  
  
})
router.route('/add-projects').post(async(req,res)=>{
    try{const user  = await User.findOne();
  
        req.body.map((project)=>{
        const newProjct = new MyProject(project);
        newProjct.save()
        user.projects.push(newProjct);

    })
    await user.save();
    res.send({status:"Okay",user})
}catch(e){
    logger.error(e.message)
}
    

})
router.route('/delete/:id').delete(getProject,async(req,res)=>{   
    const project= res.project
   
    

        try{     
            const user= await User.findOne()
            //I forgot to use await so error occurred aying casting object id failed
           
            user.projects.pull(project)
            await user.save();
            
            await MyProject.deleteOne(project)
            res.send(user);
        }catch(e){
            logger.error(e.message)
        }
    
    }
    
)
router.route("/update/:id").patch(getProject, async (req, res) => { 
    const { title ,description,githubLink,hostedLink,usedTechnology} = req.body;
    if (title != null) {
      res.project.title = title;
    }
    if (description != null) {
      res.project.description = description;
    }
    if (githubLink != null) { 
        res.project.githubLink=githubLink
    }
    if (hostedLink != null) {
        res.project.hostedLink=hostedLink
    }
    if (typeof usedTechnology != 'undefined' && usedTechnology.length > 0) {
        res.project.usedTechnology=usedTechnology
    }
    try {
        const updatedProject = await res.project.save()
        res.json(updatedProject)
    } catch (e) { 
        logger.error(e.message)
    }
})
//creating a middleware to get porject object
async function getProject(req,res,next){
    let projectId = req.params.id;
    let project
    if (!mongoose.Types.ObjectId.isValid(projectId)){
        logger.error("This id is not the valid objectId")
    }else{
       
    try{ 

        project =await MyProject.findById(projectId)
        if(project==null){
            return res.status(400).json({message:'Cannot find subscriber'})
        }
    }catch(e){
        logger.error(e.message)
    }

    res.project=project

    }
    next()
 }

export default router;
