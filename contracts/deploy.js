const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const mnemonicPhrase = "mountains supernatural bird..."; // 12 word mnemonic
const {abi, bytecode} = require('./compile');

let provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase
  },
  providerOrUrl: "https://rinkeby.infura.io/v3/814f3e172939462db228c0c6caafe925"
});
 
// HDWalletProvider is compatible with Web3. Use it at Web3 constructor, just like any other Web3 Provider
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts(); // nmonic heeft altijd meerdere accs, vandaar dat je ze zo pakt.
    console.log("Attempting to deploy from", accounts[0]);

    const result = await new web3.eth.Contract(abi)
        .deploy({data: bytecode, arguments: ['Hi There']}) // wat web3 nodig heeft om contract te deployen.
        .send({from: accounts[0], gas: '1000000'}); // gas limiet

    console.log("Contract deployed to address", result.options.address); // where the contract is deployed to
}

deploy();