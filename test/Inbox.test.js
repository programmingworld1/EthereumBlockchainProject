const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

// We hebben een provider nodig waarmee Web3 de mogelijkheid wordt gegeven te communiceren met een specifiek netwerk.
const web3 = new Web3(ganache.provider());

// We krijgen de bytecode en abi van de gecompileerde smart contract.
// Bytecode: De software zelf.
// Abi: bytecode is machine code, we hebben iets nodig waarmee solidity/javascript kan communiceren met de bytecode, dat is waar de Abi voor bedoeld is.
// Zie de abi zoals intermediate language is C#. In basis is dat een manier om smart contract functionaliteiten aan te roepen die je zelf hebt gemaakt.
// Dus een interface tussen je smart contract en je frontend/backend.
const {abi, bytecode} = require('../compile');

let accounts;
let mycontract;

beforeEach(async () => {
    // Get a list of all accs
    accounts = await web3.eth.getAccounts();

    // Use one of the accs to deploy contract
    mycontract = await new web3.eth.Contract(abi)
        .deploy({data: bytecode, arguments: ['Hi There']}) // wat web3 nodig heeft om contract te deployen.
        .send({from: accounts[0], gas: '1000000'}); // we sturen het met de eerste account, en hoeveel gas we ermee willen sturen.
}); 

describe('Inbox', () => {
    it('deploys a smart contract', () =>{
        console.log(mycontract);
    })

    it('has default message', async () =>{
        const message = await mycontract.methods.message().call();
        assert.equal(message, 'Hi There');
    })

    it('can change the message', async () =>{
        await mycontract.methods.setMessage('bye').send({from: accounts[0]});
        const message = await mycontract.methods.message().call();
        assert.equal(message, 'bye');
    })
})