import { useContext, useRef } from "react";
import { ethers } from "ethers";
import Web3Context from "../../context/Web3Context";
import { toast } from "react-hot-toast";
import { useRequestIds } from "../../utils/useRequestIds";

const ClaimAmount = () => {
  const { withdrawContract } = useContext(Web3Context);
  const claimAmountRef = useRef();
  const { requestIds, finalizedRequestId, updateRequestIds } = useRequestIds();

  const cliamToken = async (e) => {
    e.preventDefault();

    const requestID = claimAmountRef.current.value.trim();

    if (isNaN(requestID) || requestID <= 0) {
      toast.error("Please enter a valid positive number.");
      return;
    }

    try {
      const transaction = await withdrawContract.claim(requestID);

      await toast.promise(transaction.wait(), {
        loading: "🔃",
        success: '✅',
        error: '❌'
      });

      claimAmountRef.current.value = "";
      await updateRequestIds();
    } catch (error) {
      console.log("requesttstca ", requestIds);
      if (!requestIds.split(",").includes(requestID)) {
        toast.error("Enter Correct Request Id 😡");
      } else if (finalizedRequestId <= requestID) {
        toast.error("Request Id is not Finalized 🙅🏻");
      } else {
        toast.error("Claim Failed 🤯");
        console.error(error.message);
      }
    }
  };

  return (
    <form onSubmit={cliamToken} className="flex flex-col justify-center items-start pt-9 px-9 pb-4">
      <div className="flex w-[100%] text-white justify-between">
        <label className="opacity-80 text-s font-normal mb-4">Enter Request ID</label>
      </div>
      <input
        className="p-6 w-[100%] rounded-xl bg-[#008F8D] outline-none text-white"
        type="text"
        ref={claimAmountRef}
        placeholder="0"
      />
      <div className="mt-7 w-[100%] text-center">
        {requestIds.length >= 1 ? (
          <div>
            <span className="uppercase text-gray-200 font-medium">Request Id :</span>{' '}
            <span className="text-white font-extralight">{requestIds.split(",").reverse().join(",")}</span>
          </div>
        ) : (
          <div className="mt-6"></div>
        )}
      </div>
      <div className="uppercase text-xs text-gray-200 flex justify-center items-center w-[100%] mt-5">
        "Claim only after your request ID is finalized."
      </div>
      <div className="w-[100%] bg-white border-b mt-5 rounded-xl"></div>

      <div className="w-[100%] flex justify-center items-center mt-5"> 
       <button onClick={cliamToken} type="submit" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
Claim
</span>
</button>
       </div>
    </form>
  );
};

export default ClaimAmount;
