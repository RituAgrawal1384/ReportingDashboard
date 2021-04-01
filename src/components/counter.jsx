import React, { Component } from "react";

class Counter extends Component {
  state = {
    // value: this.props.counter.value,
    imageURL: "https://picsum.photos/200",
    tags: ["tag1", "tag2", "tag3"],
  };

  //updating phase
  componentDidUpdate(prevPros, prevState) {
    console.log("prevProps", prevPros);
    console.log("prevState", prevState);
    if (prevPros.counter.value !== this.props.value) {
      //Ajax call and get new data from server to update
    }
  }

  //unmountphase
  componentWillUnmount() {
    console.log("Counter Unmount/Deleted");
  }

  //   styles = {
  //     fontSize: 50,
  //     fontWeight: "bold",
  //   };

  //   constructor() {
  //     super();
  //     this.handleIncrement = this.handleIncrement.bind(this);
  //   }

  //as referring from parent components and not in local state anymore
  // handleIncrement = (product) => {
  //   console.log(product);
  //   this.setState({ value: this.state.value + 1 });
  // };

  render() {
    console.log("Counter rendered");
    return (
      <div>
        {this.props.children}
        {/* <img src={this.state.imageURL} alt="" /> */}
        <span style={{ fontSize: 30 }} className={this.getBadgeClasses()}>
          {this.formatCount()}
        </span>
        <button
          onClick={() => this.props.onIncrement(this.props.counter)}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        <button
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
        {/* {this.renderTags()}; */}
      </div>
    );
  }

  renderTags() {
    if (this.state.tags.length === 0) return <p>There are no tags.</p>;
    return (
      <ul>
        {this.state.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
}

export default Counter;
