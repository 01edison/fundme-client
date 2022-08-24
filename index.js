import { ethers } from "./ethers.esm.min.js";
import { ABI, Address } from "./constants.js";

const connectBtn = document.getElementById("connectButton");
const fundBtn = document.getElementById("fundButton");
const balanceBtn = document.getElementById("balanceButton");
const withdrawBtn = document.getElementById("withdrawButton");

connectBtn.addEventListener("click", connect);
fundBtn.addEventListener("click", fund);
balanceBtn.addEventListener("click", balance);
withdrawBtn.addEventListener("click", withdraw);

async function connect() {
  if (typeof window.ethereum != undefined) {
    try {
      console.log("I see metamask!");
      await ethereum.request({
        method: "eth_requestAccounts",
      });
      connectBtn.innerHTML = "Connected";
    } catch (error) {
      console.log(error);
    }
  } else {
    alert("Please Install metamask");
  }
}

async function fund() {
  if (typeof window.ethereum != undefined) {
    try {
      const ethAmount = document.getElementById("ethAmount").value;
      // we need a provider / connection to the blockchain
      // we need a signer / account to make transactions
      // we need a contract to interact with via its ABI and Address

      const provider = new ethers.providers.Web3Provider(window.ethereum); // provider (metamask node)
      const signer = provider.getSigner(); // gets details of the wallet connected

      const contract = new ethers.Contract(Address, ABI, signer);

      const transactionResposnse = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      });

      const transactionReceipt = await transactionResposnse.wait();

      console.log(transactionReceipt);
      console.log(transactionReceipt.gasUsed.toString());

      //   await listenForTransactionMine(transactionResposnse, provider); //1

      console.log("Done");
    } catch (error) {
      console.log(error);
    }
  }
}

async function balance() {
  if (typeof window.ethereum !== undefined) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const balance = await provider.getBalance(Address);

      console.log(ethers.utils.formatEther(balance));
    } catch (error) {
      console.log(error);
    }
  }
}

async function withdraw() {
  if (typeof window.ethereum !== undefined) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum); // provider (metamask node)
      const signer = provider.getSigner(); // gets details of the wallet connected

      const contract = new ethers.Contract(Address, ABI, signer);

      const transactionResponse = await contract.withdraw();

      const transactionReceipt = await transactionResponse.wait();

      console.log(transactionReceipt)
    } catch (error) {
      console.log(error);
    }
  }
}
// function listenForTransactionMine(transactionResposnse, provider) {
//   console.log(`Mining ${transactionResposnse.hash}`); //2
//   return new Promise((resolve, reject) => {
//     provider.once(transactionResposnse, (transactionReceipt) => {
//       console.log(
//         `Completed with ${transactionReceipt.confirmations} confirmations`
//       );
//       resolve(); //3
//     });
//   });
// }
