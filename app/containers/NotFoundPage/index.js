import React from 'react';
import { FormattedMessage } from 'react-intl';
import Pacman from 'pacman-react';
import styled from 'styled-components';

import messages from './messages';
import PressStart2Play from './PressStart2Play.ttf';

const Container = styled.div`
  @font-face {
    font-family: PressStart2Play;
    src: url('${PressStart2Play}') format('opentype');
  }
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #000;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;

const Title = styled.h1`
  font-family: 'PressStart2Play';
  font-size: 4em;
  color: #ffffff;
  margin-top: 50px;
`;

const Description = styled.div`
  font-family: 'PressStart2Play';
  font-size: 1.1em;
  color: #ffffff;
  margin-bottom: 50px;
`;

/* eslint-disable react/prefer-stateless-function */
class NotFound extends React.PureComponent {
  render() {
    return (
      <Container>
        <Title>
          <FormattedMessage {...messages.title} />
        </Title>
        <Description>
          <FormattedMessage {...messages.description} />
        </Description>
        <Pacman gridSize={12} />
      </Container>
    );
  }
}

export default NotFound;
