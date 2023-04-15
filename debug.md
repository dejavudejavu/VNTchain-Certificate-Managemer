@[TOC](基于vnt-chain实现的学历认证系统)

#  VNTchain安装和测试
[gvnt安装说明](https://github.com/vntchain/go-vnt/tree/v0.6.4-alpha.6 )
[官方示例代码](https://github.com/vntchain/vnt-documentation/files/6097379/-.A23.zip )
[一个成功案例](http://www.laoluoli.cn/2021/12/14/vntchain%e5%85%a5%e9%97%a8%e6%8c%87%e5%8d%972-%e6%9c%ac%e5%9c%b0%e7%bd%91%e7%bb%9c%e6%90%ad%e5%bb%ba/ )
## 环境
Window11的Ubuntu子系统
## 问题及解决办法
### vnt相关的库的安装问题
---

#### 问题描述
```javascript
// \A23\deploys\deploy-czqq.js
var fs = require('fs');
var Vnt = require("vnt")
var vntkit = require("vnt-kit")
var Tx = require("ethereumjs-tx")
```
需要安装vnt和vnt-kit
`提示：直接安装vnt.j和vnt-kit.js会很慢，建议下载这两个仓库的压缩包之后解压，再用npm安装：`
运行`deploy-czqq.js`时报错如下：
```
internal/modules/cjs/loader.js:1188
  return process.dlopen(module, path.toNamespacedPath(filename));
                 ^

Error: /root/A23/vnt-kit.js-master/node_modules/scrypt/build/Release/scrypt.node: invalid ELF header
    at Object.Module._extensions..node (internal/modules/cjs/loader.js:1188:18)
    at Module.load (internal/modules/cjs/loader.js:986:32)
    at Function.Module._load (internal/modules/cjs/loader.js:879:14)
    at Module.require (internal/modules/cjs/loader.js:1026:19)
    at require (internal/modules/cjs/helpers.js:72:18)
    at Object.<anonymous> (/root/A23/vnt-kit.js-master/node_modules/scrypt/index.js:3:20)
    at Module._compile (internal/modules/cjs/loader.js:1138:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1158:10)
    at Module.load (internal/modules/cjs/loader.js:986:32)
    at Function.Module._load (internal/modules/cjs/loader.js:879:14)
```


#### 原因分析

根据[github上的一个issue](https://github.com/barrysteyn/node-scrypt/issues/196 ):


>If you are using scrypt.hash, it is now available natively in the Node.js crypto module.
If you are using scrypt.kdf / scrypt.verifyKdf, scrypt-kdf is a close-to-direct replacement.

scrypt已经不再维护，可以用node自带的crypto加密模块替代。



#### 解决方案
将加密所用的库`scrypt`替换成`crypto`，具体在`\vnt-kit.js\node_modules\scrypt.js\node.js`文件,替换为以下内容，`crypto`为原生node自带因此不用安装:
```javascript
// var scrypt = require('scrypt')
const crypto = require('crypto')

function hash(key, salt, n, r, p, dklen, progressCb) {
  // return scrypt.hashSync(key, { N: n, r: r, p: p }, dklen, salt)
  try{
    return crypto.scryptSync(key,salt,dklen,{ N: n, r: r, p: p ,maxmem:300000000})
  }
  catch(e){
    console.log('e: ', e);    
  }  
}

module.exports = hash
```


### 部署合约时余额不足问题
---

#### 问题描述
运行`deploy-czqq.js`时报错如下：
```
Error: insufficient funds for gas * price + value
    at Object.InvalidResponse (/root/A23/vnt.js-master/lib/vnt/errors.js:38:16)
    at /root/A23/vnt.js-master/lib/vnt/requestmanager.js:86:36
    at XMLHttpRequest.request.onreadystatechange (/root/A23/vnt.js-master/lib/vnt/httpprovider.js:127:7)
    at XMLHttpRequest.dispatchEvent (/root/A23/node_modules/xhr2/lib/xhr2.js:76:20)
    at XMLHttpRequest._setReadyState (/root/A23/node_modules/xhr2/lib/xhr2.js:422:14)
    at XMLHttpRequest._onHttpResponseEnd (/root/A23/node_modules/xhr2/lib/xhr2.js:616:14)
    at IncomingMessage.<anonymous> (/root/A23/node_modules/xhr2/lib/xhr2.js:568:23)
    at IncomingMessage.emit (events.js:327:22)
    at endReadableNT (_stream_readable.js:1221:12)
    at processTicksAndRejections (internal/process/task_queues.js:84:21)
```


#### 原因分析&解决方案

余额不足，这是由于初始化的时候没有给node分配余额。
按照[官方文档](https://github.com/vntchain/vnt-documentation/blob/master/introduction/set-up-vnt-network/set-up-4-node-vnt-network.md)中关于搭建本地hubble网络的说明：
>在此基础上修改以上数据，就能替换成我们私有网络的配置，周期和见证人数量不变，只修改初始见证人p2p地址和账号即可，然后把修改后的文件保存到testnet目录

实际上除了将`witnessesUrl`、`witnesses`这两个属性替换以外，还需要替换`alloc`中对应的节点地址，可见为每个节点分配的余额是`0x200000000000000000000000000000000000000000000000000000000000000`  





### 无法收到部署合约交易的收据问题
---

#### 问题描述
运行`deploy-czqq.js`时,已经生成`transaction hash`,但程序一直卡在`getTransactionReceipt`,无法获得交易的收据，进而无法得到合约地址



#### 原因分析&解决方案

仅仅解锁了4个节点的账户，没有开启区块打包，进而无法将合约上链。
按照[官方文档](https://github.com/vntchain/vnt-documentation/blob/master/introduction/set-up-vnt-network/set-up-4-node-vnt-network.md)中关于打包区块的说明：
>在每个初始见证人节点上解锁账户、开启共识，可以看到区块不断产生

对每个节点执行：
```cmd
personal.unlockAccount(core.coinbase, "账户密码", 3153600000) // 3153600000指解锁的秒数，这段时间之后，账户会自动锁住
bp.start()
```


## 示例代码运行成功
`deploy-czqq.js`:
```cmd
transaction hash:  0x50737e24768f61a46f3b0ced25c9ea4d488aa9d75f08a540c735bea26045c66e
tx receipt:  {
  blockHash: '0xced0f79698829153dd98308e12f55a58094391f05c17a4af50b8605db769d176',
  blockNumber: 20,
  contractAddress: '0x2827619f23f57c03179a038bbd05166f02049a6a',
  cumulativeGasUsed: 710721,
  from: '0x7dff077a604de5c60776216af0214617d7be6748',
  gasUsed: 710721,
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: '0x1',
  to: null,
  transactionHash: '0x50737e24768f61a46f3b0ced25c9ea4d488aa9d75f08a540c735bea26045c66e',
  transactionIndex: 0
}
tx status:  0x1
contract address:  0x2827619f23f57c03179a038bbd05166f02049a6a
```
`test-czqq.js`:
```cmd
result: zgc|1.wav|1234567890|A05AE118ACA9D80252C209B2A0A4CD0058825CBDE867A756C8733CB21E8D3566|QmcHxt9scMKmD4xyCAmA7frg7LcAyZgF4kFnUm6DBmNZvN|all|999999999999999-
result: 0x7Dff077a604De5c60776216AF0214617d7BE6748|
transaction hash:  0xacf31f82b1048ff9bf85af32d8e33978db8419b0c819378bb27c74746a990707
```


#  系统实现
## 合约的编写、部署和测试

**合约中变量的类型只能是`vntlib.h`中定义的**,[参见](https://github.com/vntchain/vnt-documentation/blob/master/smart-contract/write-contract.md),用`KEY`标识变量可使其持久存在于链上，在本合约中有：
|    持久变量        |说明                         
|----------------|-------------------------------    
|schemas        |证书模板结构体构成的列表
|universities        |大学结构体构成的列表     
|certificates        |证书结构体构成的列表
|certificate_num         |当前证书数数量
|university_num       |当前大学数量
|schema_num       |当前证书模板数量  

定义以下函数用于查询和更新数据，用`MUTABLE`标识表示该函数不改变链的状态，`UNMUTABLE`表示会改变状态：


|    合约函数        |功能                         |是否改变链的状态
|----------------|-------------------------------  |----------------   
|issueCertificate        |签发证书    |是
|registerUniversity        |注册大学|是       
|queryUniversityProfileByName        |通过名称查询大学信息|否
|queryCertificateSchema         |查询证书模板（指明了需要hash加密的属性）|否
|queryCertificateByUUID       |通过UUID查询证书|   否
|getAllCertificateByStudent       |查询学生的所有证书|否    
|getAllCertificateByUniversity       |查询大学的所有证书|否    

`vnt.js`与合约交互时需要注意：
1. 当不涉及链状态改变，仅查询时，用下面方式交互：
```js
function queryAll(universityPK){
    var contract = vnt.core.contract(abi).at(contractAddress);
    //queryAll是c语言合约中的一个函数名
    var r = contract.queryAll.call(universityPK,{from: account.address});
    console.log('result:', r.toString());
    return r.toString();    
}
```

2. 当涉及多个参数需要传递，要提前打包：
```js
var contract = vnt.core.contract(abi);
//registerUniversity是函数名，后面的列表是函数需要的参数
var data = contract.packFunctionData("registerUniversity", [name, publicKey, location, description]);

```
3. 当涉及链状态改变，用下面方式交互。原本在合约中为此类有状态改变的函数也设置了返回值，但是没有找到获取返回值的方法，只能通过在函数调用完毕以后，执行回调函数，在回调函数中执行一次查询，获得数据更新结果：
```js
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

// 注册新的大学
function registerUniversity(name, publicKey, location, description,callback=(r)=>{
    console.log('r: ', r);
}){
    var contract = vnt.core.contract(abi);
    var data = contract.packFunctionData("registerUniversity", [name, publicKey, location, description]);
    sendRawTransaction(account, contractAddress, data, vnt.toHex(0),()=>{
        //交易完成以后执行查询函数，获得执行结果
        var r = queryUniversityProfileByName(name);
        //该回调函数处理查询结果
        callback(r.toString());
    }) 
}
```

  

### 变量类型嵌套编译问题
---
#### 问题描述
用` vntchain/bottle`编译C语言合约时,出现以下报错：
```cmd
panic: runtime error: index out of range

goroutine 1 [running]:
github.com/vntchain/bottle/core.createStructList(0x6, 0x7f06c00bf540, 0x1, 0x7f06c000b260, 0x2, 0x7f06c00bf0f0, 0x1, 0x7f06c000b260)
        /root/go/src/github.com/vntchain/bottle/core/clang.go:184 +0x2c65
github.com/vntchain/bottle/core.cmd.func1(0x6, 0x7f06c00bf540, 0x1, 0x7f06c000b260, 0x2, 0x7f06c00bf0f0, 0x1, 0x7f06c000b260, 0xc400000001)
        /root/go/src/github.com/vntchain/bottle/core/clang.go:70 +0xcd
github.com/vntchain/bottle/vendor/github.com/go-clang/bootstrap/clang.GoClangCursorVisitor(0x6, 0x7f06c00bf540, 0x1, 0x7f06c000b260, 0x2, 0x7f06c00bf0f0, 0x1, 0x7f06c000b260, 0xc420274768, 0x50)
//···省略
```


#### 原因分析&解决方案
结合报错信息`core.createStructList`,说明是结构体位置出错,经过排查,原代码：
```c
typedef struct{
    string certificateType; // 证书类型
    string id;     // 版本
    array(string) ordering;      // 属性及顺序，参与merkle tree验证
    string dataType;   // 数据类型（schema）  
} schema;
KEY array(schema) schemas;//存储不同版本的待hash属性模板

```

改为：
```c
KEY array(struct{
            string certificateType; // 证书类型
            string id;     // 版本
            array(string) ordering;      // 属性及顺序，参与merkle tree验证
            string dataType;   // 数据类型（schema）
        }) schemas;//存储不同版本的待hash属性模板
```
这样能够通过编译。结论：虽然上面两种形式功能一致，虽然官方文档也说明可以复杂嵌套，但是或许这样的嵌套不适用于`typedef`中。



### 编码问题
---
#### 问题描述

报错如下：
```cmd
panic: Unsupport keyword MUTABLE

goroutine 1 [running]:
github.com/vntchain/bottle/core.isConstant(0xc42017a2fe, 0x8, 0xc420c3f040)
        /root/go/src/github.com/vntchain/bottle/core/compile.go:532 +0x147
github.com/vntchain/bottle/core.(*abiGen).parseMethod(0xc4207eb9d0)
        /root/go/src/github.com/vntchain/bottle/core/compile.go:279 +0x193
github.com/vntchain/bottle/core.compile(0xc420292f20, 0x0, 0xc420292f20)
        /root/go/src/github.com/vntchain/bottle/core/cmd.go:219 +0x33e
//省略...
```

#### 原因分析&解决方案
代码中能够正常导入库文件，但是无法识别`MUTABLE`，将整个文件内容替换成已经正常编译的代码之后仍然无法识别，说明是编码的问题。原始代码用vs code编写，重新创建文件，将内容用Visual Studio打开，写入同样内容后，可以正常编译，说明两个编辑器编码格式存在差异，造成无法编译。



## WEB开发
[参考](https://github.com/TasinIshmam/blockchain-academic-certificates/tree/master/web-app)
该项目为express框架开发，使用hyperledger-fabric(超级账本)。拟用vue.js基于vnt-chain改写，一方面基于vnt-chain做调整，另一方面进一步熟悉系统原理。

### 系统概述

![Alt](./imgs/overview.png#pic_center)


### 差异

hyperledger-fabric：(通过文件路径)获得网络的证书授权服务器(CA)，在本地客户端(WEB应用)创建一个管理员用户，作用是**注册用户**，管理员用户向CA发出请求后，获得由CA颁发的证书和公私钥对，存入本地钱包。然后再创建应用程序用户：需要管理员用户的签名并向CA发出请求，成功以后获得证书和公私钥对，存入钱包，后面就可以用这些应用程序用户调用合约。<br>
vnt-chain：认证过程没有上面复杂(或者说还没有找到完善的认证方式)。本应用中仅通过节点的地址和密码解锁节点，在连接区块链网络以后即可调用合约。
### merkle tree验证过程
本系统中验证证书是否被篡改的过程用到了merkle tree。主要目的是为了快速比对两个大规模数据是否一致：
![merkle tree的形成](./imgs/merkle1.jpg#pic_center)

全体数据被分成若干块，经过层层hash得到最顶层的根hash。在本系统中将`['大学', 'GPA', '学院', '专业']`这四个属性值作为叶子节点（可以在合约中的schema中设置这些可选属性）,用户可以选择其中的一个或多个属性进行验证。假设要验证K节点，只需计算下图中的红色节点的hash值，减少了计算量：
![merkle tree的节点验证](./imgs/merkle2.jpg#pic_center)
在代码中，用区块链上的证书数据生成merkle tree1，再通过下面的方式获得叶子节点的证明，即上述红色节点(除K以外)的hash值，以数组的形式返回。
```js
let multiProof = mTree.getHexMultiProof(paramsToShareIndex);
```
另外还需要该merkle tree对应的原始数据以及该证书的UUID作为下一步验证所需的参数。为了生成一个便于管理的加密字符串，将三者用AES再次加密：
```js
let result = {
    proof: mTreeProof,
    disclosedData: disclosedData,
    certUUID: req.query.certUUID
};
// Encrypt
let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(result), config.vnt.secretPassword).toString()
```
需要验证时，解密，获得merkle tree证明、原始数据和UUID。用UUID在数据库中查询该证书的数据，生成merkle tree2，用原始数据的hash和merkle tree证明(必要节点的hash)计算merkle tree1根节点hash，再和merkle tree1根节点的hash比较即可验证是否被篡改。



### 置换交易定价过低问题
---

#### 问题描述
多次交易后出现：
```cmd
Error: replacement transaction underpriced
    at Object.InvalidResponse (/root/A23/vnt.js-master/lib/vnt/errors.js:38:16)
    at /root/A23/vnt.js-master/lib/vnt/requestmanager.js:86:36
    at request.onreadystatechange (/root/A23/vnt.js-master/lib/vnt/httpprovider.js:127:7)
    at XMLHttpRequest.dispatchEvent (/root/A23/node_modules/xhr2/lib/xhr2.js:76:20)
    at XMLHttpRequest._setReadyState (/root/A23/node_modules/xhr2/lib/xhr2.js:422:14)
    at XMLHttpRequest._onHttpResponseEnd (/root/A23/node_modules/xhr2/lib/xhr2.js:616:14)
    at IncomingMessage.<anonymous> (/root/A23/node_modules/xhr2/lib/xhr2.js:568:23)
    at IncomingMessage.emit (node:events:525:35)
    at endReadableNT (node:internal/streams/readable:1359:12)
    at process.processTicksAndRejections (node:internal/process/task_queues:82:21)

```

#### 原因分析&解决方案

[以太坊实战-再谈nonce使用陷阱](https://cloud.tencent.com/developer/article/1019756p)

本系统中发送交易的函数如下：
```js
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
```
可见每次发送交易的nonce是根据当前已经完成的交易数来取值的，但是由于某些异常，有些交易并没有完成，而是处于搁置状态，并未计入当前已完成交易总数，这时如果再以相同nonce发送一个新的交易，只有覆盖相同nonce的交易才能交易成功，但这需要更高的`gasPrice`,而在代码中`gasPrice`是不变的，因此会报错**置换交易定价过低**。<br>
这个问题主要出现在调试过程中，因此重新搭建一个本地链之后问题得到解决，没有进一步深究更科学的nouce管理方式。




## 效果展示
大学、学生注册：
![大学注册](./imgs/s1.png#pic_center)
![学生注册](./imgs/s2.png#pic_center)
颁发证书：
![颁发证书](./imgs/s3.png#pic_center)
查看证书：
![查看证书](./imgs/s4.png#pic_center)
分享证书：
![分享证书](./imgs/s5.png#pic_center)
生成证明：
![生成证明](./imgs/s6.png#pic_center)
验证：
![验证](./imgs/s7.png#pic_center)
验证通过：
![验证通过](./imgs/s8.png#pic_center)
通过数据库修改绩点：
![修改](./imgs/s9.png#pic_center)
再次验证，验证失败：
![验证失败](./imgs/s10.png#pic_center)

