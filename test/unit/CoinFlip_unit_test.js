// We import Chai to use its asserting functions here.
const { expect } = require("chai");

// test the coinflip contract
describe("CoinFlip contract", function () {
  let owner;

  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    CoinFlip = await ethers.getContractFactory("CoinFlip");
    [owner] = await ethers.getSigners();
    // deploy the contract
    coinFlip = await CoinFlip.deploy();
    // We can interact with the contract by calling `coinFlip.method()`
    await coinFlip.deployed();
    // send the contract 5 ETH from the owner' account
    await owner.sendTransaction({
        to: coinFlip.address,
        value: ethers.utils.parseEther("5.0"), 
    });
  });

  // test the deplyment of the contract
  describe("Deployment", function () {
    // make sure the owner is set to the deployer of the contract
    it("Should set the correct owner", async function () {
        // This test expects the owner variable stored in the contract to be equal to our Signer's owner.
        expect(await coinFlip.owner()).to.equal(owner.address);
    });
  });

  // test the functions in the contract
  describe("Transactions", function () {
    // test the getBalance function returns the correct amount
    it("Should get the contract's balance", async function () {
        const balance = await coinFlip.getBalance();
        expect(balance).to.equal("5000000000000000000");
    });

    // test that the transaction should be reverted if the user wagers 0 ETH
    it("Should not let user bet 0 ETH", async function () {
      await expect(
          coinFlip.flip("1", {value: ethers.utils.parseEther("0")})
      ).to.be.revertedWith("You must wager more than 0 ETH");
    });
    // test that the user must only guess 0 or 1
    it("Should not let user make invalid guess", async function () {
        await expect(
            coinFlip.flip("3", {value: ethers.utils.parseEther("1")})
        ).to.be.revertedWith("You must guess 0 or 1");
    });
    // test that the user can't wager more than the contract's balance
    it("Should not let user bet more then contract balance", async function () {
        // Try betting 6 ETH when we only sent the contract 5 ETH
        await expect(
            coinFlip.flip("1", {value: ethers.utils.parseEther("6")})
        ).to.be.revertedWith("Game balance is too low, try betting less ETH");
    });
  });
});