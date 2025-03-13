import React from 'react';

const Footer = () => {
  return (
    <div className="bg-blue-700 flex flex-col items-center justify-center p-6">
      {/* Footer Title */}
      <div className="text-center text-white font-semibold text-3xl max-sm:text-xl">
        RateMySchools
      </div>

      {/* Flex Row with Links */}
      <div className="flex flex-row justify-center items-center gap-4 mt-4">
        <a href="/tos" className=" text-white">
          TOS
        </a>
        <a href="/schools" className=" text-white">
          All Schools
        </a>
        <a href="/about" className=" text-white">
          About
        </a>
      </div>
    </div>
  );
};

export default Footer;
