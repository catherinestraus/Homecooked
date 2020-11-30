import React from "react";
import styled from "styled-components";
import firebase from "../firebase";
import berry from "../images/berry.png";

interface SignInPageProps {}
interface SignInPageState {}

class SignInPage extends React.Component<SignInPageProps, SignInPageState> {
  render() {
    return (
      <Container>
        <ContentContainer>
          <TitleContainer>
            <Title>Welcome to Homecooked!</Title>
            <Berry src={berry}></Berry>
          </TitleContainer>
          <Button
            onClick={() => {
              const provider = new firebase.auth.GoogleAuthProvider();

              firebase.auth().signInWithPopup(provider);
            }}
          >
            Sign in with Google
          </Button>
        </ContentContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  height: 25%;
`;

const TitleContainer = styled.div`
  display: flex;
`;

const Title = styled.div`
  font-size: 45px;
  font-weight: bold;
  color: white;
`;

const Berry = styled.img`
  height: 60px;
  width: 60px;
`;

const Button = styled.div`
  padding: 20px 40px;
  background-color: white;
  border-radius: 15px;
  font-size: 20px;
  color: #2b2d34;
  cursor: pointer;
`;

export default SignInPage;
