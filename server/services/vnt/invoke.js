var fs = require('fs');
var Vnt = require('vnt');
var vntkit = require('vnt-kit');
var TX = require('ethereumjs-tx');
const config = require("../../loaders/config.js");

var chainid = parseInt(config.vnt.chainId);
// console.log('chainid: ', chainid);
// 合约部署地址
var contractAddress = config.vnt.contractAddress;

//定义代码和abi路径
// var codeFile = "/home/zgc/vntchain/bccp/contrcats/output/$Czqq.compress"
// var abiFile = "/home/zgc/vntchain/bccp/contrcats/output/$Czqq.abi"
// 由于fs无法再浏览器中使用，这边直接复制abi到这边
// var abi = JSON.parse('[{"name":"$EducationCertificate","constant":false,"inputs":[],"outputs":[],"type":"constructor"},{"name":"registerUniversity","constant":false,"inputs":[{"name":"name","type":"string","indexed":false},{"name":"publicKey","type":"string","indexed":false},{"name":"location","type":"string","indexed":false},{"name":"description","type":"string","indexed":false}],"outputs":[{"name":"output","type":"string","indexed":false}],"type":"function"},{"name":"queryUniversityProfileByName","constant":true,"inputs":[{"name":"name","type":"string","indexed":false}],"outputs":[{"name":"output","type":"string","indexed":false}],"type":"function"},{"name":"queryCertificateSchema","constant":true,"inputs":[{"name":"schemaVersion","type":"string","indexed":false}],"outputs":[{"name":"output","type":"string","indexed":false}],"type":"function"},{"name":"queryCertificateByUUID","constant":true,"inputs":[{"name":"UUID","type":"string","indexed":false}],"outputs":[{"name":"output","type":"string","indexed":false}],"type":"function"},{"name":"getAllCertificateByStudent","constant":true,"inputs":[{"name":"studentPK","type":"string","indexed":false}],"outputs":[{"name":"output","type":"string","indexed":false}],"type":"function"},{"name":"getAllCertificateByUniversity","constant":true,"inputs":[{"name":"universityPK","type":"string","indexed":false}],"outputs":[{"name":"output","type":"string","indexed":false}],"type":"function"},{"name":"issueCertificate","constant":false,"inputs":[{"name":"certHash","type":"string","indexed":false},{"name":"universitySignature","type":"string","indexed":false},{"name":"studentSignature","type":"string","indexed":false},{"name":"dateOfIssuing","type":"string","indexed":false},{"name":"certUUID","type":"string","indexed":false},{"name":"universityPK","type":"string","indexed":false},{"name":"studentPK","type":"string","indexed":false}],"outputs":[{"name":"output","type":"string","indexed":false}],"type":"function"}]')


// 准备代码和abi
var abiFile = config.vnt.abiFile;

var wasmabi = fs.readFileSync(abiFile)
//将abi数据解析成json结构
var abi = JSON.parse(wasmabi.toString("utf-8"))

// 设置连接的节点
var vnt = new Vnt();

vnt.setProvider(new vnt.providers.HttpProvider(config.vnt.providerUrl));

// 解锁用户
var ksDir =config.vnt.ksDir
var kFile1 = config.vnt.kFile
var pass1 = config.vnt.passWord



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
        '0x' + serializedTx.toString('hex'),function (err, txHash) {
            cb(err, txHash)
        }); 
}
// major;
// cgpa;
// departmentName;

// major,cgpa,departmentName;

