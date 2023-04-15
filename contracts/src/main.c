#include "../lib/vntlib.h"

#define MAX_ARR_LEN 10000

typedef struct
{
    string name;          // 校名
    string publicKey;     // 公钥
    string location;      // 位置
    string description;   // 描述
    string dataType;
} university;

typedef struct
{
    string certHash;          // 由学历证书数据生成的hash
    string universityPK; //颁发大学的公钥
    string studentPK; //学生的公钥
    string universitySignature;     // 学历证书颁发者（大学）的私钥对certHash的签名
    string studentSignature;  //学生私钥签名
    string dateOfIssuing;      // 颁布时间
    string certUUID;   // uuid，和数据库中保持一致
    string dataType;
    string universityName;
    string major;
    string cgpa;
    string departmentName;
} certificate;


KEY array(struct{
            string certificateType; // 证书类型
            string id;     // 版本
            array(string) ordering;      // 属性及顺序，参与merkle tree验证
            string dataType;   // 数据类型（schema）
        }) schemas;//存储不同版本的待hash属性模板

KEY array(university) universities;
KEY array(certificate) certificates;

//计数
KEY uint64 certificate_num;
KEY uint64 university_num;
KEY uint64 schema_num;

// 构造函数
constructor $EducationCertificate()
{
    //初始化计数
    certificate_num = 0;
    university_num = 0;
    schema_num = 0;
    //初始化schemas
    schemas.length = MAX_ARR_LEN;
    schemas.index = 0;
    schema_num++;
    schemas.value.certificateType = "university degree";
    schemas.value.dataType = "schema";
    schemas.value.id = "v1";
    schemas.value.ordering.length = 10;
    schemas.value.ordering.index = 0;
    schemas.value.ordering.value = "4";
    schemas.value.ordering.index=1;
    schemas.value.ordering.value = "universityName";
    schemas.value.ordering.index = 2;
    schemas.value.ordering.value = "major";
    schemas.value.ordering.index = 3;
    schemas.value.ordering.value = "departmentName";
    schemas.value.ordering.index = 4;
    schemas.value.ordering.value = "cgpa";

}

// 签发新的证书
MUTABLE
string issueCertificate(string certHash, string universitySignature, string studentSignature, string dateOfIssuing, string certUUID, string universityPK, string studentPK,string universityName,string major,string cgpa,string departmentName) {
    string result="";
    if (certificate_num == 0) {
        certificates.length = MAX_ARR_LEN;
        certificates.index = 0;        
    }
    else {
        certificates.index = certificate_num;
    }
    certificates.value.certHash = certHash;
    certificates.value.universitySignature = universitySignature;
    certificates.value.studentSignature = studentSignature;
    certificates.value.dateOfIssuing = dateOfIssuing;
    certificates.value.certUUID = certUUID;
    certificates.value.universityPK = universityPK;
    certificates.value.studentPK = studentPK;
    certificates.value.universityName = universityName;
    certificates.value.major =major;
    certificates.value.cgpa= cgpa;
    certificates.value.departmentName= departmentName;    
    certificates.value.dataType = "certificate";
    certificate_num++;

    result = Concat(Concat(Concat(ConcatConcat(Concat(Concat(ConcatConcat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(result,
                Concat("CERT", certUUID)), "|"), 
                certHash), "|"),
                universitySignature), "|"),
                studentSignature), "|"),
                dateOfIssuing), "|"),
                certUUID), "|"),
                universityPK), "|"), 
                studentPK),"|"),
                major), "|"),
                cgpa), "|"), 
                departmentName),"|"),                
                "certificate");
    return result;
}

MUTABLE
string registerUniversity(string name, string publicKey, string location, string description) {
    string result = "";
    if (university_num == 0) {
        universities.length = MAX_ARR_LEN;
        universities.index = 0;
    }
    else {
        universities.index = university_num;
    }
    universities.value.name = name;
    universities.value.publicKey = publicKey;
    universities.value.location = location;
    universities.value.description = description;
    universities.value.dataType = "university";
    university_num++;
    result = Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(result,
                name), "|"),
                publicKey), "|"),
                location), "|"),
                description), "|"),
                "university");
    return result;
}


