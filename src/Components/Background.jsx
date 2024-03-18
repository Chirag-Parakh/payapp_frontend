import React from 'react';
import { useEffect } from 'react';

const CustomBackground = () => {
const renderComponents = () => {
    const components = [];
    for (let i = 0; i < 140; i++) {
      components.push(<YourComponent key={i} />);
    }
    return components;
  };

  return (
    <div className="h-screen overflow-hidden columns-6 sm:columns-8 opacity-20  gap-8 w-screen text-cyan relative" >
        {renderComponents()}
    </div>
  );
};

function YourComponent(){
    return<div className='text-cyan  -rotate-[40deg]  text-center px-2 py-6 sm:py-6 sm:px-4'><span className='text-4xl  ' >&#8377;</span></div>
}

export default CustomBackground;
