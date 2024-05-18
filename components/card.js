import React, { useState, useEffect } from 'react';

const Card = ({ allcampaign,donate }) => {
    const [popup, setPopup] = useState(false);
    const [data, setdata] = useState();
    const [amount,setamount] = useState('');
    useEffect(() => {
        if (popup) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [popup]);

    const getTheID = (campaign) => {
        setdata(campaign);
        setPopup(!popup);
    };
    console.log("the campaign are"+allcampaign)
    return (
        <div className='flex justify-center items-center m-4 gap-10 flex-wrap'>
            {allcampaign?.map((campaign, index) => (
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
                    <div className='flex justify-between bg-white md:h-[500px] md:w-[1000px] border-4 border-sky-500 p-8'  style={{ opacity: popup ? 1 : 0, transform: popup ? 'translateY(0)' : 'translateY(-50px)' }}>

                        <div className='flex flex-col w-full '>
                            <div className='flex justify-end w-full text-3xl'>
                                X
                            </div>
                            <div className='font-bold font-mono'>{data?.title}</div>
                            <div>{data?.description}</div>
                            <input type='text' className='rounded-2xl border-2 border-black w-full p-3' placeholder='Enter The amount ' onChange={(e)=>{
                                setamount(e.target.value);
                            }}/>
                        </div>
                        <div className=' flex justify-end items-end  '><button className="h-10 w-20 bg-cyan-950 text-white rounded-2xl" onClick={()=>{
                            console.log(amount);
                            console.log(data.pId)
                            donate(data.pId,amount)}}>Donate</button></div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Card;
