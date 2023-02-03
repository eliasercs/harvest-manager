import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import BoxCard from "../components/BoxCard";
import Chart from "../components/Chart";
import HorizontalNavBar from "../components/HorizontalNavBar";
import NewBlueberryForm from "../components/NewBlueberryForm";
import Pagination from "../components/Pagination";
import useAuthStore from "../hooks/useAuthStore";
import useBlueberry from "../hooks/useBlueberry";
import usePeriod from "../hooks/usePeriod";

export const Home = () => {
  const [fechas, setFechas] = useState([]);
  const [amountTrays, setAmountTrays] = useState([])

  const {user} = useAuthStore()

  const {PeriodState} = usePeriod(user.id)
  const {monthState, monthTranslate} = PeriodState

  var p = monthState.split("/")

  const {trays} = useBlueberry({
    user_id: user.id,
    m: p[0],
    y: p[1],
  })

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
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Fecha"
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Cantidad de bandejas"
        },
        suggestedMin: 0
      }
    },
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

  const handleExportImage = (e) => {
    const canvas = document.getElementById("chart")
    canvas.toBlob(async (blob) => {
      const data = new FormData()
      data.append("file", blob, "file.png")
      data.append("user_id", user.id)
      data.append("period", monthState)
      console.log(blob)
      const res = await fetch(import.meta.env.VITE_API_URL+"/api/blueberry/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept": "application/pdf",
          "Access-Control-Allow-Origin": "harvest-manager-backend.onrender.com"
        },
        body: data
      })
      const b = await res.blob()
      const file = new Blob([b], {
        type: "application/pdf"
      })
      const f = URL.createObjectURL(file)
      window.open(f)
    })
  }


  const datasets = [
    {
      label: "Cantidad de bandejas",
      data: amountTrays,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ];

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
              <Pagination />
            </div>
          </div>)
          }
          {
            monthState !== "default" && (<div className="col-2">
            <div className="card" style={{paddingLeft: "10px", paddingRight: "10px"}}>
              <p>Visualización de rendimiento</p>
              <Chart options={options} labels={fechas} datasets={datasets} />
              <button className="btn" onClick={handleExportImage}>Exportar Información</button>
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
