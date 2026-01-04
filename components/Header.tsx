
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-10 text-center">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Portal Semakan Emel DELIMa
          </h1>
          <p className="mt-2 text-blue-100 text-lg font-medium">
            SK Nanga Penyarai, Tatau
          </p>
          <div className="h-1 w-20 bg-blue-400 rounded-full mt-4 opacity-50"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
