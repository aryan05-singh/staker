import { useContext, useRef } from "react";
import { ethers } from "ethers";
import Web3Context from "../../context/Web3Context";
import { toast } from "react-hot-toast";

const WithdrawAmount = () => {
  const { withdrawContract, selectedAccount } = useContext(Web3Context);
  const unstakeAmountRef = useRef();

  const unstakeToken = async (e) => {
    e.preventDefault();

    const amount = unstakeAmountRef.current.value.trim();

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid positive number.");
      return;
    }

    const amountToUnstake = ethers.parseUnits(amount, 18).toString();

    try {
      const transactionPromise = new Promise(async (resolve, reject) => {
        try {
          const transaction = await withdrawContract.requestWithdraw(
            amountToUnstake,
            selectedAccount
          );
          const receipt = await transaction.wait();
          resolve(receipt);
        } catch (error) {
          reject(error);
        }
      });

      await toast.promise(transactionPromise, {
        loading: "🔃",
        success: '✅',
        error: '❌'
      });

      unstakeAmountRef.current.value = "";
    } catch (error) {
      if (withdrawContract == null) {
        toast.error("Connect To Wallet First");
      } else {
        toast.error("Transaction Failed 🤯");
        console.error(error.code);
      }
    }
  };

  return (
    <form
      onSubmit={unstakeToken}
      className="flex flex-col justify-center items-start pt-9 px-9 pb-4"
    >
      <div className="flex w-[100%] text-white justify-between">
        <label className="opacity-80 text-s font-normal mb-4">
          Enter ETHx amount
        </label>
      </div>
      <input
        className="p-6 w-[100%] rounded-xl bg-[#008F8D] outline-none text-white mb-2"
        type="text"
        ref={unstakeAmountRef}
        placeholder="0.0"
      />

      <div className="uppercase text-xs text-gray-200 flex justify-center items-center w-[100%] px-8 mt-12 text-center">
        "After successfully unstaking tokens, a request ID will be generated."
      </div>
      <div className="w-[100%] bg-white border-b mt-5 rounded-xl"></div>

      <div className="w-[100%] flex justify-center items-center mt-5"> 
       <button onClick={unstakeToken} type="submit" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
Unstake
</span>
</button>
       </div>
    </form>
  );
};

export default WithdrawAmount;
