import Hero from '@/components/Hero'
import React, { useContext, useEffect, useState } from 'react'
import { CrowdFundingContext } from "../Context/crowdfunding";
import Card from '@/components/card';


const Index = () => {
  const {
    titleData,
    createCampaign,
    getCampaigns,
    getUserCampaigns,
    donate,
    currentAccount,
    getDonations,
  } = useContext(CrowdFundingContext);

  const [campaigns, setCampaigns] = useState([]);
  const [userCampaigns, setUserCampaigns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const campaignsData = await getCampaigns();
      const userCampaignsData = await getUserCampaigns();
      setCampaigns(campaignsData);
      setUserCampaigns(userCampaignsData);
    };
    fetchData();
  }, [getCampaigns, getUserCampaigns]);

  const [donateCampaign, setDonateCampaign] = useState(null);

  return (
    <div>
      <Hero titleData={titleData} createCampaign={createCampaign} />
      {userCampaigns && userCampaigns.length > 0 && (
        <div>
          <h2 className='text-black text-4xl font-mono text-center'>My CrowdFunding</h2>
          <Card allCampaign={userCampaigns} />
        </div>
      )}
      <div>
        <div className='flex justify-between'>
          <hr color='white ' className='w-1/4' />
          <h2 className='text-4xl font-Poppins text-white p-5 md:text-pretty text-center'>
            Latest Fund Raising Campaign
          </h2>
          <hr color='white ' className='w-1/4' />
        </div>
        <Card allCampaign={campaigns} donate={donate} />
      </div>
    </div>
  );
};

export default Index;