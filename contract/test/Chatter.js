const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Chatter contract", function () {
  async function deployedChatter() {
    const [owner, otherAccount] = await ethers.getSigners();
    const Chatter = await ethers.getContractFactory("Chatter");
    const chatter = await Chatter.deploy();
    return { chatter, owner, otherAccount };
  }

  describe("Send message function", function () {
    it("Should send a message and emit the Message event", async function () {
      const { chatter, owner } = await loadFixture(deployedChatter);

      const testMessage = "test message";
      await expect(chatter.sendMessage(testMessage))
        .to.emit(chatter, "Message")
        .withArgs(owner.address, testMessage);
    });
  });
});
