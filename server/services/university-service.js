const universities = require('../database/models/universities');
const certificates = require('../database/models/certificates');
const students = require('../database/models/students');
// const chaincode = require('./fabric/chaincode');
const logger = require("./logger");
const encryption = require('./encryption');
const certificateService = require('./certificate-service');
const invoke = require("./vnt/invoke")


/**
 * Create certificate object in database and ledger.
 * For ledger - data needs to be cryptographically signed by student and university private key.
 * @param {certificates.schema} certData
 * @returns {Promise<{}>}
 */
async function issueCertificate(certData,callback) {

    let universityObj = await universities.findOne({"email": certData.universityEmail});
    let studentObj = await students.findOne({"email": certData.studentEmail});

    if (!studentObj) throw new Error("Could not fetch student profile. Provide valid student email.");
    if (!universityObj) throw new Error("Could not fetch university profile.");

    let certDBModel = new certificates(certData);        

    let mTreeHash =  await encryption.generateMerkleRoot(certDBModel);
    
    let universitySignature = await encryption.createDigitalSignature(mTreeHash, certData.universityEmail);
    let studentSignature = await encryption.createDigitalSignature(mTreeHash, certData.studentEmail);

    let chaincodeResult = invoke.issueCertificate(mTreeHash, universitySignature, studentSignature, certData.dateOfIssuing, certDBModel._id.toString(), universityObj.publicKey, studentObj.publicKey,certData.major,certData.cgpa,certData.departmentName,certData.universityName,async (result,err, txHash)=>{                    
        if(!err){
            let res = await certDBModel.save();
            if(!res) throw new Error("Could not create certificate in the database");            
        }
        callback(result,err, txHash)
    })
    logger.debug(chaincodeResult);
    return true; //If no errors were thrown, everything completed successfully.
}

/**
 * Fetch and return all certificates issued by a specific university
 * @param {String} universityName
 * @param {String} universtiyEmail
 * @returns {Promise<certificates[]>}
 */
async function getCertificateDataforDashboard(universityName, universtiyEmail) {

    let universityProfile = invoke.queryUniversityProfileByName(universityName)

    let certLedgerDataArray = invoke.getAllCertificateByUniversity(universityProfile.publicKey)
    let certUUIDArray = certLedgerDataArray.map( element => {
        return element.certUUID
    });
    let certDBRecords = await certificates.find().where('_id').in(certUUIDArray).exec();
    return certificateService.mergeCertificateData(certDBRecords, certLedgerDataArray);
}


module.exports = {issueCertificate,  getCertificateDataforDashboard};