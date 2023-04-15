
const certificates = require('../database/models/certificates');
// const students = require('../database/models/students');
// const chaincode = require('./fabric/chaincode');
// const logger = require("./logger");
// const encryption = require('./encryption');
const certificateService = require('./certificate-service');
const invoke = require("./vnt/invoke")


async function getCertificateDataforDashboard(studentPublicKey, studentEmail) {
    let certLedgerDataArray = invoke.getAllCertificateByStudent(studentPublicKey)
    let certUUIDArray = certLedgerDataArray.map( element => {
        return element.certUUID
    });

    let certDBRecords = await certificates.find().where('_id').in(certUUIDArray).exec();
    return certificateService.mergeCertificateData(certDBRecords, certLedgerDataArray);
}


module.exports = {getCertificateDataforDashboard}