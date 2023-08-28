import React from "react";
import ProgressCustomStyles from "./Progreso";

function NameFilter() {
  return (
    <div className=" bg-gray-100 hpage">
      <div className="text-center py-8 mx-6 sm:mx-10 md:mx-20 lg:mx-36 xl:mx-48">
        <div className="flex items-center justify-center">
          <div className="w-1/4 h-0.5 bg-gray-300"></div>
          <h1 className="text-3xl font-semibold mx-4">Seleccione Vendedor</h1>
          <div className="w-1/4 h-0.5 bg-gray-300"></div>
        </div>
      </div>
      <ProgressCustomStyles />
      <div className="flex items-center justify-center mx-6 sm:mx-10 md:mx-20 lg:mx-36 xl:mx-48">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto max-h-[70vh]">
            <table className="table-auto"></table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NameFilter;
