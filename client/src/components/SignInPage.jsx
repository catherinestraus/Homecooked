import React from "react";
import firebase from "../firebase.js";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-centents: center;
  align-items: center;
`;

const Button = styled.div`
  padding: 10px 20px;
  background-color: blue;
`;

class SignInPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <div>Sign in page</div>

        <Button
          onClick={() => {
            const provider = new firebase.auth.GoogleAuthProvider();

            firebase
              .auth()
              .signInWithPopup(provider)
              .then(function (result) {
                const user = result.user;

                console.log("authentication", user.uid, token);
              })
              .catch(function (error) {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                const credential = error.credential;
                // ...
              });
          }}
        >
          Sign in with Google
        </Button>
      </Container>
    );
  }
}

export default SignInPage;
