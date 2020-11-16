import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 0.6;
  }
`;

const BlackBackground = styled.div`
  z-index: 1;
  position: fixed;
  overflow: hidden;
  overflow-y: hidden;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: rgb(34, 34, 34, 0.6);

  display: flex;
  justify-content: center;
  align-items: center;

  animation-name: ${fadeIn};
  animation-timing-function: ease-in;
  animation-duration: 0.5s;
`;

const slideUp = keyframes`
  0% {
    bottom: -300px;
    opacity: 0;
  }

  100% {
    bottom: 0px;
    opacity: 1;
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.28) 0px 8px 28px;
  width: 1140px;
  height: calc(100% - 80px);
  overflow-y: scroll;
  @media (max-width: 1220px) {
    width: calc(100% - 80px);
  }
  @media (max-width: 730px) {
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: 0px;
  }

  animation-name: ${slideUp};
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
`;

const Header = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  box-sizing: border-box;
  padding: 15px 24px 15px 24px;
  width: 950px;
  height: 72px;
`;

const CloseContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33px;
  height: 33px;
  border-radius: 50%;
  &:hover {
    background-color: rgb(247, 247, 247);
  }
`;

const Close = styled.div`
  color: #2b2d34;
  cursor: pointer;
  @media (max-width: 730px) {
    display: none;
  }
`;

const ArrowClose = styled.div`
  cursor: pointer;
  @media (min-width: 730px) {
    display: none;
  }
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 0px 0px 0px 30px;

  @media (max-width: 1220px) {
    flex-direction: column;
    overflow-y: scroll;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 40%;

  @media (max-width: 450px) {
    width: 100%;
    height: 30%;
  }

  @media (max-width: 1220px) {
    width: 100%;
  }
`;

const RightContainer = styled(LeftContainer)`
  justify-content: end;
  width: 60%;
  padding: 0px 5% 0px 0px;

  @media (max-width: 1220px) {
    width: 95%;
  }

  @media (min-width: 1220px) {
    overflow-y: scroll;
  }
`;

interface ModalProps {
  close: () => void;
}

interface ModalState {}

class Modal extends React.Component<ModalProps, ModalState> {
  constructor(props: ModalProps) {
    super(props);

    this.state = {
      bookings: [],
    };
  }

  componentDidMount() {
    document.body.classList.add("modal-open");
  }

  componentWillUnmount() {
    document.body.classList.remove("modal-open");
  }

  render() {
    return (
      <BlackBackground>
        <Container>
          <Header>
            <CloseContainer>
              <Close
                onClick={() => {
                  this.props.close();
                }}
              >
                ✕
              </Close>
              <ArrowClose
                onClick={() => {
                  this.props.close();
                }}
              >
                ＜
              </ArrowClose>
            </CloseContainer>
          </Header>

          <Content>{this.props.children}</Content>
        </Container>
      </BlackBackground>
    );
  }
}

export default Modal;
