import React from "react";
import { Pie as LineChart } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
// import { useSelector } from "react-redux";
Chart.register(ArcElement);

const ReportChart = () => {
  const [ismydata, setismydata] = React.useState([]);

  //   const { orderlist } = useSelector(state => state.admin);

  //   React.useEffect(() => {
  //     const arrayGCMS = [];
  //     if (orderlist.length !== 0) {
  //       arrayGCMS.push(orderlist.filter(data => data.ORDER_TYPE === 1).length);
  //       arrayGCMS.push(orderlist.filter(data => data.ORDER_TYPE === 2).length);
  //       arrayGCMS.push(orderlist.filter(data => data.ORDER_TYPE === 3).length);
  //       arrayGCMS.push(orderlist.filter(data => data.ORDER_TYPE === 4).length);
  //       arrayGCMS.push(orderlist.filter(data => data.ORDER_TYPE === 5).length);
  //     }

  //     setismydata(arrayGCMS);
  //   }, [orderlist]);

  //   let data = {
  //     labels: [
  //       "GCMS Note Basic",
  //       "GCMS Documents",
  //       "GCMS Advance Plus",
  //       "CBSA notes",
  //       "Csis Notes"
  //     ],
  //     datasets: [
  //       {
  //         label: "# of Votes",
  //         data: ismydata,
  //         backgroundColor: [
  //           "rgba(255, 99, 132, 0.2)",
  //           "rgba(54, 162, 235, 0.2)",
  //           "rgba(255, 206, 86, 0.2)",
  //           "rgba(75, 192, 192, 0.2)",
  //           "rgba(153, 102, 255, 0.2)",
  //           "rgba(255, 159, 64, 0.2)"
  //         ],
  //         borderColor: [
  //           "rgba(255, 99, 132, 1)",
  //           "rgba(54, 162, 235, 1)",
  //           "rgba(255, 206, 86, 1)",
  //           "rgba(75, 192, 192, 1)",
  //           "rgba(153, 102, 255, 1)",
  //           "rgba(255, 159, 64, 1)"
  //         ],
  //         borderWidth: 1
  //       }
  //     ]
  //   };

  let data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    scaleShowGridLines: true,
    scaleGridLineColor: "rgba(175,203,128)",
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
      border: "1px solid black",
      padding: "15px",
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  };

  return (
    <div className='pie_container'>
      <LineChart
        data={data}
        options={options}
        //   width='600'
        //   height='250'
      />
    </div>
  );
};

export default ReportChart;
