import { ethers } from "hardhat";

async function main() {
  if (process.argv.length < 3) throw Error("Missing arguments");
  const ballotAddr = process.argv[2];

  const Ballot = await ethers.getContractFactory("Ballot");
  const ballot = Ballot.attach(ballotAddr);
  const winnerName = await ballot.winnerName();
  console.log("The winning proposal is:", winnerName);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
