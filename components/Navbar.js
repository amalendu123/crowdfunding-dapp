import React, { useContext, useState } from 'react'
import { CrowdFundingContext } from '../Context/crowdfunding';
const Navbar = () => {
  const {currentAccount,connectWallet} = useContext(CrowdFundingContext);
  return (
    <div className='h-20 bg-black font-mono  '>
        <div className='flex p-2 gap-10 h-full  justify-between items-center'>
            <div>
                <h1 className='md:text-4xl text-2xl text-white'>CrowdFunding</h1>
            </div>
            {!currentAccount && <div className='w-40 h-12 bg-white border-1 text-black rounded-md flex justify-center items-center transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 '>
                <button className='' onClick={()=>{
                  connectWallet();
                  
                }}>Connect Wallet</button>
            </div>}
        </div>
    </div>
  )
}

export default Navbar