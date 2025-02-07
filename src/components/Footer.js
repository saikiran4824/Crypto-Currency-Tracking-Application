import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-cyan-900 text-white py-6 left-0">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <h1 className="text-xl font-semibold text-cyan text-center mb-3">
          Crypto Chain - Crypto Currencies Tracking Application
        </h1>
        <p className="text-sm text-center mb-2">
          Track the latest trends in the world of cryptocurrencies with real-time updates.
        </p>
        
        <p className="text-xs mt-4 text-center text-cyan-200">
          © {new Date().getFullYear()} Crypto Chain. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
