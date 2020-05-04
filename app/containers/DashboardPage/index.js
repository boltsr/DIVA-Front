import React from 'react';
import AppBar from '../../components/AppBar';
import MainContainer from '../../components/MainContainer';

/* eslint-disable react/prefer-stateless-function */
class App extends React.PureComponent {
  render() {
    return (
      <div>
        <AppBar title="Dashboard" />
        <MainContainer>
          <div>Dashboard</div>
        </MainContainer>
      </div>
    );
  }
}

export default App;
