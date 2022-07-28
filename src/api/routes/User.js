import express from 'express';

import { User,MyProject,ToolAndTech,PLAndFrameworks,Education,Achievement,Certificate} from '../models';
import logger from '../../utils/logger';
const SUCCESS_STATUS = 200;
const UNSUCCESS_ERROR = 500;

const router = express.Router();


router.route('/add').post(async(req, res) => {

  
  const {
    name,
    roles,
    propicUrl,
    gmail,
    address,
    contactNumber,
    facebookUrl,
    githubUrl,
    linkedInUrl,
    projects,
    toolsAndTech,
    education,
    plAndFrameworks,
    certificates,
    acheivements,

  } = req.body;

  //inserMany function return acknkowledgemet and an array containing
  //primary key
  try{ 
    const newUser = new User({
      name,
      roles,
      propicUrl,
      gmail,
      address,
      contactNumber,
      facebookUrl,
      githubUrl,
      linkedInUrl,

    });
   //insert each item and save
   //inorder to save we need to User their models
    projects.map((project)=>{ 
      const newProject = new MyProject(project)
      newProject.save()
      newUser.projects.push(newProject)
    })
    toolsAndTech.map((toolATech)=>{
      const newToolATech= new ToolAndTech(toolATech)
       newToolATech.save()
      newUser.toolsAndTech.push(newToolATech)
    })
    plAndFrameworks.map((plaf)=>{
      const newPlaf= new PLAndFrameworks(plaf)
       newPlaf.save()
      newUser.plAndFrameworks.push(newPlaf)
    })
    education.map((edt)=>{
      const newEdt= new Education(edt)
     newEdt.save()
      newUser.education.push(newEdt)
    })
    certificates.map((cert)=>{
      const newCert= new Certificate(cert)
       newCert.save()
      newUser.certificates.push(newCert)
    })
     acheivements.map((ach)=>{
      const newAch = new Achievement(ach)
       newAch.save()
        newUser.acheivements.push(newAch)
    })


      const UserDetails=await newUser.save()
      res.json("User added")

   }catch(e){
 
      logger.error(e.message);
   
   }
  
 


});
//retrive all
router.route('/').get(async(req, res) => {
   
  try{
    const UserDetails = await User.find().populate("projects").populate("toolsAndTech").populate("education").populate("plAndFrameworks").populate("certificates").populate("acheivements")
    res.json(UserDetails)
  }catch(e){
    logger.error(e.message)

  }
});

router.route('/update/:id').put(async (req, res) => {
  let userId = req.params.id;
  const {
    name,
    roles,
    propicUrl,
    gmail,
    address,
    contactNumber,
    facebookUrl,
    githubUrl,
    linkedInUrl,
  } = req.body;
  //i was using new User({}) that is for creating new obkects
  const updatedObject = {
    name,
    roles,
    propicUrl,
    gmail,
    address,
    contactNumber,
    facebookUrl,
    githubUrl,
    linkedInUrl,
  };
  const update = await User.findByIdAndUpdate(userId, updatedObject)
    .then((user) => {
      res.status(SUCCESS_STATUS).send({ status: 'User updated', user });
    })
    .catch((err) => {
      res
        .status(UNSUCCESS_ERROR)
        .send({ status: 'Error with updating user', error: err.message });
    });
  logger.info(update);
});
router.route('/delete/:id').delete(async (req, res) => {
  let userId = req.params.id;
  await User.findByIdAndDelete(userId)
    .then(() => {
      res.status(201).send({ status: 'deletion success' });
    })
    .catch((err) => res.status(UNSUCCESS_ERROR).send({ error: err.message }));
});
router.route('/get/:id').get(async (req, res) => {
  let userId = req.params.id;
  await User.findById(userId)
    .then((user) => {
      res.status(SUCCESS_STATUS).send({ status: 'user rceived', user });
    })
    .catch((err) => {
      res
        .status(UNSUCCESS_ERROR)
        .send({ status: 'user is not found', error: err.message });
    });
});

export default router;


