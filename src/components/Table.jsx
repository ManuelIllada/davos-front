import React, { useEffect, useState } from "react";
import axios from "axios";

function Table() {
  const [data, setData] = useState([]); // Utilizamos el estado para almacenar los datos obtenidos

  useEffect(() => {
    axios
      .get("http://localhost:3333/salesInterior/articlesNotSold")

      .then((response) => {
        setData(response.data); // Actualizamos el estado con los datos obtenidos
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []); // El segundo argumento vacío indica que este efecto solo se ejecuta una vez al montar el componente

  return (
    <div name="table" className=" bg-gray-100 hpage">
      <div className="text-center py-8 mx-6 sm:mx-10 md:mx-20 lg:mx-36 xl:mx-48">
        <div className="flex items-center justify-center">
          <div className="w-1/4 h-0.5 bg-gray-300"></div>
          <h1 className="text-3xl font-semibold mx-4">Productos No Vendidos</h1>
          <div className="w-1/4 h-0.5 bg-gray-300"></div>
        </div>
      </div>
      <div className="flex items-center justify-center mx-6 sm:mx-10 md:mx-20 lg:mx-36 xl:mx-48">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto max-h-[70vh]">
            <table className="table-auto">
              <thead className="bg-gray-700 text-white shadow-lg sticky top-0">
                <tr>
                  <th className="py-3 px-4 text-left">Artículo</th>
                  <th className="py-3 px-4 text-left">Nombre</th>
                  <th className="py-3 px-4 text-left">Categoría</th>
                  <th className="py-3 px-4 text-left">Marca</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  return (
                    <tr key={item.id} className="hover:bg-gray-100">
                      <td className="px-4 py-3">{item.article}</td>
                      <td className="px-4 py-3">{item.name}</td>
                      <td className="px-4 py-3">{item.family}</td>
                      <td className="px-4 py-3">{item.brand}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
