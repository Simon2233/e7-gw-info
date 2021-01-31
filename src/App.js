import { Container } from '@material-ui/core';
import React from 'react';
import Main from './components/Main.js'
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <Container maxWidth={"md"}>
        <Main />
      </Container>
    </div>
  );
}

export default App;
