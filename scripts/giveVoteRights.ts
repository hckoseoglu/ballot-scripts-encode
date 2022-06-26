import { ethers } from "hardhat";

async function main() {
  if (process.argv.length < 4) throw Error("Missing arguments");
  const ballotAddr = process.argv[2];
  const voterAddr = process.argv[3];

  const Ballot = await ethers.getContractFactory("Ballot");
  const ballot = Ballot.attach(ballotAddr);
  const txn = await ballot.giveRightToVote(voterAddr);
  console.log("Transaction hash: ", txn.hash);
  console.log("Voting right is given to: ", voterAddr);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
