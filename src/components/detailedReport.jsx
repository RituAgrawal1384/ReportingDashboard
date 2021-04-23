import React, { Component } from "react";
import { Table } from "react-bootstrap";
import Select from "react-select";

class DetailedReport extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      reverse: false,
      currentPageNumber: 1,
      numItemsPerPage: 20,
      titleFilter: "",
      envFilter: "",
      reportData: props.reportData,
      filteredData: [],
      featureData: [],
      selectedOption1: props.reportDate[0],
      dates: props.reportDate,
      overallstatus: "",
      totalFeatures: 0,
      overallExetime: 0,
      totalSCCount: 0,
      totalSCPassedCount: 0,
      totalSCFailedCount: 0,
      totalStepCount: 0,
      totalStepPassedCount: 0,
      totalStepFailedCount: 0,
      totalStepSkippedCount: 0,
    };
  }

  handleChangeDate = (selectedOption1) => {
    this.setState({ selectedOption1 });
    console.log(`Option selected:`, selectedOption1);
  };

  componentWillReceiveProps(props) {
    // let dates = props.reportData.map((data) => {
    //   return { value: data.label, label: data.label };
    // });
    this.setState({
      reportData: props.reportData,
      dates: props.reportDate,
      selectedOption1: props.reportDate[0],
    });

    let data = [];
    props.reportData.filter((fData) => {
      if (
        typeof props.reportDate[0] !== "undefined" &&
        fData.label
          .toLowerCase()
          .includes(props.reportDate[0].label.toLowerCase())
      ) {
        data = fData.children;
      }
      return data;
    });

    this.getOverAllExecutionDetails(data);

    this.setState({
      filteredData: data,
      featureData: data,
    });
  }

  getOverAllExecutionDetails(data) {
    let sum = 0;
    this.setState({ overallstatus: "" });
    if (data.length !== 0) {
      data.some((code) => code.status === "Failed")
        ? this.setState({ overallstatus: "Failed" })
        : this.setState({ overallstatus: "Passed" });

      this.setState({ totalFeatures: data.length });
      sum = data.reduce(function(a, b) {
        return {
          exectime: (parseFloat(a.exectime) + parseFloat(b.exectime)).toFixed(
            2
          ),
          totalscenarios:
            parseFloat(a.totalscenarios) + parseFloat(b.totalscenarios),
          scPassed: parseFloat(a.scPassed) + parseFloat(b.scPassed),
          scFailed: parseFloat(a.scFailed) + parseFloat(b.scFailed),
          totalsteps: parseFloat(a.totalsteps) + parseFloat(b.totalsteps),
          stepPassed: parseFloat(a.stepPassed) + parseFloat(b.stepPassed),
          stepFailed: parseFloat(a.stepFailed) + parseFloat(b.stepFailed),
          stepSkipped: parseFloat(a.stepSkipped) + parseFloat(b.stepSkipped),
        };
      });
    }

    this.setState({
      overallExetime: sum.exectime,
      totalSCCount: sum.totalscenarios,
      totalSCPassedCount: sum.scPassed,
      totalSCFailedCount: sum.scFailed,
      totalStepCount: sum.totalsteps,
      totalStepPassedCount: sum.stepPassed,
      totalStepFailedCount: sum.stepFailed,
      totalStepSkippedCount: sum.stepSkipped,
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
    if (this.state.selectedOption1 !== prevState.selectedOption1) {
      let data = [];
      this.props.reportData.filter((fData) => {
        if (
          typeof this.state.selectedOption1.label !== "undefined" &&
          fData.label
            .toLowerCase()
            .includes(this.state.selectedOption1.label.toLowerCase())
        ) {
          data = fData.children;
        }
        return data;
      });
      this.getOverAllExecutionDetails(data);

      this.setState({
        filteredData: data,
        featureData: data,
      });
    }
    if (this.state.titleFilter !== prevState.titleFilter) {
      let filteredfeatureData = this.state.filteredData.filter((step) => {
        if (
          step.name.toLowerCase().includes(this.state.titleFilter.toLowerCase())
        ) {
          return step;
        }
        return null;
      });

      this.setState({
        featureData: filteredfeatureData,
      });

      this.getOverAllExecutionDetails(filteredfeatureData);
    }
  }
  renderTableData() {
    return this.state.featureData.map((step, index) => {
      const {
        id,
        name,
        tag,
        status,
        exectime,
        totalscenarios,
        scPassed,
        scFailed,
        totalsteps,
        stepPassed,
        stepFailed,
        stepSkipped,
      } = step; //destructuring
      return (
        <tr key={id}>
          {/* <td>{id}</td> */}
          <td>{name}</td>
          <td>{tag}</td>
          <td>{status}</td>
          <td>{exectime}</td>
          <td>{totalscenarios}</td>
          <td>{scPassed}</td>
          <td>{scFailed}</td>
          <td>{totalsteps}</td>
          <td>{stepPassed}</td>
          <td>{stepFailed}</td>
          <td>{stepSkipped}</td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    let header = [
      "Feature Name",
      "Tag",
      "Status",
      "Duration (Hours)",
      "Total Scenarios",
      "Passed",
      "Failed",
      "Total Steps",
      "Passed",
      "Failed",
      "Skipped",
    ];
    return header.map((key, index) => {
      if (key === "Feature Name") {
        return (
          <th key={index}>
            {"Feature Name"}
            <input
              style={{ width: "400" }}
              type="text"
              placeholder="Search"
              id={index}
              value={this.state.titleFilter}
              onChange={this.titleFilterHandler.bind(this)}
            />
          </th>
        );
      } else {
        return <th key={index}>{key}</th>;
      }
    });
  }
  render() {
    return (
      <div className="stock-container">
        <h2 id="title"> Detailed Report</h2>
        <div className="col-sm-3">
          <Select
            defaultValue={this.state.selectedOption1}
            value={this.state.selectedOption1}
            onChange={this.handleChangeDate}
            options={this.state.dates}
          />
        </div>
        <h2 id="junk"> </h2>

        <div>
          <Table id="detailed" classname="w-auto" striped bordered hover>
            <thead>
              <tr>{this.renderTableHeader()}</tr>
            </thead>
            <tbody>
              <tr
                key={"-1"}
                style={{ backgroundColor: "grey", fontWeight: "bold" }}
              >
                <td>
                  {"Overall Status (Feature Count:" +
                    this.state.totalFeatures +
                    ")"}
                </td>
                <td>{}</td>
                <td
                  style={
                    this.state.overallstatus === "Passed"
                      ? { backgroundColor: "green" }
                      : this.state.overallstatus === "Failed"
                      ? { backgroundColor: "red" }
                      : { backgroundColor: "grey" }
                  }
                >
                  {this.state.overallstatus}
                </td>
                <td>{this.state.overallExetime}</td>
                <td>{this.state.totalSCCount}</td>
                <td>{this.state.totalSCPassedCount}</td>
                <td>{this.state.totalSCFailedCount}</td>
                <td>{this.state.totalStepCount}</td>
                <td>{this.state.totalStepPassedCount}</td>
                <td>{this.state.totalStepFailedCount}</td>
                <td>{this.state.totalStepSkippedCount}</td>
              </tr>
              {this.renderTableData()}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default DetailedReport;