// 签发新的证书
function issueCertificate(certHash, universitySignature, studentSignature, dateOfIssuing, certUUID, universityPK, studentPK,major,cgpa,departmentName,callback=(r)=>{
    console.log('r: ', r);
}){ 
    var contract = vnt.core.contract(abi);
    var data = contract.packFunctionData("issueCertificate", [certHash, universitySignature, studentSignature, dateOfIssuing, certUUID, universityPK, studentPK,major,cgpa,departmentName]);
    sendRawTransaction(account, contractAddress, data, vnt.toHex(0),(err, txHash)=>{
        var r = queryCertificateByUUID(certUUID);
        callback(r,err, txHash);
    }) 
}
// 注册新的大学
function registerUniversity(name, publicKey, location, description,callback=(r)=>{
    console.log('r: ', r);
}){
    var contract = vnt.core.contract(abi);
    var data = contract.packFunctionData("registerUniversity", [name, publicKey, location, description]);
    sendRawTransaction(account, contractAddress, data, vnt.toHex(0),(err, txHash)=>{
        var r = queryUniversityProfileByName(name);        
        callback(r,err, txHash);
    }) 
}
// 按名称查询大学
function queryUniversityProfileByName(name){
    var contract = vnt.core.contract(abi).at(contractAddress);
    var r = contract.queryUniversityProfileByName.call(name,{from: account.address});
    let str = r.toString()
    let arr;
    arr = str.split("|").filter((element) => {
        return element !== ""; // 根据该条件判断数组元素是否为空字符串
    });  
    let att=["name","publicKey","location","description","dataType"]
    let obj =new Object();
    arr.forEach((element,i) => {
        obj[att[i]]=element
    });          
    return obj;
}
// 查询证书模板
function queryCertificateSchema(schemaVersion){    
    var contract = vnt.core.contract(abi).at(contractAddress);
    var r = contract.queryCertificateSchema.call(schemaVersion,{from: account.address});
    let str = r.toString()
    let arr;
    arr = str.split("|").filter((element) => {
        return element !== ""; // 根据该条件判断数组元素是否为空字符串
    }); 
    arr=arr.map((e)=>{
        e=e.split("*").filter((element) => {
            return element !== ""; // 根据该条件判断数组元素是否为空字符串
        });
        if(e.length===1){   
            e=e[0]
        }
        return e
    })
    let att=["certificateType","dataType","id","ordering"]
    let obj =new Object();
    arr.forEach((element,i) => {
        obj[att[i]]=element
    });    
    return obj;

}
// 通过uuid查询证书
function queryCertificateByUUID(UUID){
    var contract = vnt.core.contract(abi).at(contractAddress);
    var r = contract.queryCertificateByUUID.call(UUID,{from: account.address});
    let str = r.toString()
    let arr;
    arr = str.split("|").filter((element) => {
        return element !== ""; // 根据该条件判断数组元素是否为空字符串
    });     

    let att=["certHash","universityPK","studentPK","universitySignature","studentSignature","dateOfIssuing","certUUID",'major','cgpa','departmentName',"dataType"]
    let obj =new Object();
    arr.forEach((element,i) => {
        obj[att[i]]=element
    });

    return obj;
}
// 获取一个学生的全部证书
function getAllCertificateByStudent(studentPK){
    console.log('studentPK: ', typeof(studentPK));
    var contract = vnt.core.contract(abi).at(contractAddress);
    var r = contract.getAllCertificateByStudent.call(studentPK,{from: account.address});
    let str = r.toString()
    console.log('str: ', str);
    
    let arr;
    arr = str.split("-").filter((element) => {
        return element !== ""; // 根据该条件判断数组元素是否为空字符串
    }); 
    arr=arr.map((e)=>{
        return e.split("|").filter((element) => {
            return element !== ""; // 根据该条件判断数组元素是否为空字符串
        });
    })
    let att=["certHash","universityPK","studentPK","universitySignature","studentSignature","dateOfIssuing","certUUID","dataType"]
    arr=arr.map((e)=>{
        let obj =new Object();
        e.forEach((element,i) => {
            obj[att[i]]=element
        });
        return obj;
    })
    return arr;    
}
// 获取一个大学的全部证书
function getAllCertificateByUniversity(universityPK){
    var contract = vnt.core.contract(abi).at(contractAddress);
    var r = contract.getAllCertificateByUniversity.call(universityPK,{from: account.address});
    let str = r.toString()
    console.log('str: ', str);
    let arr;
    arr = str.split("-").filter((element) => {
        return element !== ""; // 根据该条件判断数组元素是否为空字符串
    }); 
    arr=arr.map((e)=>{
        return e.split("|").filter((element) => {
            return element !== ""; // 根据该条件判断数组元素是否为空字符串
        });
    })
    let att=["certHash","universityPK","studentPK","universitySignature","studentSignature","dateOfIssuing","certUUID","dataType"]
    arr=arr.map((e)=>{
        let obj =new Object();
        e.forEach((element,i) => {
            obj[att[i]]=element
        });
        return obj;
    })
    return arr;   
}

function queryAll(universityPK){
    var contract = vnt.core.contract(abi).at(contractAddress);
    var r = contract.queryAll.call(universityPK,{from: account.address});
    console.log('result:', r.toString());
    return r.toString();    
}
// registerUniversity("东京大学", "testPK", "Beijing", "beida")
queryAll()
// queryCertificateByUUID("6437b9bb34910c38b6449fe9")
// getAllCertificateByStudent("11@qq.com")
// queryCertificateByUUID("6437ca414bec407ef5144a06")
// getAllCertificateByStudent("12@qq.com")
// cs.issueCertificate("c1", "universitySignature", "studentSignature", "dateOfIssuing", "c1uuid", "testPK", "studentPK1")
// cs.issueCertificate("c2", "universitySignature", "studentSignature", "dateOfIssuing", "c2uuid", "testQH", "studentPK1")
// cs.issueCertificate("c3", "universitySignature", "studentSignature", "dateOfIssuing", "c3uuid", "testQH", "studentPK1")
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
