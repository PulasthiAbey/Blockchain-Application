# Blockchain-Application
You find  the fully completed blockchain application for the required functions in this repository. 


Please use linux base os or linux subsystem to run this network 


1) install Hyperledger fabric 
2) exatract the chaincode.zip file
3) copy apiserver file inde into the  "fabric-samples/fabcar/" folder
4) replace fabcar.js "file with fabric-samples/chaincode/fabcar/javascript/lib/"  
5) open the terminal and set route inside to the "fabric-samples/fabcar"
6) run neworkDown.sh (./neworkDown.sh)
7) run startFabric.sh with javascript (./startfabric.sh javascript)
8) change directry inside to the qpiserver folder 
9) install nodemodals (npm install)
10)delete all  inside the  "fabric-samples/fabcar/blockchain_app/wallet" if there any file
11)run enrollAdmin.js with node (node enrollAdmin.js)
12)run registerUser.js with node (node registerUser.js)
13)run apiserver.js with node (node apiserver.js)
14)run app.py inside the "/fabric-samples/fabcar/blockchain_app/views"
15)take the server link from python terminal and paste in the browser.
