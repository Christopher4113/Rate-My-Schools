import React from 'react';

interface OptionProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // Type for the onClick prop
}

const Option: React.FC<OptionProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick} // Forward the onClick prop to the button
      className="group relative inline-block w-[44px] p-[5px] h-[45px] m-[25px] 
                 border-none outline-none focus:outline-none active:outline-none"
      style={{
        WebkitTapHighlightColor: 'transparent', // Remove tap highlight on mobile
        background: 'transparent' // Remove white background
      }}
    >
      <span
        className="mx-[auto] my-[0] relative top-[12px] w-[30px] h-[6px] bg-[#000] block 
          [transition-property:margin,_width] group-hover:w-[20px] duration-200
          after:absolute after:content-[''] after:mt-[12px] after:w-[30px] after:h-[6px] after:bg-[#000] 
          after:block after:left-[0] after:[transition-property:margin,_left] after:duration-200 
          group-hover:after:mt-[6px] group-hover:after:-left-[5px]
          before:absolute before:content-[''] before:-mt-[12px] before:w-[30px] before:h-[6px] 
          before:bg-[#000] before:block before:left-[0] before:[transition-property:margin,_width,_left] 
          before:duration-200 group-hover:before:-mt-[6px] group-hover:before:w-[10px] group-hover:before:left-[5px]"
      ></span>
    </button>
  );
};

export default Option;
