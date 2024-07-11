
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

/*
Signature:  0x298c6e752f98d90f390b5323be62ab88bf6e37c220dda52127fe64e3333590c657b1255fd4dba3cf8616fc3150c198c501cd9feb4d39cb83fc8711815a7b94e41b
Recovered Address:  0x5641197e7BFa123834D8a99A411B9905AaFD7AbC
Verified
30799637000000000n
41990967
Block {
  provider: JsonRpcProvider {},
  number: 41990967,
  hash: '0xef63898f70e1bd15041a2241610720ee5fe39f65d08e2f264e7bb1874c65d6f4',
  timestamp: 1720692110,
  parentHash: '0x5993b7d3757cb508cc567851b8f3e64988412303e0a3e0825114dedee9518c58',
  parentBeaconBlockRoot: null,
  nonce: '0x0000000000000000',
  difficulty: 2n,
  gasLimit: 70273436n,
  gasUsed: 187097n,
  stateRoot: '0x0e6381f9cb96700211a6be5ba9a4c87c1657422c11379c536b4c264b3494f8ce',
  receiptsRoot: '0x9bed18db3b8cf392c33a8987701a95b97b8a423a8a62d4b289a10f5ffecade55',
  blobGasUsed: 0n,
  excessBlobGas: 0n,
  miner: '0xF9a1Db0d6f22Bd78ffAECCbc8F47c83Df9FBdbCf',
  prevRandao: '0x0000000000000000000000000000000000000000000000000000000000000000',
  extraData: '0xd98301040b846765746889676f312e32312e3131856c696e75780000631f83a6f8b381fbb8608628ff30bc5a0c83e78523b539cb048e3de93ab514d7272b41bd22c864f5fcf4405bafac0f12a1e3d6c0542d9a8561b016ebe89eb8e32592815c4768a93c9553a442829839c92f0d6a0c245a1ab15c751316ded205a0a88c10b8abe62401815ef84c840280bb35a01decc762d030dbd4fc6d16f25cca5e477dbfed74396a469bd07b1685dfd4837d840280bb36a05993b7d3757cb508cc567851b8f3e64988412303e0a3e0825114dedee9518c5880e0e65e4abd911db09508fca93c635f219f0f669a0279082788d98c6e7ee75db6666d15cb36c945743a809aa96747c5929c12404f027dedd939d242b6b3490ad300',
  baseFeePerGas: 0n
}
TransactionResponse {
  provider: JsonRpcProvider {},
  blockNumber: 41984592,
  blockHash: '0xa3a65b1b79bd29b5a83d6b2a196ccfd8a605e2fa9455e1e31a786f23274ca22a',
  index: 4,
  hash: '0x643fb78d6d4d07055f2ca796f33654acffc3e44ec3639aea0a29d7254453ab99',
  type: 0,
  to: '0x0000000000000000000000000000000000001000',
  from: '0x08265dA01E1A65d62b903c7B34c08cB389bF3D99',
  nonce: 448868,
  gasLimit: 9223372036854775807n,
  gasPrice: 0n,
  maxPriorityFeePerGas: null,
  maxFeePerGas: null,
  maxFeePerBlobGas: null,
  data: '0xf340fa0100000000000000000000000008265da01e1a65d62b903c7b34c08cb389bf3d99',
  value: 5643524000000000n,
  chainId: 97n,
  signature: Signature { r: "0x8f79df74be570b8de308bb4dd2545ed0965052de19f5d55345f614168ae3fb3c", s: "0x45fa963938ec27ff2d05d34725bef1ec09a14fc56eb0fc95536f9df3c99071a5", yParity: 0, networkV: 229 },
  accessList: null,
  blobVersionedHashes: null
}
sended, Transaction detail:  TransactionResponse {
  provider: JsonRpcProvider {},
  blockNumber: null,
  blockHash: null,
  index: undefined,
  hash: '0x680d6b7f08175e463c82f02eb3f9c2bf0b01d6eee146be33725eef7827807fce',
  type: 0,
  to: '0x6E75684671B73307E1b08cBce0EB38D39C5B2BE8',
  from: '0x5641197e7BFa123834D8a99A411B9905AaFD7AbC',
  nonce: 20,
  gasLimit: 21000n,
  gasPrice: 5000000000n,
  maxPriorityFeePerGas: null,
  maxFeePerGas: null,
  maxFeePerBlobGas: null,
  data: '0x',
  value: 1000000000000n,
  chainId: 97n,
  signature: Signature { r: "0xf0af989ebebcf07f082c6251921780249bc3b0bf383849579bee195912e58cdd", s: "0x4e3a630320f69cba657241591bd8e38b7ebb4cde26d86a2eb9439720e99397c3", yParity: 1, networkV: 230 },
  accessList: null,
  blobVersionedHashes: null
}
URL: https://testnet.bscscan.com/tx/0x680d6b7f08175e463c82f02eb3f9c2bf0b01d6eee146be33725eef7827807fce
*/