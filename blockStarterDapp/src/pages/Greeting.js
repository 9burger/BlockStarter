import React, { Component } from "react";

class Greeting extends Component {
  render() {
    const imgStyle = {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width: "50%"
    };

    return (
      <div>
        <br />
        <h2 style={{ color: "DarkBlue", textAlign: "center" }}>
          {" "}
          Welcome to <b> BlockStarter! </b>
        </h2>
        <br />
        <img src="static/images/CoverBlock.jpg" style={imgStyle} width="400px" alt="CoverBlock.jpeg cannot be found" />
        <br /> <br />
        <p style={{ textAlign: "center" }}>
          This Project by Sawyer, Max, and Moise allows the user to create or fund fundraisers annonymously
          using ethereum.
          <br /> You have the option to change the name of your campaign, refund money to supporters and more.
          <br /> Once your campaign has raised its goal, you automatically recieve the amount donated.
          
        </p>
      </div>
    );
  }
}

export default Greeting;
