import { useState } from 'react'
import './App.css'
import Wallet from './components/Wallet/Wallet'
import StakeAmount from './components/Stake/StakeAmount'
import WithdrawAmount from './components/Withdraw/WithdrawAmount'
import ApproveAmount from './components/Approve/ApproveAmount'
import ClaimAmount from './components/Claim/ClaimAmount'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className="w-[100%] h-[100vh] bg-[#FFC872] radial relative flex justify-center items-center">
      <Wallet>
      {/* Top Left */}
      <div className="absolute top-0 left-[300px] p-4">
        <div className="w-[300px] rounded-xl bg-[#727497]">
          <StakeAmount />
        </div>
      </div>
      {/* Top Right */}
      <div className="absolute top-0 right-[300px] p-4">
        <div className="w-[300px] rounded-xl bg-[#727497]">
          <ApproveAmount />
        </div>
      </div>
      {/* Bottom Left */}
      <div className="absolute bottom-0 left-[300px] p-4">
        <div className="w-[300px] rounded-xl bg-[#727497]">
          <WithdrawAmount />
        </div>
      </div>
      {/* Bottom Right */}
      <div className="absolute bottom-0 right-[300px] p-4">
        <div className="w-[300px] rounded-xl bg-[#727497]">
          <ClaimAmount />
        </div>
      </div>
      {/* Middle */}
      
        <Toaster className="toast" position="top-center" />
      </Wallet>
    </div>
  )
}

export default App
