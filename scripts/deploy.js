require("@nomiclabs/hardhat-etherscan");

// deploy the game contract
async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  const CoinFlip = await ethers.getContractFactory("CoinFlip");
  const coinFlip = await CoinFlip.deploy();
  await coinFlip.deployed();

  // print the address of the deployed contract
  console.log(
    "Contract Address:",
    coinFlip.address
  );

  console.log("Sleeping.....");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(10000);

  // Verify the contract after deploying
  await hre.run("verify:verify", {
    address: coinFlip.address,
    constructorArguments: [],
  });

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(coinFlip);
}

// pause for the passed in time
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// save the contract address and the ABI to the frontend folder
function saveFrontendFiles(coinFlip) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../frontend/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ CoinFlip: coinFlip.address }, undefined, 2),
  );

  const CoinFlipArtifact = artifacts.readArtifactSync("CoinFlip");

  fs.writeFileSync(
    contractsDir + "/CoinFlip.json",
    JSON.stringify(CoinFlipArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
