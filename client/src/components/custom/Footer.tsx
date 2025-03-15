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
        <a href="/allschools" className=" text-white">
          All Schools
        </a>
        <a href="/about" className=" text-white">
          About
        </a>
      </div>
      <p
      className="text-2xl md:text-xl sm:text-lg text-center text-white"
      style={{
        fontFamily: 'Times New Roman, Arial, sans-serif',
        width: '80%',
        maxWidth: '800px',
        margin: '20px auto',
        lineHeight: '1.6',
        wordWrap: 'break-word',
      }}
    >
      Need help? Contact us at{' '}
      <a
        href="mailto:ratemyschools@gmail.com"
        style={{ color: '#fff', textDecoration: 'underline' }}
      >
        ratemyschools@gmail.com
      </a>
    </p>

    </div>
  );
};

export default Footer;
