let students = require('../database/models/students');
// let fabricEnrollment  = require('../services/fabric/enrollment');
// let invoke = require('../services/vnt/invoke');
let logger = require("../services/logger");
let studentService = require('../services/student-service');

let title = "Student Dashboard";
let root = "student";


async function postRegisterStudent(req, res, next) {
    try {
        let dbResponse = await students.create({
            name : req.body.name,
            email: req.body.email,
            password: req.body.password,
            publicKey: req.body.email
        });
        

        res.render("register-success", { title, root,
            logInType: req.session.user_type || "none"});
    }
    catch (e) {
        logger.error(e);
        next(e);
    }
}




async function postLoginStudent (req,res,next) {
    try {
        let studentObject = await students.validateByCredentials(req.body.email, req.body.password) 
        res.send(studentObject);

    } catch (e) {
        logger.error(e);
        next(e);
    }
}


async function getDashboard(req, res, next) {
    try {
        let certData = await studentService.getCertificateDataforDashboard(req.query.email, req.query.email);        
        res.send(certData);
    } catch (e) {
        logger.error(e);
        next(e);
    }
}

module.exports = {postRegisterStudent, postLoginStudent, getDashboard};
