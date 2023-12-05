import { useContext,useEffect,useRef, useState } from "react";
import {ethers} from "ethers"
import Web3Context from "../../context/Web3Context";
import { toast } from "react-hot-toast";

const ApproveAmount = () => {

 const {withdrawContract,ethxContract,selectedAccount} = useContext(Web3Context);
 const approveStakeAmountRef = useRef();

 const approveToken=async(e)=>{

   e.preventDefault();
   const amount = approveStakeAmountRef.current.value.trim();
 
   if(isNaN(amount) || amount<=0){
    toast.error("Please enter a valid positive number.");
    return;
   }

   const amountToApprove = ethers.parseUnits(amount,18).toString();

   try{
    const approval = await ethxContract.approve(withdrawContract.target,amountToApprove)

    await toast.promise(approval.wait(),
    {
      loading: "🔃",
        success: '✅',
        error: '❌'
    });

    approveStakeAmountRef.current.value = "";

    } catch (error) {
        if(ethxContract == null){
            toast.error("Connect To Wallet First")
        }else{
            toast.error("Staking Failed");
            console.error(error.message)
        }
    }
  };

    return (
        <form onSubmit={approveToken} className="flex flex-col justify-center items-start pt-9 px-9 pb-4">
        <div className="flex w-[100%] text-white justify-between">
        <label className=" opacity-80 text-s font-normal mb-4">Enter ETHx amount</label>
        </div>
        <input className="p-6 w-[100%] rounded-xl bg-[#008F8D] outline-none text-white mb-2" type="text" ref={approveStakeAmountRef} placeholder="0.0" />

       <div className="uppercase text-xs text-gray-200 flex justify-center items-center w-[100%] mt-16">"AFTER APPROVAL ONLY YOU CAN UNSTAKE YOUR TOKEN"</div>
       <div className="w-[100%] bg-white border-b mt-5 rounded-xl"></div>
      
       <div className="w-[100%] flex justify-center items-center mt-5"> 
       <button onClick={approveToken} type="submit" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
Approve
</span>
</button>
       </div>
       
      </form>
      )
}

export default ApproveAmount;