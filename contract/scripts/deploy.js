const hre = require("hardhat");

async function main() {
  const af = await hre.ethers.deployContract("Chatter");
  await af.waitForDeployment();
  console.log(`AccountFactory Deployment to ${af.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
