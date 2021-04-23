import React, { Component } from "react";
import { Pie, Doughnut } from "react-chartjs-2";

class Home extends Component {
  getPassedStatusCount(regressionData1) {
    let passedCount = 0;
    regressionData1.filter((step) => {
      if (step.status.toLowerCase().includes("passed")) {
        passedCount++;
      }
      return null;
    });
    return passedCount;
  }

  getFailedStatusCount(regressionData1) {
    let failedCount = 0;
    regressionData1.filter((step) => {
      if (step.status.toLowerCase().includes("failed")) {
        failedCount++;
      }
      return null;
    });
    return failedCount;
  }

  render() {
    const {
      totalPassedSenario,
      totalFailedSenario,
      latestDate,
      regressionData1,
    } = this.props;
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

    let runData = {
      labels: ["Passed", "Failed"],
      datasets: [
        {
          label: "Report",
          backgroundColor: ["#2FDE00", "#B21F00"],
          hoverBackgroundColor: ["#175000", "#35014F"],
          data: [
            this.getPassedStatusCount(regressionData1),
            this.getFailedStatusCount(regressionData1),
          ],
        },
      ],
    };
    return (
      <>
        {totalPassedSenario !== 0 || totalFailedSenario !== 0 ? (
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
                    text: "Regression Report As of " + latestDate,
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
                data={runData}
                options={{
                  title: {
                    display: true,
                    text: "Passed/Failed Run History",
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
        ) : (
          <div className="app-access">
            Run not available for selected LBU and Platform.
          </div>
        )}
      </>
    );
  }
}

export default Home;
