import Hero from '@/components/Hero'
import React, { useContext, useEffect, useState } from 'react'
import { CrowdFundingContext } from "../Context/crowdfunding";
import Card from '@/components/card';
import CancelIcon from '@material-ui/icons/Cancel';
const Index = () => {
  const {
    titleData,
    createCampaign,
    getCampaigns,
    donate,
    alert,
    currentAccount,
  } = useContext(CrowdFundingContext);
  const [popup1,setpopup1] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const [userCampaigns, setUserCampaigns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const campaignsData = await getCampaigns();
      setCampaigns(campaignsData);
      console.log("Campaigns:", campaignsData);
      if(campaignsData === undefined){
        setpopup1(true);
        console.log("No METAMASK");
      }else{
        setpopup1(false)
      }
    };
   
    fetchData();
  }, [currentAccount]);
  const [popup, setPopup] = useState(false);
  const [data, setdata] = useState();
  const [amount,setamount] = useState('');
  useEffect(() => {
      if (popup) {
          document.body.style.overflow = 'hidden';
      } else {
          document.body.style.overflow = 'unset';
      }
      if(popup1){
        document.body.style.overflow = 'hidden';
      }else{
        document.body.style.overflow = 'unset';
      }
  }, [popup,popup1]);

  const getTheID = (campaign) => {
      setdata(campaign);
      setPopup(!popup);
  };
  
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
          <hr color='white' className='w-1/4' />
          <h2 className='text-4xl font-Poppins text-white p-5 md:text-pretty text-center'>
            Latest Fund Raising Campaign
          </h2>
          <hr color='white' className='w-1/4' />
        </div>
        <div className='flex justify-center items-center m-4 gap-10 flex-wrap'>
            {campaigns?.map((campaign, index) => (
                <div key={index} className='w-64 h-58 border-3 rounded  drop-shadow-2xl p-2 bg-[#153448] text-white flex-col justify-between items-end font-Poppins'>
                    <div className='flex flex-col '>
                        <img src='https://as1.ftcdn.net/v2/jpg/01/91/78/32/1000_F_191783282_0TVrx5VrvrkpDHSKdjjI87HkbXJy5TMw.jpg' className='w-full h-1/2' />
                        <h2 className='text-3xl line-clamp-1 font-bold'>{campaign.title}</h2>
                        <p className='line-clamp-2'>{campaign.description}</p>
                        <p>amount:{campaign.target} Eth</p>
                        <p>Raised:{campaign.amountCollected}</p>
                    </div>
                    {campaign.target==campaign.amountCollected? <div className='flex justify-center items-center'>
                <button className='border-1  w-full h-full text-black font-michroma font-semibold bg-[#948979]' >Complete</button>
            </div>:<div className='flex justify-center items-center'>
            <button className='border-1  w-full h-full text-black font-michroma bg-[#948979]' onClick={() => getTheID(campaign)}>Donate</button>
        </div>}
                   
                </div>
            ))}
            {popup ? (
                <div className='transition-all duration-1000 ease-in fixed h-screen top-0 w-screen flex justify-center items-center  text-black p-20 overflow-y-hidden '>
                    <div className='md:flex flex-col gap-5 md:gap-0 justify-between bg-[#948979] md:h-[500px] md:w-[1000px] border-4 border-sky-500 p-8'  style={{ opacity: popup ? 1 : 0, transform: popup ? 'translateY(0)' : 'translateY(-50px)' }}>

                        <div className='flex flex-col w-full '>
                            <div className='flex justify-end w-full text-3xl'>
                                <CancelIcon onClick={()=>{setPopup(!popup)}}/>
                            </div>
                            <div className='font-bold font-mono'>{data?.title}</div>
                            <div>{data?.description}</div>
                            <input type='text' className='rounded-2xl border-4 border-[#153448] w-full p-3 font-michroma' placeholder='Enter The amount ' onChange={(e)=>{
                                setamount(e.target.value);
                            }}/>
                        </div>
                        <div className=' flex md:justify-end md:items-end justify-center '><button className="h-10 w-20 bg-[#DFD0B8] text-black rounded-3xl" onClick={()=>{
                            console.log(amount);
                            console.log(data.pId)
                            donate(data.pId,amount)}}>Donate</button></div>
                    </div>
                </div>
            ) : (
                <></>
            )}
            {
              popup1?<>
                <div className = "h-screen w-screen fixed font-michroma">
                  <div className="flex justify-center items-center p-4">
                    <div className="p-2 bg-red-400 h-20">
                      <p className="break-words text-center">Please install metamask Or connect to the metamask</p>
                    </div>
                  </div>
                </div>
              </>:<></>
            }
        </div>
      </div>
      
    </div>
  );
};

export default Index;