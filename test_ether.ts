
import { ethers } from 'ethers';
import * as dotenv from 'dotenv';

dotenv.config();

async function message(wallet:ethers.Wallet,provider:ethers.JsonRpcProvider){
  const message = "Hello World";

  
  const signature = await wallet.signMessage(message);
  console.log("Signature: ", signature);
  const recoveredAddress = ethers.verifyMessage(message, signature);
  console.log("Recovered Address: ", recoveredAddress);
  if (recoveredAddress === wallet.address) {
      console.log("Verified");
  } else {
      console.log("Failed");
  }
}

async function send_TBNB(from:ethers.Wallet, to:string, value: string,provider:ethers.JsonRpcProvider) {
  const tx:ethers.TransactionRequest = {
    to:to,
    value:ethers.parseEther(value),
    gasLimit:21000,
    gasPrice: ethers.parseUnits('5','gwei')
  }
  const wallet = from.connect(provider);
  const constract_response = await wallet.sendTransaction(tx)
  console.log("sended, Transaction detail: ",constract_response);
  console.log(`URL: https://testnet.bscscan.com/tx/${constract_response.hash}`);

}

async function main() {
    // const wallet = ethers.Wallet.createRandom();

    // console.log("Address: ", wallet.address);
    // console.log("Public Key: ", wallet.publicKey);
    // console.log("Private Key: ", wallet.privateKey);
    // console.log("Mnemonic: ", wallet.mnemonic?.phrase);
    const pk = process.env.PRIVATE_KEY||'';
    const provider = new ethers.JsonRpcProvider('https://bsc-testnet.blockpi.network/v1/rpc/public');
    const wallet = new ethers.Wallet(pk,provider);
    const wallet_connected = wallet.connect(provider);
    await message(wallet,provider);
    let value = await provider.getBalance(wallet.address);
    console.log(value);

    let block_number = await provider.getBlockNumber();
    console.log(block_number);

    let block_detail = await provider.getBlock(block_number);
    console.log(block_detail);
    let Txn_detail = await provider.getTransaction("0x643fb78d6d4d07055f2ca796f33654acffc3e44ec3639aea0a29d7254453ab99");
    console.log(Txn_detail);
    let receiver:string = "0x6E75684671B73307E1b08cBce0EB38D39C5B2BE8";
    send_TBNB(wallet,receiver,'0.000001',provider);
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});
