#include "../lib/vntlib.h"

#define MAX_ARR_LEN 10000

typedef struct
{
    string name;                   
    string publicKey;              
    string location;               
    string description;            
    string dataType;
} university;

typedef struct
{
    string certHash;                                               
    string universityPK;                        
    string studentPK;                  
    string universitySignature;                                                                      
    string studentSignature;                      
    string dateOfIssuing;                     
    string certUUID;                                        
    string dataType;
    string universityName;
    string major;
    string cgpa;
    string departmentName;
} certificate;


KEY array(struct{
            string certificateType;                
            string id;              
            array(string) ordering;                                                  
            string dataType;                              
        }) schemas;                                          

KEY array(university) universities;
KEY array(certificate) certificates;

        
KEY uint64 certificate_num;
KEY uint64 university_num;
KEY uint64 schema_num;

               

void keysua4f14w(){
AddKeyInfo( &universities.value.name, 6, &universities, 9, false);
AddKeyInfo( &universities.value.name, 6, &universities.index, 4, true);
AddKeyInfo( &universities.value.name, 6, &universities.value.name, 9, false);
AddKeyInfo( &schema_num, 4, &schema_num, 9, false);
AddKeyInfo( &certificates.value.major, 6, &certificates, 9, false);
AddKeyInfo( &certificates.value.major, 6, &certificates.index, 4, true);
AddKeyInfo( &certificates.value.major, 6, &certificates.value.major, 9, false);
AddKeyInfo( &certificates.value.universityPK, 6, &certificates, 9, false);
AddKeyInfo( &certificates.value.universityPK, 6, &certificates.index, 4, true);
AddKeyInfo( &certificates.value.universityPK, 6, &certificates.value.universityPK, 9, false);
AddKeyInfo( &certificates.length, 4, &certificates, 9, false);
AddKeyInfo( &universities.length, 4, &universities, 9, false);
AddKeyInfo( &certificate_num, 4, &certificate_num, 9, false);
AddKeyInfo( &universities.value.location, 6, &universities, 9, false);
AddKeyInfo( &universities.value.location, 6, &universities.index, 4, true);
AddKeyInfo( &universities.value.location, 6, &universities.value.location, 9, false);
AddKeyInfo( &schemas.value.ordering.value, 6, &schemas, 9, false);
AddKeyInfo( &schemas.value.ordering.value, 6, &schemas.index, 4, true);
AddKeyInfo( &schemas.value.ordering.value, 6, &schemas.value.ordering, 9, false);
AddKeyInfo( &schemas.value.ordering.value, 6, &schemas.value.ordering.index, 4, true);
AddKeyInfo( &certificates.value.universityName, 6, &certificates, 9, false);
AddKeyInfo( &certificates.value.universityName, 6, &certificates.index, 4, true);
AddKeyInfo( &certificates.value.universityName, 6, &certificates.value.universityName, 9, false);
AddKeyInfo( &certificates.value.certUUID, 6, &certificates, 9, false);
AddKeyInfo( &certificates.value.certUUID, 6, &certificates.index, 4, true);
AddKeyInfo( &certificates.value.certUUID, 6, &certificates.value.certUUID, 9, false);
AddKeyInfo( &schemas.value.dataType, 6, &schemas, 9, false);
AddKeyInfo( &schemas.value.dataType, 6, &schemas.index, 4, true);
AddKeyInfo( &schemas.value.dataType, 6, &schemas.value.dataType, 9, false);
AddKeyInfo( &universities.value.dataType, 6, &universities, 9, false);
AddKeyInfo( &universities.value.dataType, 6, &universities.index, 4, true);
AddKeyInfo( &universities.value.dataType, 6, &universities.value.dataType, 9, false);
AddKeyInfo( &universities.value.publicKey, 6, &universities, 9, false);
AddKeyInfo( &universities.value.publicKey, 6, &universities.index, 4, true);
AddKeyInfo( &universities.value.publicKey, 6, &universities.value.publicKey, 9, false);
AddKeyInfo( &schemas.value.certificateType, 6, &schemas, 9, false);
AddKeyInfo( &schemas.value.certificateType, 6, &schemas.index, 4, true);
AddKeyInfo( &schemas.value.certificateType, 6, &schemas.value.certificateType, 9, false);
AddKeyInfo( &certificates.value.studentPK, 6, &certificates, 9, false);
AddKeyInfo( &certificates.value.studentPK, 6, &certificates.index, 4, true);
AddKeyInfo( &certificates.value.studentPK, 6, &certificates.value.studentPK, 9, false);
AddKeyInfo( &schemas.value.id, 6, &schemas, 9, false);
AddKeyInfo( &schemas.value.id, 6, &schemas.index, 4, true);
AddKeyInfo( &schemas.value.id, 6, &schemas.value.id, 9, false);
AddKeyInfo( &certificates.value.universitySignature, 6, &certificates, 9, false);
AddKeyInfo( &certificates.value.universitySignature, 6, &certificates.index, 4, true);
AddKeyInfo( &certificates.value.universitySignature, 6, &certificates.value.universitySignature, 9, false);
AddKeyInfo( &schemas.value.ordering.length, 4, &schemas, 9, false);
AddKeyInfo( &schemas.value.ordering.length, 4, &schemas.index, 4, true);
AddKeyInfo( &schemas.value.ordering.length, 4, &schemas.value.ordering, 9, false);
AddKeyInfo( &certificates.value.departmentName, 6, &certificates, 9, false);
AddKeyInfo( &certificates.value.departmentName, 6, &certificates.index, 4, true);
AddKeyInfo( &certificates.value.departmentName, 6, &certificates.value.departmentName, 9, false);
AddKeyInfo( &schemas.length, 4, &schemas, 9, false);
AddKeyInfo( &certificates.value.studentSignature, 6, &certificates, 9, false);
AddKeyInfo( &certificates.value.studentSignature, 6, &certificates.index, 4, true);
AddKeyInfo( &certificates.value.studentSignature, 6, &certificates.value.studentSignature, 9, false);
AddKeyInfo( &certificates.value.dataType, 6, &certificates, 9, false);
AddKeyInfo( &certificates.value.dataType, 6, &certificates.index, 4, true);
AddKeyInfo( &certificates.value.dataType, 6, &certificates.value.dataType, 9, false);
AddKeyInfo( &certificates.value.cgpa, 6, &certificates, 9, false);
AddKeyInfo( &certificates.value.cgpa, 6, &certificates.index, 4, true);
AddKeyInfo( &certificates.value.cgpa, 6, &certificates.value.cgpa, 9, false);
AddKeyInfo( &certificates.value.dateOfIssuing, 6, &certificates, 9, false);
AddKeyInfo( &certificates.value.dateOfIssuing, 6, &certificates.index, 4, true);
AddKeyInfo( &certificates.value.dateOfIssuing, 6, &certificates.value.dateOfIssuing, 9, false);
AddKeyInfo( &certificates.value.certHash, 6, &certificates, 9, false);
AddKeyInfo( &certificates.value.certHash, 6, &certificates.index, 4, true);
AddKeyInfo( &certificates.value.certHash, 6, &certificates.value.certHash, 9, false);
AddKeyInfo( &university_num, 4, &university_num, 9, false);
AddKeyInfo( &universities.value.description, 6, &universities, 9, false);
AddKeyInfo( &universities.value.description, 6, &universities.index, 4, true);
AddKeyInfo( &universities.value.description, 6, &universities.value.description, 9, false);
}
constructor $EducationCertificate()
{
keysua4f14w();
InitializeVariables();
                     
    certificate_num = 0;
    university_num = 0;
    schema_num = 0;
                      
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

                     
MUTABLE
string issueCertificate(string certHash, string universitySignature, string studentSignature, string dateOfIssuing, string certUUID, string universityPK, string studentPK,string universityName,string major,string cgpa,string departmentName) {
keysua4f14w();
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
keysua4f14w();
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
keysua4f14w();
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
keysua4f14w();
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
keysua4f14w();
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
keysua4f14w();
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
keysua4f14w();
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
keysua4f14w();
    string result="";
    string u= FromU64(university_num);
    string c= FromU64(certificate_num);
    string s= FromU64(schema_num);
    result = Concat(Concat(Concat(Concat(Concat(Concat(result,"大学总数："),u)," 证书总数："),c)," 模板总数"),s);
    return result;	    
}