import { ethers } from "hardhat";

async function main() {
  if (process.argv.length < 4) throw Error("Missing arguments");
  const ballotAddr = process.argv[2];
  const proposalIdx = process.argv[3];

  const Ballot = await ethers.getContractFactory("Ballot");
  const ballot = Ballot.attach(ballotAddr);
  const proposal = await ballot.proposals(proposalIdx);
  console.log(proposal);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
