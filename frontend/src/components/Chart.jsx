import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from "chart.js"
import {Line} from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const Chart = ({options, labels, datasets}) => {

    const data = {
        labels,
        datasets
    }

    return <Line id="chart" options={options} data={data} />
}

export default Chart