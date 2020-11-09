import React from "react";
import firebase from "../firebase.js";
import SignInPage from "./SignInPage.jsx";
import App from "./App.jsx";

class Authenticator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      loading: true,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userRef = firebase.database().ref(`users/${user.uid}`);
        userRef.once("value", (snapshot) => {
          const dbUser = snapshot.val();

          if (!dbUser) {
            userRef.set({
              uid: user.uid,
              name: user.displayName,
              email: user.email,
            });
          }
        });
        this.setState({
          isAuthenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          isAuthenticated: false,
          loading: false,
        });
      }
    });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading</div>;
    }
    if (this.state.isAuthenticated) {
      return <App />;
    }

    return <SignInPage />;
  }
}

export default Authenticator;
