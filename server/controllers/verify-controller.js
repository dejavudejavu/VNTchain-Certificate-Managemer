let logger = require("../services/logger");
let encryption = require('../services/encryption');
let certificates = require('../database/models/certificates');
let moment = require('moment');
let title = "Verification Portal";
let root = "verify";
const config = require("../loaders/config.js");
const CryptoJS = require("crypto-js");


async function postVerify(req,res,next) {
    try {
        // Decrypt
        let bytes  = CryptoJS.AES.decrypt(req.body.proofObject, config.vnt.secretPassword);
        try{
            var proofObject = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }catch(e){
            res.send("verify-fail")
        }

        if (!proofObject.disclosedData || Object.keys(proofObject.disclosedData).length === 0  ) {
            throw new Error("No parameter given. Provide parameters that need to be verified");
        }
        let proofIsCorrect = await encryption.verifyCertificateProof(proofObject.proof, proofObject.disclosedData, proofObject.certUUID );
        if (proofIsCorrect) {
            let certificateDbObject = await certificates.findOne({"_id": proofObject.certUUID}).select("studentName studentEmail _id dateOfIssuing universityName universityEmail");
            res.send("verify-success")
        } else {
            res.send("verify-fail")
        }
    } catch (e) {
        logger.error(e);
        next(e);
    }
}

module.exports = {postVerify};