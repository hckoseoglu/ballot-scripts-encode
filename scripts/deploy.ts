import { ethers } from "hardhat";

const convertStrToBytes32 = (str: string) => {
  return ethers.utils.formatBytes32String(str);
};

async function main() {
  const proposalNames = [
    convertStrToBytes32("Proposal1"),
    convertStrToBytes32("Proposal2"),
    convertStrToBytes32("Proposal3"),
  ];

  const Ballot = await ethers.getContractFactory("Ballot");
  const ballot = await Ballot.deploy(proposalNames);

  const txn = await ballot.deployed();
  console.log("Transaction hash: ", txn.deployTransaction.hash);
  console.log("Ballot contract deployed to:", ballot.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
