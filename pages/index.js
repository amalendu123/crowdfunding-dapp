import Hero from '@/components/Hero'
import React, { useContext, useEffect, useState } from 'react'
import {CrowdFundingContext} from "../Context/crowdfunding";
import Card from '@/components/card';

const index = () => {
  const{
    titleData,
    createCampaign,
    getCampaigns,
    getUserCampaigns,
    donate,
    currentAccount,
    getDonations,
  } = useContext(CrowdFundingContext);
  const [campaigns,setCampaigns] = useState();
  const [userCampaigns,setUserCampaigns] = useState();
  useEffect(()=>{
    
    return async()=>{
      if(currentAccount){
        setCampaigns(await getCampaigns());
        setUserCampaigns(await getUserCampaigns());
      }
      
    };
  },[]);

  
  const [donateCampain,setDonateCampaign] = useState();
  

  return (
    <div>
      <Hero titleData={titleData}  createCampaign={createCampaign} />
      {userCampaigns && userCampaigns.length > 0 && (
        <div>
          <h2 className='text-black text-4xl font-mono text-center'>My CrowdFunding</h2>
          <Card allcampaign={userCampaigns} />
        </div>
      )}
      <div >
      <div className='flex justify-between'>
      <hr color='white ' className='w-1/4'></hr>
      <h2 className=' text-4xl font-Poppins  text-white p-5 md:text-pretty text-center'>Latest Fund Raising Campaign </h2>
      <hr color='white ' className='w-1/4'></hr>
      </div>
      <Card allcampaign={campaigns} donate={donate} />
      </div>
      <div>
    
      </div>
    </div>
  )
}

export default index