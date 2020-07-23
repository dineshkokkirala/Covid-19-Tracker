import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import { red } from "@material-ui/core/colors";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};
const buildChartData = (data, casesType = "cases") => {
  const chartData = [];
  let lastDataPoint;

  for (let date in data.cases) {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: data[casesType]["cases"][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

const LineGraph = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=30")
        .then((response) => response.json())
        .then((data) => {
          const chartData = buildChartData(data, "cases");
          setData(chartData);
        });
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Graph</h1>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: red,
                borderColor: "#CC10343",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
};

export default LineGraph;
