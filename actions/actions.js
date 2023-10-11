import Web3 from "web3";
import abi from "@/actions/ABI.json";

export const getContract = () => {
  if (typeof window.ethereum !== "undefined") {
    let web3 = new Web3(account);
    const contract = new web3.eth.Contract(
      abi,
      "0xAF7FF053dF6a38F004DCfB964fAE4Bef6f479E6a"
    );
    return contract;
  }
};
export async function mintNft(owner) {
  if (typeof window.ethereum !== "undefined") {
    let res;
    try {
      const contract = getContract();
      res = await contract.methods.safeMint(owner).send({ from: owner });
    } catch (err) {
      console.error("Operation failed", err);
      alert("Error: NFT minting failed");
    }
    return res;
  }
}
