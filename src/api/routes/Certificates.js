import express from 'express'
import mongoose from 'mongoose';
import logger from '../../utils/logger';

import { User, Certificate } from '../models';

const router = express.Router()

router.route('/add-certificates').post(async (req, res) => {
    try { 
        const user = await User.find()
        const certificate = new Certificate(req.body)
        await certificate.save()
        user.certificates.push(certificate)
        await user.save();
        res.json(user)
    } catch (e) {
        logger.error(e.message)
    }
})
router.route('/update/:id').patch(getCertificate, async (req, res) => { 
    const { title, associatedWith, issueDate, expirationDate } = res.body;
    const certificate = res.certificate
   
    if (title != null) { 
        certificate.title=title

    }
    if (associatedWith != null) { 
        certificate.associatedWith=associatedWith
    }
    if (issueDate != null) { 
        certificate.issueDate=issueDate
    }
    if (expirationDate != null) { 
        certificate.expirationDate=expirationDate
    }
    try { 
        const updatedCertificate = await certificate.save()
        res.json(updatedCertificate)
    } catch (e) { logger.error(e.message)}
})
router.route('/delete/:id').delete(getCertificate, async (req, res) => {
    const certificate =res.certificate
    try {
        const user = await User.find()
        user.certificates.pull(certificate)
        await user.save();
        await Certificate.deleteOne(certificate)
        res.status(200).send({ message: "cetificate is deleted"})

    } catch (e) { 
        logger.error(e.message)
    }
    
})
async function getCertificate(req, res,next) { 
    const objectId = req.params.id 
    let certificate
    if (!mongoose.Types.ObjectId.isValid(objectId)) {
        logger.error("This is not a objectId type id")
    } else { 
        try {
            certificate = await Certificate.findById(objectId)
            if (certificate == null) { 
                return res.status(400).status({ message: "educaiton qulaification is not found"})
            }
            res.certificate= certificate
        } catch (e) { 
            logger.error(e.message)
        }
        next()
    }
}

export default router


