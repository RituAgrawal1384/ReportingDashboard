import React, { Component } from "react";
import Select from "react-select";
// import { lbus, apps } from "../data/dropdown";

// const groupStyles = {
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "space-between",
// };
// const groupBadgeStyles = {
//   backgroundColor: "#EBECF0",
//   borderRadius: "2em",
//   color: "#172B4D",
//   display: "inline-block",
//   fontSize: 12,
//   fontWeight: "normal",
//   lineHeight: "1",
//   minWidth: 6,
//   padding: "20px",
//   textAlign: "center",
// };

// const formatGroupLabel = (dropdown) => (
//   <div style={groupStyles}>
//     <span>{dropdown.label}</span>
//     <span style={groupBadgeStyles}>{dropdown.options.length}</span>
//   </div>
// );

class Main extends Component {
  // state = {
  //   selectedOption1: lbus[1],
  //   selectedOption2: apps[1],
  // };
  // handleChangeLbu = (selectedOption1) => {
  //   this.setState({ selectedOption1 });
  //   console.log(`Option selected:`, selectedOption1);
  // };

  // handleChangeApp = (selectedOption2) => {
  //   this.setState({ selectedOption2 });
  //   console.log(`Option selected:`, selectedOption2);
  // };

  render() {
    // const { selectedOption1 } = this.state.selectedOption1;
    // const { selectedOption2 } = this.state.selectedOption2;
    const {
      onLbuChange,
      onAppChange,
      selectedOption1,
      selectedOption2,
      lbuOptions,
      appOptions,
    } = this.props;
    return (
      <div className="d-flex justify-content-center">
        <div className="col-sm-4">
          <label>Lbu</label>
          <Select
            defaultValue={selectedOption1}
            // options={lbus}
            // formatGroupLabel={formatGroupLabel}
            value={selectedOption1}
            onChange={onLbuChange}
            options={lbuOptions}
          />
        </div>
        <div className="col-sm-4">
          <label>Application</label>
          <Select
            defaultValue={selectedOption2}
            // options={apps}
            // formatGroupLabel={formatGroupLabel}
            value={selectedOption2}
            onChange={onAppChange}
            options={appOptions}
          />
        </div>
      </div>
    );
  }
}

export default Main;
