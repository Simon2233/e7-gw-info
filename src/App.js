import { Container } from '@material-ui/core';
import React from 'react';
import './App.css';
import Fort from './components/Fort'

function App() {
  return (
    <div className="App">
      <Container maxWidth={"md"}>
        <Fort />
      </Container>
    </div>
  );
}

export default App;
