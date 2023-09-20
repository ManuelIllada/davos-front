import React, { useEffect, useState } from "react";
import axios from "axios";
import { Progress } from "@material-tailwind/react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Table({ selectedSeller, selectedDepartment, selectedClient }) {
  const [data, setData] = useState([]); // Utilizamos el estado para almacenar los datos obtenidos

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/salesInterior/articlesNotSold`, {
        params: {
          seller: selectedSeller.seller,
          department: selectedDepartment.department,
          client: selectedClient.client,
        },
      })

      .then((response) => {
        setData(response.data); // Actualizamos el estado con los datos obtenidos
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, [selectedSeller, selectedDepartment, selectedClient]); // El segundo argumento vacío indica que este efecto solo se ejecuta una vez al montar el componente

  const [progressValue, setProgressValue] = useState(75);

  useEffect(() => {
    const targetValue = 100; // Valor final de la barra de progreso
    const step = 0.3; // Paso de incremento
    const updateInterval = 10; // Intervalo de actualización en milisegundos
    let currentValue = progressValue;

    const updateProgress = () => {
      if (currentValue < targetValue) {
        currentValue += step;
        setProgressValue(currentValue);
      } else {
        clearInterval(progressInterval);
      }
    };

    const progressInterval = setInterval(updateProgress, updateInterval);

    return () => clearInterval(progressInterval); // Limpiamos el intervalo en la limpieza del efecto
  }, [progressValue]);

  return (
    <div name="table" className=" bg-gray-100">
      <Navbar />
      <div className="min-h-[calc(100dvh-128px)]">
        <div className="text-center pt-4 py-2 sm:py-4 md:py-6 lg:py-8 xl:py-10  mx-6 sm:mx-10 md:mx-20 lg:mx-36 xl:mx-48">
          <div className="flex items-center justify-center">
            <div className="w-1/4 h-0.5 bg-gray-300 hidden sm:block "></div>
            <h1 className="font-semibold mx-4 text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
              Productos No Vendidos
            </h1>
            <div className="w-1/4 h-0.5 bg-gray-300 hidden sm:block"></div>
          </div>
        </div>
        <div className="flex items-center justify-center mb-6 py-2 sm:py-4 md:py-6 lg:py-8 xl:py-10 ">
          <Progress
            value={progressValue}
            size="lg"
            className="border border-gray-900/10 bg-gray-900/5 p-1 w-1/2"
            transitionDuration="1000ms" // Ajusta la duración de la transición
          />
        </div>

        <div className="flex items-center justify-center mx-6 sm:mx-10 md:mx-20 lg:mx-36 xl:mx-48 ">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden ">
            <div className="overflow-x-auto max-h-[40dvh]">
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
            <div className="relative px-6 text-white bg-gray-700 text-xs sm:text-sm md:text-md  lg:text-lg">
              <div className="flex justify-between items-center py-2 font-bold">
                <p className="mr-2 ">{selectedSeller.seller}</p>
                <p className="mr-2" style={{ textTransform: "uppercase" }}>
                  {selectedDepartment.department}
                </p>
                <p>{selectedClient.client}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Table;
