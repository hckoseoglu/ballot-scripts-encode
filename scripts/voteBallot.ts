import { ethers } from "ethers";
// eslint-disable-next-line node/no-missing-import
import { Ballot } from "../typechain";
import "dotenv/config";
import * as ballotData from "../artifacts/contracts/Ballot.sol/Ballot.json";

async function main() {
  if (process.argv.length < 4) throw Error("Missing arguments");
  const ballotAddr = process.argv[2];
  const proposalIdx = process.argv[3];

  const mnemonic = process.env.MNEMONIC;
  const wallet = ethers.Wallet.fromMnemonic(
    mnemonic as string,
    `m/44'/60'/0'/0/1`
  );

  const provider = ethers.getDefaultProvider("ropsten");
  const signer = wallet.connect(provider);
  // eslint-disable-next-line no-unused-vars
  const ballotCtc: Ballot = new ethers.Contract(
    ballotAddr,
    ballotData.abi,
    signer
  ) as Ballot;

  const txn = await ballotCtc.vote(proposalIdx);
  console.log("Transaction hash: ", txn.hash);
  console.log(
    `Voter with address ${wallet.address} has voted to the proposal with index ${proposalIdx}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
