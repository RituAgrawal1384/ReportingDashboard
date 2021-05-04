import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-labels";
// import React from "react";
// import pdf from "../data/MY/22-Mar-2021/Sales-portal-test-results.pdf";

// const Regression = (props) => {
//   const {
//     totalSenario,
//     totalExeTime,
//     totalPassedSenario,
//     totalFailedSenario,
//   } = props;
//   return (
//     <>
//       <div className="stock-container">
//         {/* <HomePageHeader /> */}
//         <h2>Regression Report</h2>
//         <table>
//           <tbody>
//             <tr>
//               <RenderTableHeader />
//             </tr>
//             {stockData.map((data, key) => {
//               return (
//                 <div key={key}>
//                   <Stock
//                     key={key}
//                     lbu={props.lbu.label}
//                     environment={"UAT"}
//                     executiontime={totalExeTime}
//                     totalscenarios={totalSenario}
//                     passed={totalPassedSenario}
//                     failed={totalFailedSenario}
//                   />
//                 </div>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default Regression;

// const HomePageHeader = () => {
//   return (
//     <header className="header">
//       <h2>Regression Report</h2>
//     </header>
//   );
// };

// function RenderTableHeader() {
//   let header = [
//     "Lbu",
//     "Environment",
//     "Execution Time (Hours)",
//     "Total Scenarios",
//     "Passed",
//     "Failed",
//   ];
//   // let header = Object.keys(this.stockData.data[0]);
//   return header.map((key, index) => {
//     return <th key={index}>{key}</th>;
//   });
// }

