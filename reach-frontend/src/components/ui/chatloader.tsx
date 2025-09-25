import React from 'react';

export default function Chatloader({ prop }: { prop: { count: number } }) {
  return (
    <div className='w-full p-1.5 flex  flex-col gap-1'>
      {Array.from({ length: prop.count }).map((_, i) => (
        <div
          key={i}
          className='bg-[#BABABA] w-full h-14 animate-pulse rounded-sm'
        ></div>
      ))}
    </div>
  );
}


