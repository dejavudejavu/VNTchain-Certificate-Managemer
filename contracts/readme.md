|    目录         |存放内容                         
|----------------|-------------------------------     
|deploy        |部署上链     
|lib        |编译过程中以来的动态库、静态库          
|src        |存放源文件
|src/output         |编译结果
|test       |测试部署后的合约    
---

指令

启动：MongoDB
```cmd
cd ~/mongodb/bin

./mongod --config ../etc/mongod.conf
```


启动docker：
```cmd
sudo service docker start
```


启动节点：
```cmd
```
```cmd
cd ~/testnet/

gvnt --networkid 1012 --datadir node0 --port 12340 console

gvnt --networkid 1012 --datadir node1 --port 12341 --vntbootnode "/ip4/127.0.0.1/tcp/12340/ipfs/1kHCPXRZxPMFZsrdz1A2XueB2nG144yFLvgxTnTJDqduHmK" console
```




对节点1：
```cmd
personal.unlockAccount(core.coinbase, "", 3153600000) 
bp.start()
admin.startRPC("localhost", 8545)
```

其他节点：
```cmd
personal.unlockAccount(core.coinbase, "", 3153600000) 
bp.start()
```

编译：
```cmd
docker run --rm -v /root/go/src/github.com/hyperledger/vnt-blockchain-academic-certificates/contracts:/tmp vntchain/bottle:0.6.0 compile -code /tmp/src/main.c
```

部署：
```cmd
node deploy/deploy.js
```


web目录：
`cd /root/go/src/github.com/hyperledger/vnt-blockchain-academic-certificates/web`

server目录：
`cd /root/go/src/github.com/hyperledger/vnt-blockchain-academic-certificates/server`



