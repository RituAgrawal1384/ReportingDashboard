import React, { Component } from "react";
// import React from "react";
import "../App.css";
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
      filteredData: props.regressionData1,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      filteredData: props.regressionData1,
    });
  }
  titleFilterHandler(e) {
    this.setState({
      titleFilter: e.target.value || "",
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    if (this.state.titleFilter !== prevState.titleFilter) {
      let filteredData = this.props.regressionData1.filter((step) => {
        if (
          step.date.toLowerCase().includes(this.state.titleFilter.toLowerCase())
        ) {
          return step;
        }
        return null;
      });
      this.setState({
        filteredData: filteredData,
      });
    }
  }
  renderTableData() {
    return this.state.filteredData.map((step, index) => {
      const {
        id,
        date,
        lbu,
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
      "Lbu",
      "Environment",
      "Execution Time (Hours)",
      "Total Scenarios",
      "Passed",
      "Failed",
      "Report",
    ];
    return header.map((key, index) => {
      return <th key={index}>{key}</th>;
    });
  }
  render() {
    return (
      <div className="stock-container">
        <h2 id="title">Regression Report</h2>
        <input
          style={{ width: "200px" }}
          type="text"
          placeholder="Search by Date"
          id="table_blog_title_filter"
          value={this.state.titleFilter}
          onChange={this.titleFilterHandler.bind(this)}
        />
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