UNMUTABLE
string queryUniversityProfileByName(string name) {
    string result = "";
    for (uint64 i = 0; i < university_num; i++)
    {
        universities.index = i;
        if (Equal(universities.value.name , name)) {
            result = Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(result,
                        universities.value.name), "|"),
                        universities.value.publicKey), "|"),
                        universities.value.location), "|"),
                        universities.value.description), "|"),
                        universities.value.dataType);
            break;
        }
    }
    return result;
}

UNMUTABLE
string queryCertificateSchema(string schemaVersion) {
    string result = "";
    for (uint64 i = 0; i < schema_num; i++) {
        schemas.index = i;
        if (Equal(schemas.value.id , schemaVersion)) {
            schemas.value.ordering.index = 0;
            uint64 order_num = ToU64(schemas.value.ordering.value);
            result = Concat(Concat(Concat(Concat(Concat(Concat(result,
                        schemas.value.certificateType), "|"),
                        schemas.value.dataType), "|"),
                        schemas.value.id), "|");
            for (uint64 j = 1; j <= order_num; j++) {
                schemas.value.ordering.index = j;
                result = Concat(Concat(result, schemas.value.ordering.value), "*");
            }
            break;
        }
    }
    return result;
}


UNMUTABLE
string queryCertificateByUUID(string UUID) {
    string result = "";
    for (uint64 i = 0; i < certificate_num; i++) {
        certificates.index = i;
        if (Equal(certificates.value.certUUID , UUID)) {
            result = Concat(Concat(Concat(Concat(ConcatConcat(Concat(Concat(Concat(ConcatConcat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(result,
                        certificates.value.certHash), "|"),
                        certificates.value.universityPK), "|"),
                        certificates.value.studentPK), "|"),
                        certificates.value.universitySignature), "|"),
                        certificates.value.studentSignature), "|"),
                        certificates.value.dateOfIssuing), "|"),
                        certificates.value.certUUID), "|"),
                        certificates.value.universityName), "|"),
                        certificates.value.major), "|"),
                        certificates.value.cgpa), "|"),
                        certificates.value.departmentName), "|"),                                                                        
                        certificates.value.dataType);
            break;
        }
    }
    return result;
}


UNMUTABLE
string getAllCertificateByStudent(string studentPK){
    string result = "";
    for (uint64 i = 0; i < certificate_num; i++) {
        certificates.index = i;
        if (Equal(certificates.value.studentPK , studentPK)) {
            result = Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(result,
                        certificates.value.certHash), "|"),
                        certificates.value.universityPK), "|"),
                        certificates.value.studentPK), "|"),
                        certificates.value.universitySignature), "|"),
                        certificates.value.studentSignature), "|"),
                        certificates.value.dateOfIssuing), "|"),
                        certificates.value.certUUID), "|"),
                        certificates.value.dataType), "-");
        }
    }
    return result;
}


UNMUTABLE
string getAllCertificateByUniversity(string universityPK){
    string result = "";
    for (uint64 i = 0; i < certificate_num; i++) {
        certificates.index = i;
        if (Equal(certificates.value.universityPK , universityPK)) {
            result = Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(Concat(result,
                        certificates.value.certHash), "|"),
                        certificates.value.universityPK), "|"),
                        certificates.value.studentPK), "|"),
                        certificates.value.universitySignature), "|"),
                        certificates.value.studentSignature), "|"),
                        certificates.value.dateOfIssuing), "|"),
                        certificates.value.certUUID), "|"),
                        certificates.value.dataType), "-");
        }
    }
    return result;
}

UNMUTABLE 
string queryAll(){
    string result="";
    string u= FromU64(university_num);
    string c= FromU64(certificate_num);
    string s= FromU64(schema_num);
    result = Concat(Concat(Concat(Concat(Concat(Concat(result,"大学总数："),u)," 证书总数："),c)," 模板总数"),s);
    return result;	    
}