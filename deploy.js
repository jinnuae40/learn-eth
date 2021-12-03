const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const path = require('path')
const dotenv = require('dotenv')
dotenv.config({ path: path.join(__dirname, '.env') })
const { interface, bytecode } = require('./compile-lottery');
 
provider = new HDWalletProvider(
  process.env.MNEMONIC,
  process.env.INFURA_ENDPOINT
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] });
  
  console.log(interface)

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();