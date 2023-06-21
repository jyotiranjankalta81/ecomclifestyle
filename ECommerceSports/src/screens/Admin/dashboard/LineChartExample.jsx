import React from "react";
import { Line as LineChart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
function chartData () {
  return {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    datasets: [
      {
        label: "My First dataset",
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        data: [65, 59, 80, 81, 56, 55, 40, 23, 87, 92, 56, 28]
      },
      {
        label: "My Second dataset",
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        data: [28, 48, 40, 19, 86, 27, 90, 12, 85, 76, 54, 79]
      },
      {
        label: "My Third dataset",
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        data: [38, 98, 60, 79, 26, 37, 50, 33, 81, 57, 48, 69]
      }
    ]
  };
}

const options = {
  scaleShowGridLines: true,
  scaleGridLineColor: "rgba(0,0,0,.05)",
  scaleGridLineWidth: 1,
  scaleShowHorizontalLines: true,
  scaleShowVerticalLines: true,
  bezierCurve: true,
  bezierCurveTension: 0.4,
  pointDot: true,
  pointDotRadius: 4,
  pointDotStrokeWidth: 1,
  pointHitDetectionRadius: 20,
  datasetStroke: true,
  datasetStrokeWidth: 2,
  datasetFill: true,
  legendTemplate:
    '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
};

const styles = {
  graphContainer: {
    padding: "15px",
    boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.1)",
    borderRadius: "7px"
  }
};

class LineChartExample extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data: chartData()
    };
  }

  render () {
    return (
      <div style={styles.graphContainer}>
        <LineChart
          data={this.state.data}
          options={options}
          width='600'
          height='250'
        />
      </div>
    );
  }
}

export default LineChartExample;
