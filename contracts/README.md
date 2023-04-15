|    目录         |存放内容                         
|----------------|-------------------------------     
|deploy        |部署上链     
|lib        |编译过程中以来的动态库、静态库          
|src        |存放源文件
|src/output         |编译结果
|test       |测试部署后的合约    
---

编译指令
```cmd
docker run --rm -v /root/go/src/github.com/hyperledger/vnt-blockchain-academic-certificates/contracts:/tmp vntchain/bottle:0.6.0 compile -code /tmp/src/main.c
```
