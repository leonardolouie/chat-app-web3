// SPDX-License-Identifier: MIT

import "hardhat/console.sol";

pragma solidity ^0.8.27;

contract Chatter {

    address owner; 

    constructor() { 
        owner = msg.sender;
    }

    event Message(address indexed sender, string message);

    function sendMessage(string calldata message) public {
        console.log("Send message data here!!!", msg.sender, message);
        emit Message(msg.sender, message);
    }

    function retrieveMessage() public view returns(address){ 
        return owner;
    }

    fallback() external {}
   
}