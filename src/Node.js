import React from "react";
import "./Node.css";

export default class Node extends React.Component {
  render() {
    let extraClass = "";
    switch (this.props.type) {
      case 0:
        extraClass = "empty";
        break;
      case 1:
        extraClass = "square";
        break;
      case 2:
        extraClass = "topNode";
        break;
      case 3:
        extraClass = "bottomNode";
        break;
      case 4:
        extraClass = "leftNode";
        break;
      case 5:
        extraClass = "rightNode";
        break;
      default:
        break;
    }

    return (
      <div
        onMouseUp={this.props.handleMouseUp}
        onMouseDown={this.props.handleMouseDown}
        onMouseEnter={this.props.handleMouseEnter}
        className={`Node ${extraClass}`}></div>
    );
  }
}
