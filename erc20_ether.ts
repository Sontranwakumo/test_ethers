import { ethers } from 'ethers'
import * as dotenv from 'dotenv';
dotenv.config();


async function main() {
    const pk = process.env.PRIVATE_KEY||'';
    const provider = new ethers.JsonRpcProvider('https://bsc-testnet.blockpi.network/v1/rpc/public');
    const wallet = new ethers.Wallet(pk,provider);
    const  contractABI = [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint8","name":"decimal","type":"uint8"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
    const contractAddress = "0xD6c2905d624d78dCaefD39A596dE086956b57d90";
    const contract = new ethers.Contract(contractAddress,contractABI,wallet);
    let name:string = await contract.name();
    let symbol:string = await contract.symbol();
    let decimals:number = await contract.decimals();
    let totalSupply:number = await contract.totalSupply();
    
    console.log(`Name: ${name}`);
    console.log(`Symbol: ${symbol}`);
    console.log(`Decimals: ${decimals}`);
    console.log(`Total Supply: ${totalSupply}`);

    //MINT
    async function mint(to: string, amount: string) {
        const cv_amount = ethers.parseUnits(amount,18);
        const to_address = ethers.getAddress(to);
        // const cv_amount = ethers.parseUnits(amount,1);
        console.log("Minting...")
        const tx = await contract.mint(to_address,cv_amount);
        // console.log(typeof tx);
        const receipt = await tx.wait();
        console.log('Transaction hash:', tx.hash);

    }
    // Mint 1000 tokens.
    // await mint(wallet.address,'1000');
    let currentBalance = await contract.balanceOf(wallet.address);
    totalSupply = await contract.totalSupply();
    console.log(`Current balance: ${currentBalance}`);
    console.log(`Total supply: ${totalSupply}`);


    //TRANSFER
    async function transfer(to:string, amount:string) {
        const cv_amount = ethers.parseUnits(amount,18);
        const tx = await contract.transfer(to,cv_amount);
        console.log(`Transfering to ${to}`);
        const receipt = await tx.wait();
        console.log(`Transfer successfully`);
        console.log(`Your current balances: ${await contract.balanceOf(wallet.address)}`);
        console.log(`Balances of person you sent: ${await contract.balanceOf(to)}`);
    }
    const target_add:string = "0x6E75684671B73307E1b08cBce0EB38D39C5B2BE8";
    // Transfer 1.6 token.
    // await transfer(target_add,`1.6`);
    

    // await Simulation();
    async function Simulation() {
        const walletB = new ethers.Wallet(process.env.PRIVATE_KEY_B||'',provider);
        // a approve b to spend 100 token
        // Address A: 0x5641197e7BFa123834D8a99A411B9905AaFD7AbC
        // Address B: 0x6E75684671B73307E1b08cBce0EB38D39C5B2BE8
        // Address C: 0xeb442f31BFC58E26c4741002E58D005dB9488d78
        // consider a as wallet.address
        // consider b as walletB.address
        let AddressC = "0xeb442f31BFC58E26c4741002E58D005dB9488d78";
        console.log(`Before transfer`)
        console.log(`A's balances: ${await contract.balanceOf(wallet.address)}`);
        console.log(`B's balances: ${await contract.balanceOf(walletB.address)}`);
        console.log(`B's balances: ${await contract.balanceOf(AddressC)}`);
        let response = await contract.approve(walletB.address,ethers.parseUnits('100',18));
        await response.wait();
        const contractB = new ethers.Contract(contractAddress,contractABI,walletB);
        // b transfer 50 from A to C
        response = await contractB.transferFrom(wallet.address,AddressC,ethers.parseUnits('50',18));
        await response.wait();

        console.log(`Transfer successfully`);
        console.log(`A's balances: ${await contract.balanceOf(wallet.address)}`);
        console.log(`B's balances: ${await contract.balanceOf(walletB.address)}`);
        console.log(`C's balances: ${await contract.balanceOf(AddressC)}`);
    }
    // await removeAllowance();
    async function removeAllowance() {
        try{

            const walletB = new ethers.Wallet(process.env.PRIVATE_KEY_B||'',provider);
            let response = await contract.approve(walletB.address,ethers.parseUnits('0',18));
            await response.wait();
            const contractB = new ethers.Contract(contractAddress,contractABI,walletB);
            let AddressC = "0xeb442f31BFC58E26c4741002E58D005dB9488d78";
            response = await contractB.transferFrom(wallet.address,AddressC,ethers.parseUnits('50',18));
            await response.wait();
            console.log(`Transfer successfully`);
            console.log(`A's balances: ${await contract.balanceOf(wallet.address)}`);
            console.log(`B's balances: ${await contract.balanceOf(walletB.address)}`);
            console.log(`C's balances: ${await contract.balanceOf(AddressC)}`);
        }
        catch (error){
            console.log(error);
            console.log("Nah, this is wild");
        }
    }
}



main().catch(error => {
    console.error(error);
    process.exit(1);
});

//format unit,
// parseUnit()