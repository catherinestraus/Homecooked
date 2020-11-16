import React from "react";
import { createGlobalStyle } from "styled-components";
import firebase from "../firebase";
import App from "./App";
import SignInPage from "./SignInPage";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Varela Round', sans-serif;
    color: white;
    position: relative;
    background-color: #2b2d34;
  }
  body.modal-open {
    overflow: hidden;
  }
  input {
    font-family: 'Varela Round', sans-serif;
    color: #2b2d34;
  }
  button {
    font-family: 'Varela Round', sans-serif;
    color: #2b2d34;
  }
`;

interface AuthenticatorProps {}

interface AuthenticatorState {
  isAuthenticated: boolean;
  loading: boolean;
}

class Authenticator extends React.Component<
  AuthenticatorProps,
  AuthenticatorState
> {
  constructor(props: AuthenticatorProps) {
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

    return (
      <div>
        <GlobalStyle />

        {this.state.isAuthenticated ? <App /> : <SignInPage />}
      </div>
    );
  }
}

export default Authenticator;
