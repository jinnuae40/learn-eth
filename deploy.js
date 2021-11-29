const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const path = require('path')
const dotenv = require('dotenv')
dotenv.config({ path: path.join(__dirname, '.env') })
 
const { abi, evm } = require('./compile');
 
provider = new HDWalletProvider(
  process.env.MNEMONIC,
  process.env.INFURA_ENDPOINT
);
const web3 = new Web3(provider);
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
 
  console.log('Attempting to deploy from account', accounts[0]);
 
  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ['Hi there!'] })
    .send({ gas: '1000000', from: accounts[0] });
 
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
 
deploy();