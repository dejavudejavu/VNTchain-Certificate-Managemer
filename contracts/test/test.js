var fs = require('fs');
var Vnt = require('vnt');
var vntkit = require('vnt-kit');
var TX = require('ethereumjs-tx');
var vnt = new Vnt();

var chainid = 1012;
// 合约部署地址
var contractAddress = '0x5389a5d82636c65a0f9cfdb1b907df46adb9593f';

//定义代码和abi路径
// var codeFile = "/home/zgc/vntchain/bccp/contrcats/output/$Czqq.compress"
// var abiFile = "/home/zgc/vntchain/bccp/contrcats/output/$Czqq.abi"
// 由于fs无法再浏览器中使用，这边直接复制abi到这边
// var abi = JSON.parse('[{"name":"$EducationCertificate","constant":false,"inputs":[],"outputs":[],"type":"constructor"},{"name":"registerUniversity","constant":false,"inputs":[{"name":"name","type":"string","indexed":false},{"name":"publicKey","type":"string","indexed":false},{"name":"location","type":"string","indexed":false},{"name":"description","type":"string","indexed":false}],"outputs":[{"name":"output","type":"string","indexed":false}],"type":"function"},{"name":"queryUniversityProfileByName","constant":true,"inputs":[{"name":"name","type":"string","indexed":false}],"outputs":[{"name":"output","type":"string","indexed":false}],"type":"function"},{"name":"queryCertificateSchema","constant":true,"inputs":[{"name":"schemaVersion","type":"string","indexed":false}],"outputs":[{"name":"output","type":"string","indexed":false}],"type":"function"},{"name":"queryCertificateByUUID","constant":true,"inputs":[{"name":"UUID","type":"string","indexed":false}],"outputs":[{"name":"output","type":"string","indexed":false}],"type":"function"},{"name":"getAllCertificateByStudent","constant":true,"inputs":[{"name":"studentPK","type":"string","indexed":false}],"outputs":[{"name":"output","type":"string","indexed":false}],"type":"function"},{"name":"getAllCertificateByUniversity","constant":true,"inputs":[{"name":"universityPK","type":"string","indexed":false}],"outputs":[{"name":"output","type":"string","indexed":false}],"type":"function"},{"name":"issueCertificate","constant":false,"inputs":[{"name":"certHash","type":"string","indexed":false},{"name":"universitySignature","type":"string","indexed":false},{"name":"studentSignature","type":"string","indexed":false},{"name":"dateOfIssuing","type":"string","indexed":false},{"name":"certUUID","type":"string","indexed":false},{"name":"universityPK","type":"string","indexed":false},{"name":"studentPK","type":"string","indexed":false}],"outputs":[{"name":"output","type":"string","indexed":false}],"type":"function"}]')


// 准备代码和abi
var abiFile = "/root/go/src/github.com/hyperledger/vnt-blockchain-academic-certificates/contracts/src/output/$EducationCertificate.abi"
var wasmabi = fs.readFileSync(abiFile)
//将abi数据解析成json结构
var abi = JSON.parse(wasmabi.toString("utf-8"))

// 设置连接的节点
var vnt = new Vnt();
vnt.setProvider(new vnt.providers.HttpProvider("http://localhost:8545"));

// 解锁用户
var ksDir = "/root/testnet/node0/keystore/"
var kFile1 = "UTC--2023-04-15T03-11-05.065501400Z--b8d73f50304f87dcbd2c6bf5b66b4fe1a117d722"
var pass1 = ""

function openAccount(file, passwd) {
    var content = fs.readFileSync(file).toString("utf-8")
    return vntkit.account.decrypt(content, passwd, false)
}

var account = openAccount(ksDir + kFile1, pass1)


function sendRawTransaction(account, to, data, value ,cb) {
    var nonce = vnt.core.getTransactionCount(account.address);
    var options = {
        nonce: nonce,
        to: to,
        gasPrice: vnt.toHex(vnt.toWei(18, 'Gwei')),
        gasLimit: vnt.toHex(4000000),
        data: data,
        value: value,
        chainId: chainid
    };
    var tx = new TX(options);
    tx.sign(Buffer.from(
        account.privateKey.substring(
            2,
        ),
        'hex'));
    var serializedTx = tx.serialize();
    vnt.core.sendRawTransaction(
        '0x' + serializedTx.toString('hex'), function (err, txHash) {
            if (err) {
                console.log('err happened: ', err);
                console.log('transaction hash: ', txHash);
            } else {
                cb()
                console.log('transaction hash: ', txHash);
            }
        });
}

// 签发新的证书
function issueCertificate(certHash, universitySignature, studentSignature, dateOfIssuing, certUUID, universityPK, studentPK,universityName,major,cgpa,departmentName,callback=(r)=>{
    console.log('r: ', r);
}){
    var contract = vnt.core.contract(abi);
    var data = contract.packFunctionData("issueCertificate", [certHash, universitySignature, studentSignature, dateOfIssuing, certUUID, universityPK, studentPK,universityName,major,cgpa,departmentName]);
    sendRawTransaction(account, contractAddress, data, vnt.toHex(0),()=>{
        var r = queryCertificateByUUID(certUUID);
        callback(r.toString());
    })     
}
// 注册新的大学
function registerUniversity(name, publicKey, location, description,callback=(r)=>{
    console.log('r: ', r);
}){
    var contract = vnt.core.contract(abi);
    var data = contract.packFunctionData("registerUniversity", [name, publicKey, location, description]);
    sendRawTransaction(account, contractAddress, data, vnt.toHex(0),()=>{
        var r = queryUniversityProfileByName(name);
        callback(r.toString());
    }) 
}
// 按名称查询大学
function queryUniversityProfileByName(name){
    var contract = vnt.core.contract(abi).at(contractAddress);
    var r = contract.queryUniversityProfileByName.call(name,{from: account.address});
    console.log('result:', r.toString());
    return r.toString();
}
// 查询证书模板
function queryCertificateSchema(schemaVersion){    
    var contract = vnt.core.contract(abi).at(contractAddress);
    var r = contract.queryCertificateSchema.call(schemaVersion,{from: account.address});
    console.log('result:', r.toString());
    return r.toString();

}
// 通过uuid查询证书
function queryCertificateByUUID(UUID){
    var contract = vnt.core.contract(abi).at(contractAddress);
    var r = contract.queryCertificateByUUID.call(UUID,{from: account.address});
    console.log('result:', r.toString());
    return r.toString();
}
// 获取一个学生的全部证书
function getAllCertificateByStudent(studentPK){
    var contract = vnt.core.contract(abi).at(contractAddress);
    var r = contract.getAllCertificateByStudent.call(studentPK,{from: account.address});
    console.log('result:', r.toString());
    return r.toString();    
}
// 获取一个大学的全部证书
function getAllCertificateByUniversity(universityPK){
    var contract = vnt.core.contract(abi).at(contractAddress);
    var r = contract.getAllCertificateByUniversity.call(universityPK,{from: account.address});
    console.log('result:', r.toString());
    return r.toString();    
}

function queryAll(){
    var contract = vnt.core.contract(abi).at(contractAddress);
    var r = contract.queryAll.call({from: account.address});
    // console.log('result:', r.toString());
    return r.toString();    
}
queryAll()
// queryCertificateByUUID("")
// registerUniversity("东京大学", "testPK", "Shaanxi", "xigongda")
module.exports={
    issueCertificate,
    registerUniversity,
    queryUniversityProfileByName,
    queryCertificateSchema,
    queryCertificateByUUID,
    getAllCertificateByStudent,
    getAllCertificateByUniversity,
    queryAll
}
