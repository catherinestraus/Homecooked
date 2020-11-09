import React from "react";
import firebase from "../firebase.js";

class TestComponent extends React.Component {
  componentDidMount() {
    firebase
      .database()
      .ref("catherine")
      .on("value", (snapshot) => {
        console.log("data in snapshot: ", snapshot.val());
      });
  }
  render() {
    return <div>Something</div>;
  }
}

export default TestComponent;
