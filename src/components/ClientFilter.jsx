import React, { useEffect, useState } from "react";
import { Progress } from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ClientFilter({
  selectedSeller,
  selectedDepartment,
  onSellerSelected,
  onDepartmentsSelected,
  onClientsSelected,
}) {
  const [progressValue, setProgressValue] = useState(35);
  const [selectedItem, setSelectedItem] = useState("");
  const [data, setData] = useState([]);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setIsButtonDisabled(selectedItem === "");
  }, [selectedItem]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/sellers/clients`, {
        params: {
          seller: selectedSeller.seller,
          department: selectedDepartment.department,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, [selectedSeller, selectedDepartment]);

  useEffect(() => {
    const targetValue = 75; // Valor final de la barra de progreso
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    onSellerSelected({ seller: selectedSeller.seller });
    onDepartmentsSelected({ department: selectedDepartment.department });
    onClientsSelected({ client: selectedItem });
    navigate("/table");
  };

  return (
    <div name="clientfilter" className=" bg-gray-100 hpage">
      <div className="text-center py-8 mx-6 sm:mx-10 md:mx-20 lg:mx-36 xl:mx-48">
        <div className="flex items-center justify-center">
          <div className="w-1/4 h-0.5 bg-gray-300"></div>
          <h1 className="text-3xl font-semibold mx-4">
            Seleccione Departamento
          </h1>
          <div className="w-1/4 h-0.5 bg-gray-300"></div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Progress
          value={progressValue}
          size="lg"
          className="border border-gray-900/10 bg-gray-900/5 p-1 w-1/2"
          transitionDuration="1000ms" // Ajusta la duración de la transición
        />
      </div>

      <form
        className="flex flex-col items-center justify-center mx-6 sm:mx-10 md:mx-20 lg:mx-36 xl:mx-48 h-1/2"
        onSubmit={handleSubmit}
      >
        <label for="underline_select" class="sr-only">
          Underline select
        </label>
        <select
          id="underline_select"
          className="col-1 block py-2.5 w-1/2 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          onChange={(event) => setSelectedItem(event.target.value)}
          value={selectedItem}
        >
          <option value="">Seleccione un cliente</option>
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
          className="bg-gray-700 col-1 m-4 focus:outline-none text-white hover:bg-brown-500 2xl:w-40 xl:w-36 btn2 lg:w-28 w-24 rounded-md 2xl:text-xl xl:text-lg lg:text-md text-sm py-3"
        >
          Aceptar
        </button>
      </form>
      <div className="text-center mx-6 sm:mx-10 md:mx-20 lg:mx-36 xl:mx-48">
        <div className="items-center pb-2 font-bold">
          <p className="mr-2 mb-2 mt-2">{selectedSeller.seller}</p>
          <p className="mr-2" style={{ textTransform: "uppercase" }}>
            {selectedDepartment.department}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ClientFilter;
