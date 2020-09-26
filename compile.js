
const path = require('path');
const fs = require('fs');
const solc = require('solc');

//import fs from "fs";
//import path from 'path';
//import solc from 'solc';


const inboxPath = path.resolve(__dirname, 'contracts', 'inbox.sol');
const source = fs.readFileSync(inboxPath, 'UTF-8');

var input = {
    language: 'Solidity',
    sources: {
        'inbox.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
              }
        }
    }
};


module.exports.abi = JSON.parse(solc.compile(JSON.stringify(input))).contracts['inbox.sol']['Inbox'].abi;
module.exports.bytecode = JSON.parse(solc.compile(JSON.stringify(input))).contracts['inbox.sol']['Inbox'].evm.bytecode.object;

//console.log(JSON.parse(solc.compile(JSON.stringify(input))));

//console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts['inbox.sol']);

//console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts['inbox.sol']['Inbox'].abi);

//console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts['inbox.sol']['Inbox'].evm.bytecode.object);

