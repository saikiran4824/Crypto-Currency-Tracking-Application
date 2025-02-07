import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';

const Navigation = () => {
  return (
    <>
      <Logo />
      <nav
        className="m-2 mt-20 p-2 flex align-middle
    border border-cyan rounded-lg"
      >
        <NavLink
          to="/"
          end
          className={({ isActive }) => {
            return `w-full text-base text-center font-nunito m-2.5 sm:whitespace-nowrap

${
  isActive
    ? 'bg-cyan text-gray-300'
    : 'bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300'
}
     flex items-center  cursor-pointer px-2 rounded-sm  capitalize font-semibold`;
          }}
        >
          Crypto Currencies
        </NavLink>

        <NavLink
          to="/trending"
          className={({ isActive }) => {
            return `w-full text-base text-center font-nunito m-2.5 sm:whitespace-nowrap

${
  isActive
    ? 'bg-cyan text-gray-300'
    : 'bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300'
}
    cursor-pointer   capitalize font-semibold`;
          }}
        >
          Trending Currencies
        </NavLink>

        <NavLink
          to="/saved"
          className={({ isActive }) => {
            return `w-full text-base text-center font-nunito m-2.5 sm:whitespace-nowrap

${
  isActive
    ? 'bg-cyan text-gray-300'
    : 'bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300'
}
     cursor-pointer  capitalize font-semibold`;
          }}
        >
          Saved List
        </NavLink>
      </nav>
    </>
  );
};

export default Navigation;
