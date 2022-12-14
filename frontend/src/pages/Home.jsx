import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import BoxCard from "../components/BoxCard";
import Chart from "../components/Chart";
import HorizontalNavBar from "../components/HorizontalNavBar";
import NewBlueberryForm from "../components/NewBlueberryForm";
import usePeriod from "../hooks/usePeriod";

export const Home = () => {
  const [trays, setTrays] = useState([]);
  const [fechas, setFechas] = useState([]);
  const [amountTrays, setAmountTrays] = useState([])

  const {PeriodState} = usePeriod()
  const {monthState, monthTranslate} = PeriodState

  useEffect(() => {
    const get_data = async () => {
      const res = await fetch(import.meta.env.VITE_API_URL+"/api/blueberry/get-trays", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: document.getElementById("user_id").value,
          month: monthState
        }),
      });
      const data = await res.json();
      setTrays(data);
      var f = []
      var at = []
      data.forEach(element => {
        f.push(element["date"])
        at.push(element["amount"])
      });
      setFechas(f)
      setAmountTrays(at)
    }
    monthState !== "default" && get_data()
  }, [monthState]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Rendimiento ${monthTranslate}`,
      },
    },
  };


  const datasets = [
    {
      label: "Cantidad de bandejas",
      data: amountTrays,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ];

  console.log(PeriodState)

  return (
    <div>
      <HorizontalNavBar />
      <div className="container">
        <div className="row">
          {
            monthState !== "default" && (<div className="col-1">
            <div className="card">
              <p>Lista de bandejas</p>
              <div className="box-card-container">
                {
                    trays.map((value, key) => <BoxCard 
                    key={key}
                    icon="bi-box"
                    title={value["date"]}
                    amount={value["amount"]}
                    type={value["type"]} />)
                }
              </div>
            </div>
          </div>)
          }
          {
            monthState !== "default" && (<div className="col-2">
            <div className="card">
              <p>Visualizaci??n de rendimiento</p>
              <Chart options={options} labels={fechas} datasets={datasets} />
            </div>
          </div>)
          }
          <div className="col-1">
            <div className="card">
              <p>Agregar bandejas del dia</p>
              <NewBlueberryForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
