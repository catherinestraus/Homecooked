import React from "react";
import firebase from "../firebase";
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

interface SignInPageProps {}
interface SignInPageState {}

class SignInPage extends React.Component<SignInPageProps, SignInPageState> {
  render() {
    return (
      <Container>
        <div>Sign in page</div>

        <Button
          onClick={() => {
            const provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider);
          }}
        >
          Sign in with Google
        </Button>
      </Container>
    );
  }
}

export default SignInPage;
