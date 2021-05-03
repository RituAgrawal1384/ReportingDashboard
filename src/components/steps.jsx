import React, { Component } from "react";
import FlashMessage from "react-flash-message";
// import Blink from "react-blink-text";
// import Pagination from "react-bootstrap/Pagination";
class Steps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPageNumber: 1,
      numItemsPerPage: 20,
      titleFilter: "",
      reverse: false,
      sortBy: "",
      direction: "asc",
      filteredData: props.stepsData,
      latestLBU: props.latestDateLbu,
      latestDate: props.latestDate,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      filteredData: props.stepsData,
      latestLBU: props.latestDateLbu,
      latestDate: props.latestDate,
    });
  }

  handleSelect(number) {
    console.log("handle select", number);
    this.setState({ currentPageNumber: number });
  }

  titleFilterHandler(e) {
    this.setState({
      titleFilter: e.target.value || "",
    });
  }

  onSort(sortBy, direction) {
    this.setState({
      sortBy,
      direction,
    });
  }

  sortingHandler(sortBy) {
    this.setState({
      sortBy: sortBy,
      reverse: !this.state.reverse,
    });
    this.onSort(sortBy, this.state.reverse ? "desc" : "asc");
  }

  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    if (this.state.titleFilter !== prevState.titleFilter) {
      let filteredData = this.props.stepsData.filter((step) => {
        if (
          step.name
            .toLowerCase()
            .includes(this.state.titleFilter.toLowerCase()) ||
          step.time >= parseFloat(this.state.titleFilter)
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
      const { id, name, time } = step; //destructuring
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{time}</td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    let header = ["Id", "Name", "Avg Time in Sec"];
    return header.map((key, index) => {
      return (
        <th key={index} onClick={() => this.sortingHandler("bp." + { key })}>
          {key}
        </th>
      );
    });
  }

  render() {
    // let totalPages = Math.ceil(
    //   this.props.stepsData / this.state.numItemsPerPage
    // );
    return (
      <div className="stock-container">
        <div className="app-access">
          <FlashMessage duration={10000} persistOnHover={true}>
            <p>
              Please change Application/LBU to see steps specific for
              Application/LBU
            </p>
          </FlashMessage>
          {/* <Blink
            color="red"
            text="Please change Application/LBU to see steps specific for
              Application/LBU"
            fontSize="20"
          >
            Testing the Blink
          </Blink> */}
        </div>
        <h3 id="title">
          Total Steps: {Object.keys(this.state.filteredData).length}
        </h3>
        <h6>Date: {this.state.latestDate}</h6>
        <h6>LBU: {this.state.latestLBU}</h6>
        <input
          style={{ width: "400px" }}
          type="text"
          placeholder="Search by Name"
          id="table_blog_title_filter"
          value={this.state.titleFilter}
          onChange={this.titleFilterHandler.bind(this)}
        />
        <table id="steps">
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>

        {/* <Pagination
          bsSize="medium"
          items={totalPages}
          activePage={this.state.currentPageNumber}
          onSelect={this.handleSelect.bind(this)}
        /> */}
      </div>
    );
  }
}

export default Steps;
