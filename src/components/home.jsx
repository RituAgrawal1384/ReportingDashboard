import React, { Component } from "react";
import { Pie, Doughnut } from "react-chartjs-2";

class Home extends Component {
  state = {};
  render() {
    const { totalPassedSenario, totalFailedSenario } = this.props;
    let chartData = {
      labels: ["Passed", "Failed"],
      datasets: [
        {
          label: "Report",
          backgroundColor: ["#2FDE00", "#B21F00"],
          hoverBackgroundColor: ["#175000", "#35014F"],
          data: [totalPassedSenario, totalFailedSenario],
        },
      ],
    };
    return (
      <div className="d-flex justify-content-center">
        <div>
          <Doughnut
            width={500}
            height={400}
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              title: {
                display: true,
                text: "Todays Regression Report",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>
        <div>
          <Pie
            width={500}
            height={400}
            data={chartData}
            options={{
              title: {
                display: true,
                text: "Passed/Failed Build History",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>
      </div>
    );
  }
}

export default Home;
