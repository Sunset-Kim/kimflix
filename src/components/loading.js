import React, { Component } from 'react';
import styled from 'styled-components';
import { ReactComponent as Spinner } from 'assets/spinner.svg';

const Container = styled.div`
position: absolute;
left: 0;
top: 0;
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`

class Loading extends Component {
  render() {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }
}

export default Loading;