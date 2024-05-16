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
    <div className='md:h-screen md:w-screen  bg-[#3C5B6F]  text-black' >
        <div className='h-full w-full md:flex  justify-between '>
            <div className='flex flex-col justify-center items-center h-full text-white  md:w-1/2 p-5 font-Poppins'  >
                <h1 className='font-bold  text-4xl text-left'>Create a Crowdfund</h1>
                <p className='text-center text-lg'>Welcome to our donation platform where we merge the power of blockchain technology with philanthropy. With every donation, we're not just contributing; we're revolutionizing the way we give. Our transparent and secure system ensures that every penny you donate reaches its intended destination, making a real-world impact. Join us in embracing the future of charitable giving, where every contribution counts towards building a better tomorrow.</p>
            </div>
            <div className='flex flex-col gap-4 md:w-1/2 justify-center items-center h-full p-4'>
                <input type='text' className='rounded-2xl border-4 border-[#153448] w-full p-3 font-michroma' placeholder='Enter The Title ' onChange={(e)=>{
                    setCampaigns({...campaign,title:e.target.value});
                }}/>
                <input type='text' className='rounded-2xl border-4 border-[#153448] w-full p-3 font-michroma' placeholder='Enter The Description ' onChange={(e)=>{
                    setCampaigns({...campaign,description:e.target.value});
                }}/>
                <input type='text' className='rounded-2xl border-4 border-[#153448] w-full p-3 font-michroma' placeholder='Enter The Amount ' onChange={(e)=>{
                    setCampaigns({...campaign,amount:e.target.value});
                }}/>
                <input 
                type='date' 
                className='rounded-2xl border-4 border-[#153448] w-full p-3 font-michroma font-black'
                style={{ color: '#000'}}
                placeholder='Enter Your Deadline Date' 
                onChange={(e) => {
                    setCampaigns({...campaign,deadline:e.target.value});
                }}
            />
                <div className='w-40 h-12 bg-cyan-400 border-1 text-black rounded-md flex justify-center items-center transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 '>
                    <button className='' onClick={createCampaignHandler}>Create campaign</button>
                </div>
            </div>
        </div>
    
    </div>
  )
}

export default Hero