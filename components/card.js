import React, { useState, useEffect } from 'react';
import { IoCloseOutline } from "react-icons/io5";
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

    return (
        <div className='md:flex m-4 gap-10'>
            {allcampaign?.map((campaign, index) => (
                <div key={index} className='w-48 h-40 border-3 rounded  drop-shadow-2xl p-2 bg-black text-white flex-col justify-between items-end'>
                    <div className='flex flex-col '>
                        <h2 className='text-3xl'>{campaign.title}</h2>
                        <p>{campaign.description}</p>
                        <p>amount:{campaign.target} Eth</p>
                        <p>Raised:{campaign.amountCollected}</p>
                    </div>
                    {campaign.target==campaign.amountCollected? <div className='flex justify-center items-center'>
                <button className='border-1 bg-white w-full h-full text-black font-mono' >Complete</button>
            </div>:<div className='flex justify-center items-center'>
            <button className='border-1 bg-white w-full h-full text-black font-mono' onClick={() => getTheID(campaign)}>Donate</button>
        </div>}
                   
                </div>
            ))}
            {popup ? (
                <div className='transition-all duration-1000 ease-in fixed h-screen top-0 w-screen flex justify-center items-center  text-black p-20 overflow-y-hidden '>
                    <div className='flex justify-between bg-white md:h-[500px] md:w-[1000px] border-4 border-sky-500 p-8'  style={{ opacity: popup ? 1 : 0, transform: popup ? 'translateY(0)' : 'translateY(-50px)' }}>

                        <div className='flex flex-col w-full '>
                            <div className='flex justify-end w-full'>
                                <IoCloseOutline size={20} onClick={() => setPopup(!popup)} className='pointer' />
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
