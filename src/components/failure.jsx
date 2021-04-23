// import React, { Component } from "react";
import Select from "react-select";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

const Tree = ({ data = [] }) => {
  return (
    <div className="d-tree">
      <ul className="d-flex d-tree-container flex-column">
        {data.map((tree) => (
          <TreeNode node={tree} />
        ))}
      </ul>
    </div>
  );
};

const TreeNode = ({ node }) => {
  const [childVisible, setChildVisiblity] = useState(false);

  const hasChild = node.children ? true : false;

  let childLength = "";

  if (typeof node.children !== "undefined" && node.children.length > 0) {
    childLength = "[" + node.children.length + "]";
  }
  return (
    <li className="d-tree-node border-0">
      <div className="d-flex" onClick={(e) => setChildVisiblity((v) => !v)}>
        {hasChild && (
          <div
            className={`d-inline d-tree-toggler ${
              childVisible ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon={faCaretRight} />
          </div>
        )}

        <div className="col d-tree-head">
          <i className={"mr-1"}> </i>
          {node.label}
          {childLength}
        </div>
      </div>

      {hasChild && childVisible && (
        <div className="d-tree-content">
          <ul className="d-flex d-tree-container flex-column">
            <Tree data={node.children} />
          </ul>
        </div>
      )}
    </li>
  );
};

const Failure = (props) => {
  const { failureData } = props;
  const handleChangeDate = (selectedOption1) => {
    setSelectedOption1(selectedOption1);
    console.log(`Option selected:`, selectedOption1);
  };
  const dates = failureData.map((data) => {
    return { value: data.label, label: data.label };
  });

  const [selectedOption1, setSelectedOption1] = useState(dates[0]);

  let filteredData = failureData.filter((fData) => {
    if (
      typeof selectedOption1 !== "undefined" &&
      fData.label.toLowerCase().includes(selectedOption1.label.toLowerCase())
    ) {
      return fData;
    }
    return null;
  });

  return (
    <>
      <div className="stock-container">
        {/* <div className="row"> */}
        <div className="col text-left">
          <h3>Test Failure Analysis</h3>
          <div className="d-flex justify-content-left">
            <div className="col-sm-3">
              <Select
                defaultValue={selectedOption1}
                value={selectedOption1}
                onChange={handleChangeDate}
                options={dates}
              />
            </div>
          </div>
          <p className="mt-3">
            <div className="row mt-3 d-flex justify-content-left">
              <div className="col-lg-8 text-left text-dark">
                <Tree data={filteredData} />
              </div>
            </div>
          </p>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default Failure;

// class Failure extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedOption1: {},
//     };
//   }

//   componentWillReceiveProps(props) {
//     this.setState({
//       selectedOption1: {
//         value: props.failureData[0].date,
//         label: props.failureData[0].date,
//       },
//     });
//   }

//   handleChangeDate = (selectedOption1) => {
//     this.setState({ selectedOption1 });
//     console.log(`Option selected:`, selectedOption1);
//   };

//   Tree = ({ data }) => (
//     <ul>
//       {data &&
//         data.map((item) => (
//           <li>
//             {item.title}
//             {item.childNodes && <Tree data={item.childNodes} />}
//           </li>
//         ))}
//     </ul>
//   );

//   render() {
//     const { failureData } = this.props;
//     const dates = failureData.map((data) => {
//       return { value: data.date, label: data.date };
//     });

//     return (
//       <div className="stock-container">
//         <h3>Test Failure Analysis</h3>
//         <div className="d-flex justify-content-left">
//           <div className="col-sm-2">
//             <Select
//               defaultValue={this.state.selectedOption1}
//               value={this.state.selectedOption1}
//               onChange={this.handleChangeDate}
//               options={dates}
//             />

//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Failure;
