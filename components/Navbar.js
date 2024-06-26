import React, { useContext, useEffect, useState } from 'react'
import { CrowdFundingContext } from '../Context/crowdfunding';
import WidgetsRoundedIcon from '@material-ui/icons/WidgetsRounded';

const Navbar = () => {
  const { currentAccount, connectWallet } = useContext(CrowdFundingContext);
  
  return (
    <div className='h-20 bg-[#153448]' style={{ fontFamily: "Poppins" }}>
      <div className='flex p-2 gap-10 h-full justify-between items-center'>
        <div className='flex'>
          <WidgetsRoundedIcon style={{color:"white",fontSize:"40px"
          }}/>
          <h1 className='md:text-4xl text-2xl text-white'>WeCollect</h1>
        </div>
        <div className='w-fit p-2 h-12 bg-[#DFD0B8] border-1 text-black rounded-md flex justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 '>
          <button className='' onClick={() => {
            connectWallet();
          }}>{currentAccount ? currentAccount : "Connect Wallet"}</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
