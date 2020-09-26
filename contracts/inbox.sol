// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

contract Inbox{
    
    string public message = "Hello World";
    
    
    constructor(string memory text) {
        
        message = text;
    }
    
    function getMessage() public view returns(string memory)
    {
        return message;
    }
    
    function setMessage(string memory text) public {
        message = text;
    }
    
}