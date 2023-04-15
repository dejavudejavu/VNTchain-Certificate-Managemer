let universities = require('../database/models/universities');
// let fabricEnrollment  = require('../services/fabric/enrollment');
let invoke = require('../services/vnt/invoke');
let logger = require("../services/logger");
let universityService = require("../services/university-service");


let title = "University";
let root = "university";


async function postRegisterUniversity(req, res, next) {
        console.log('req.body: ', req.body);

    try {
        let dbResponse = await universities.create({
            name : req.body.name,
            email: req.body.email,
            description: req.body.description,
            location: req.body.location,
            password: req.body.password,
            publicKey: req.body.email
        });
        let result = invoke.registerUniversity(req.body.name, req.body.email, req.body.location, req.body.description,(result,err, txHash)=>{            
            if(err){
                res.status(201).send(err.message)
            }
            else{
                res.send(txHash)
            }
        })
    }
    catch (e) {
        // res.status(201).send(e)
        logger.error(e);
        next(e);
    }
}

async function postLoginUniversity (req,res,next) {
    try { 
        let universityObject = await universities.validateByCredentials(req.body.email, req.body.password)

        res.send(universityObject)
    } catch (e) {
        logger.error(e);
        next(e);
    }
}


async function postIssueCertificate(req,res,next) {
    try {
        let certData = {
            studentEmail: req.body.studentEmail,
            studentName: req.body.studentName,
            universityName: req.body.name,
            universityEmail: req.body.email,
            major: req.body.major,
            departmentName:  req.body.department,
            cgpa: req.body.cgpa,
            dateOfIssuing: req.body.date,
        };
        let result =await universityService.issueCertificate(certData,(result,err, txHash)=>{
            if(err){
                res.status(201).send(err.message)
            }
            else{
                res.send(txHash)
            }
        });

    } catch (e) {
        logger.error(e);
        next(e);
    }
}

async function getDashboard(req, res, next) {
    try {
        let certData = await universityService.getCertificateDataforDashboard(req.query.name, req.query.email);
        res.send(certData)

    } catch (e) {
        logger.error(e);
        next(e);
    }
}
module.exports = {postRegisterUniversity, postLoginUniversity, postIssueCertificate, getDashboard};   