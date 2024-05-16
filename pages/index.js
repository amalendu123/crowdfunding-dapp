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
      <div>
      <h2 className='text-black text-4xl font-mono text-center'>All CrowdFunding</h2>
      <Card allcampaign={campaigns} donate={donate} />
      </div>
      <div>
    
      </div>
    </div>
  )
}

export default index