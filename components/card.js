import React from 'react';

const Card = ({ allcampaign }) => {
    return (
        <div className='flex gap-10 p-4'>
            {allcampaign?.map((campaign, index) => (
                <div key={index} className='w-48 h-40 border-3 border-blue-500 drop-shadow-2xl p-2 bg-black text-white'>
                    <div className='flex flex-col '>
                        <h2 className='text-3xl'>{campaign.title}</h2>
                        <p>{campaign.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Card;