// const Stock = ({
//   lbu,
//   environment,
//   executiontime,
//   totalscenarios,
//   passed,
//   failed,
// }) => {
//   if (!environment) return <div />;
//   return (
//     // <table>
//     //   <tbody>
//     //     <tr>
//     //       <RenderTableHeader />
//     //     </tr>
//     <tr>
//       <td>{lbu}</td>
//       <td>{environment}</td>
//       <td>{executiontime}</td>
//       <td>{totalscenarios}</td>
//       <td>{passed}</td>
//       <td>{failed}</td>
//     </tr>
//     //   </tbody>
//     // </table>
//   );
// };
class Regression extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      reverse: false,
      currentPageNumber: 1,
      numItemsPerPage: 20,
      titleFilter: "",
      defaultDate: props.latestDate,
      tempLatestDate: props.latestDate,
      defaultEnv: "UAT",
      envFilter: "",
      filteredData: props.regressionData1,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      filteredData: props.regressionData1,
      defaultDate: props.latestDate,
      tempLatestDate: props.latestDate,
    });
  }
  titleFilterHandler(e) {
    this.setState({
      titleFilter: e.target.value || "",
    });
  }

  handleEnvironmentChange(e) {
    this.setState({
      envFilter: e.target.value || "",
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    if (
      this.state.titleFilter !== prevState.titleFilter ||
      this.state.envFilter !== prevState.envFilter
    ) {
      let filteredDate = "";
      let filteredEnv = "";
      let filteredData = this.props.regressionData1.filter((step) => {
        if (
          step.date
            .toLowerCase()
            .includes(this.state.titleFilter.toLowerCase()) &&
          step.environment
            .toLowerCase()
            .includes(this.state.envFilter.toLowerCase())
        ) {
          filteredDate = step.date;
          filteredEnv = step.environment;
          return step;
        }
        return null;
      });

      this.setState({
        filteredData: filteredData,
      });
      filteredDate === ""
        ? this.setState({ defaultDate: this.state.tempLatestDate })
        : this.setState({ defaultDate: filteredDate });

      filteredEnv === ""
        ? this.setState({ defaultEnv: "UAT" })
        : this.setState({ defaultEnv: filteredEnv });
    }
  }
  renderTableData() {
    return this.state.filteredData.map((step, index) => {
      const {
        id,
        date,
        lbu,
        build,
        environment,
        totalScenarios,
        totalExecTime,
        totalPassed,
        totalFailed,
        report,
      } = step; //destructuring
      return (
        <tr key={id}>
          {/* <td>{id}</td> */}
          <td>{date}</td>
          <td>{lbu}</td>
          <td>{build}</td>
          <td>{environment}</td>
          <td>{totalExecTime}</td>
          <td>{totalScenarios}</td>
          <td>{totalPassed}</td>
          <td>{totalFailed}</td>
          <td>
            <a
              href={process.env.PUBLIC_URL + report}
              download="Sales-portal-test-results.pdf"
            >
              Download
            </a>
          </td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    let header = [
      "Date",
      "LBU",
      "Build No.",
      "Environment",
      "Execution Time (Hours)",
      "Total Scenarios",
      "Passed",
      "Failed",
      "Report",
    ];
    return header.map((key, index) => {
      if (key === "Date") {
        return (
          <th key={index}>
            {"Execution Date"}
            <input
              style={{ width: "100" }}
              type="text"
              placeholder="Search"
              id={index}
              value={this.state.titleFilter}
              onChange={this.titleFilterHandler.bind(this)}
            />
          </th>
        );
      } else if (key === "Environment") {
        return (
          <th key={index}>
            {key}
            <input
              style={{ width: "100" }}
              type="text"
              placeholder="Search"
              id={index}
              value={this.state.envFilter}
              onChange={this.handleEnvironmentChange.bind(this)}
            />
          </th>
        );
      } else {
        return <th key={index}>{key}</th>;
      }
    });
  }
  render() {
    let lbuData = [];
    let passedData = [];
    let failedData = [];
    let totalPassedAcrossRegion = 0;
    let totalFailedAcrossRegion = 0;

    this.state.filteredData.filter((step) => {
      if (
        step.date
          .toLowerCase()
          .includes(this.state.defaultDate.toLowerCase()) &&
        step.environment
          .toLowerCase()
          .includes(this.state.defaultEnv.toLowerCase())
      ) {
        lbuData.push(step.lbu);
        passedData.push(step.totalPassed);
        failedData.push(step.totalFailed);
        totalPassedAcrossRegion = totalPassedAcrossRegion + step.totalPassed;
        totalFailedAcrossRegion = totalFailedAcrossRegion + step.totalFailed;
      }
      return null;
    });

    let regionData = {
      labels: ["Results"],
      datasets: [
        {
          label: "Passed",
          backgroundColor: "#2FDE00",
          hoverBackgroundColor: "green",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          data: [totalPassedAcrossRegion],
        },
        {
          label: "Failed",
          backgroundColor: "red",
          hoverBackgroundColor: "#B21F00",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          data: [totalFailedAcrossRegion],
        },
      ],
    };

    let chartData = {
      labels: lbuData,
      datasets: [
        {
          label: "Passed",
          backgroundColor: "#2FDE00",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "green",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: passedData,
        },
        {
          label: "Failed",
          backgroundColor: "red",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "#B21F00",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: failedData,
        },
      ],
    };
    return (
      <div className="stock-container">
        {/* <h3 id="title">Regression Report</h3> */}
        {/* <input
          style={{ width: "300px" }}
          type="text"
          placeholder="Search by Date, Environment"
          id="table_blog_title_filter"
          value={this.state.titleFilter}
          onChange={this.titleFilterHandler.bind(this)}
        /> */}
        {this.state.filteredData.length !== 0 ? (
          <div className="d-flex justify-content-center">
            <div>
              <Bar
                width={900}
                height={200}
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  title: {
                    display: true,
                    text:
                      "Regression Date:" +
                      this.state.defaultDate +
                      ", Environment:" +
                      this.state.defaultEnv,
                    fontSize: 15,
                  },
                  legend: {
                    display: false,
                    position: "right",
                  },
                  plugins: {
                    labels: {
                      render: "percentage",
                      fontColor: ["black", "black"],
                      precision: 2,
                    },
                  },
                }}
              />
            </div>
            <div>
              <Bar
                width={300}
                height={200}
                data={regionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  title: {
                    display: true,
                    text: "Region Status",
                    fontSize: 15,
                    position: "left",
                  },
                  legend: {
                    display: false,
                    position: "right",
                  },
                  plugins: {
                    labels: {
                      render: "percentage",
                      fontColor: ["black", "black"],
                      precision: 2,
                    },
                  },
                }}
              />
            </div>
          </div>
        ) : null}

        <table id="regression">
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Regression;
