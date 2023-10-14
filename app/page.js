"use client";
const { ethers } = require("ethers");

import { useEffect, useState } from "react";
import abi from "@/actions/ABI.json";

export default function Home() {
  const [contract, setContract] = useState("");
  useEffect(() => {
    async function connectToMetaMask() {
      try {
        if (typeof window.ethereum !== "undefined") {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
          console.log("Connected to MetaMask:");
          return provider;
        } else {
          console.error("MetaMask is not available");
          return null;
        }
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        return null;
      }
    }

    connectToMetaMask().then((provider) => {
      if (provider) {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          "0x6c4Dcba306cD38B83F9362E907282B58AdD3a403",
          abi,
          provider
        );
        const contractWithSigner = contract.connect(signer);

        setContract(contractWithSigner);
      } else {
        // Handle the case where MetaMask is not connected or an error occurred
      }
    });
  }, []);

  async function mintNft() {
    if (typeof window.ethereum !== "undefined") {
      let tx;
      try {
        tx = contract.safeMint();
      } catch (err) {
        console.error("Mint Operation failed", err);
      }

      return tx;
    }
  }
  return (
    <div className={`flex w-full h-[100vh] items-center justify-center`}>
      <button
        onClick={() => mintNft()}
        className={`w-[130px] h-[40px] outline-none text-white bg-black rounded-[8px] hover:opacity-75 active:opacity-50`}
      >
        Contract
      </button>
    </div>
  );
}
