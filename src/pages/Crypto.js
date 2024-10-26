import React from "react";
import { Outlet } from "react-router-dom";
import Filters from "../components/Filters";
import TableComponent from "../components/TableComponent";

const Crypto = () => {
  return (
    <section className="w-full max-w-6xl h-full flex flex-col mt-8 mb-16 px-4 md:px-8 lg:px-16">
      {/* Filters component */}
      <Filters />
      
      {/* Table component */}
      <TableComponent />

      {/* Outlet component for nested routes */}
      <Outlet />
    </section>
  );
};

export default Crypto;
