import React, { useEffect, useState } from "react";
import { Progress } from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function NameFilter({ onSellerSelected }) {
  const [data, setData] = useState([]);
  const [progressValue, setProgressValue] = useState(0);
  const [selectedItem, setSelectedItem] = useState("");

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setIsButtonDisabled(selectedItem === "");
  }, [selectedItem]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/sellers`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  useEffect(() => {
    const targetValue = 5;
    const step = 0.3;
    const updateInterval = 10;
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

    return () => clearInterval(progressInterval);
  }, [progressValue]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    onSellerSelected({ seller: selectedItem });
    navigate("/cityfilter");
  };

  const handleClick = async (event) => {
    event.preventDefault();
    navigate("/table");
  };

  return (
    <div className=" bg-gray-100">
      <Navbar />
      <div className="min-h-[calc(100dvh-128px)]">
        <div className="text-center pt-4 py-4 md:py-6 lg:py-8 xl:py-10  mx-6 sm:mx-10 md:mx-20 lg:mx-36 xl:mx-48">
          <div className="flex items-center justify-center">
            <div className="w-1/4 h-0.5 bg-gray-300 hidden sm:block "></div>
            <h1 className="text-3xl font-semibold mx-4">Seleccione Vendedor</h1>
            <div className="w-1/4 h-0.5 bg-gray-300 hidden sm:block"></div>
          </div>
        </div>
        <div className="flex py-4 md:py-6 lg:py-8 xl:py-10  items-center justify-center">
          <Progress
            value={progressValue}
            size="lg"
            className="border border-gray-900/10 bg-gray-900/5 p-1 w-1/2"
            transitionDuration="1000ms" // Ajusta la duración de la transición
          />
        </div>
        <form
          className="flex flex-col items-center justify-center mx-6 sm:mx-10 md:mx-20 lg:mx-36 xl:mx-48 h-1/2 py-4 md:py-6 lg:py-8 xl:py-10"
          onSubmit={handleSubmit}
        >
          <label for="underline_select" class="sr-only">
            Underline select
          </label>
          <select
            id="underline_select"
            className="col-1 block py-2.5 w-1/2 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer my-4 md:my-6 lg:my-8 xl:my-10 "
            onChange={(event) => setSelectedItem(event.target.value)}
            value={selectedItem}
          >
            <option value="">Seleccione un vendedor</option>
            {data.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <button
            disabled={isButtonDisabled}
            className="bg-gray-700 col-1 mt-2 focus:outline-none text-white hover:bg-brown-500 2xl:w-40 xl:w-36 btn2 lg:w-28 w-24 rounded-md 2xl:text-xl xl:text-lg lg:text-md text-sm py-3"
          >
            Aceptar
          </button>
        </form>
        <div className="flex flex-col items-center justify-center mx-6 sm:mx-10 md:mx-20 lg:mx-36 xl:mx-48 ">
          <button
            onClick={handleClick}
            className="bg-gray-700 col-1 m-4 focus:outline-none text-white hover:bg-black 2xl:w-48 xl:w-44 btn2 lg:w-36 w-32 rounded-md 2xl:text-xl xl:text-lg lg:text-md text-sm py-3"
          >
            Lista de Artículos
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NameFilter;
