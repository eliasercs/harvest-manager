import BoxCard from "../components/BoxCard"
import Chart from "../components/Chart"
import HorizontalNavBar from "../components/HorizontalNavBar"
import NewBlueberryForm from "../components/NewBlueberryForm"

export const Home = () => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top"
            },
            title: {
                display: true,
                text: "Rendimiento Mes de Enero 2023"
            }
        }
    }

    const fechas = ["02/01/2023", "03/01/2023", "04/01/2023", "05/01/2023", "06/01/2023"]

    const datasets = [
        {
            label: "Cantidad de bandejas",
            data: [18, 27, 24, 19, 20],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
        }
    ]

    return <div>
        <HorizontalNavBar />
        <div className="container">
            <div className="row">
                <div className="col-1">
                    <div className="card">
                        <p>Lista de bandejas</p>
                        <div className="box-card-container">
                            <BoxCard icon="bi-box" title="02/01/2023" amount={18} type="Verde (2.1 kg)" />
                            <BoxCard icon="bi-box" title="02/01/2023" amount={18} type="Verde (2.1 kg)" />
                            <BoxCard icon="bi-box" title="02/01/2023" amount={18} type="Verde (2.1 kg)" />
                            <BoxCard icon="bi-box" title="02/01/2023" amount={18} type="Verde (2.1 kg)" />
                            <BoxCard icon="bi-box" title="02/01/2023" amount={18} type="Verde (2.1 kg)" />
                        </div>
                    </div>
                </div>
                <div className="col-2">
                    <div className="card">
                        <p>Visualización de rendimiento</p>
                        <Chart options={options} labels={fechas} datasets={datasets} />
                    </div>
                </div>
                <div className="col-1">
                    <div className="card">
                        <p>Agregar bandejas del dia</p>
                        <NewBlueberryForm />
                    </div>
                </div>
            </div>
        </div>
    </div>
}