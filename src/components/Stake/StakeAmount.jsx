import React, { useContext, useRef, useState } from "react";
import { ethers } from "ethers";
import Web3Context from "../../context/Web3Context";
import { toast } from "react-hot-toast";

const StakeAmount = () => {
  const { stakingContract, selectedAccount, ethxContract } = useContext(Web3Context);
  const stakeAmountRef = useRef();
  const [ethAmount, setEthAmount] = useState(0);


  const stakeToken = async (e) => {
    e.preventDefault();
    const amount = stakeAmountRef.current.value.trim();

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid positive number.");
      return;
    }

    const amountToStake = ethers.parseUnits(amount, 18).toString();

    try {
      const transaction = await stakingContract.deposit(selectedAccount, selectedAccount, { value: amountToStake });
      await toast.promise(transaction.wait(), {
        loading: "🔃",
        success: '✅',
        error: '❌'
      });

      stakeAmountRef.current.value = "";
      await updateBalance();
    } catch (error) {
      if (stakingContract == null) {
        toast.error("Connect To Wallet First");
      } else {
        toast.error("❌❌❌");
      }
    }
  };

  return (
    <form onSubmit={stakeToken} className="flex flex-col justify-center items-start pt-9 px-9 pb-4">
      <div className="flex w-[100%] text-white justify-between">
        <label className="opacity-80 text-s font-normal mb-4">Enter ETH amount</label>
      </div>
      <input
        className="p-6 w-[100%] rounded-xl bg-[#008F8D] outline-none text-white"
        type="text"
        ref={stakeAmountRef}
        placeholder="0.0"
      />
      <div className="w-[100%] bg-white border-b mt-5 mb-15 rounded-xl"></div>
      <div className="mt-15"></div>
      <div className="w-[100%] flex justify-center items-center mt-5"> 
       <button onClick={stakeToken} type="submit" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
Stake
</span>
</button>
       </div>
    </form>
  );
};

export default StakeAmount;
