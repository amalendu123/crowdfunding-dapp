import React, { useState } from 'react'

const Hero = ({titledata,createCampaign}) => {
    
    const [campaign,setCampaigns]=useState({
        title:"",
        description:"",
        amount:"",
        deadline:"",
    });
    const createCampaignHandler = async (e)=>{
        
        e.preventDefault();
        try{
            const data = await createCampaign(campaign);
        }catch(error){
            console.log("error",error)
        }
    };
  return (
    <div className='md:h-screen md:w-screen font-mono'>
        <div className='h-full w-full md:flex  justify-between '>
            <div className='flex flex-col justify-center items-center h-full  md:w-1/2 p-3'>
                <h1 className='font-bold  text-4xl'>Create a Crowdfund</h1>
                <p>Create a crowdfund for funding your CrowdFund . The funding is done is by the metamask app.</p>
            </div>
            <div className='flex flex-col gap-4 md:w-1/2 justify-center items-center h-full p-4'>
                <input type='text' className='rounded-2xl border-2 border-black w-full p-3' placeholder='Enter The title ' onChange={(e)=>{
                    setCampaigns({...campaign,title:e.target.value});
                }}/>
                <input type='text' className='rounded-2xl border-2 border-black w-full p-3' placeholder='Enter the description ' onChange={(e)=>{
                    setCampaigns({...campaign,description:e.target.value});
                }}/>
                <input type='text' className='rounded-2xl border-2 border-black w-full p-3' placeholder='Enter the amount ' onChange={(e)=>{
                    setCampaigns({...campaign,amount:e.target.value});
                }}/>
                <input type='date' className='rounded-2xl border-2 border-black w-full p-3' placeholder='Enter your deadline ' onChange={(e)=>{
                    setCampaigns({...campaign,deadline:e.target.value});
                }}/>
                <div className='w-40 h-12 bg-cyan-400 border-1 text-black rounded-md flex justify-center items-center transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 '>
                    <button className='' onClick={createCampaignHandler}>Create campaign</button>
                </div>
            </div>
        </div>
    
    </div>
  )
}

export default Hero