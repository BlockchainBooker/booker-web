import React from "react";
import { SyncLoader } from "react-spinners";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  height: 100px;
  justify-content: center;
`;

const LoadingIndicator = ({ fullScreen = false }) => {
  if (fullScreen)
    return (
      <div style={{ position: "absolute", top: "50%", right: "50%" }}>
        <SyncLoader color={"#7171FF"} loading={true} />
      </div>
    );

  return (
    <Container>
      <SyncLoader size={8} color={"#7171FF"} loading={true} />
    </Container>
  );
};

export default LoadingIndicator;
