// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ChatterModule", (m) => {
  const chatter = m.contract("Chatter");
  console.log(`Deploy contract ${chatter.contractName}${chatter.id}`);
  return { chatter };
});
