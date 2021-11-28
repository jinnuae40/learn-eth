// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')

const path = require('path')
const dotenv = require('dotenv')
dotenv.config({ path: path.join(__dirname, '.env') })

const provider = new HDWalletProvider(
  process.env.MNEMONIC,
  process.env.INFURA_ENDPOINT
)
const web3 = new Web3(provider)
const INITIAL_STRING = 'Hello World!'

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()
  console.log(accounts[0])

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [INITIAL_STRING],
    })
    .send({ from: accounts[0], gas: '1000000' })
  console.log(result.options.address)
  provider.engine.stop()
}
deploy()
