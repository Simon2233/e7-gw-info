import { Container } from '@material-ui/core';
import React from 'react';
import Fort from './components/Fort'
import InfoDisplay from './components/InfoDisplay.js'
import TabDisplay from './components/TabDisplay.js'
import GoogleSheet from './components/GoogleSheet.js'
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <Container maxWidth={"md"}>
        <Fort />
        <TabDisplay></TabDisplay>
        <GoogleSheet></GoogleSheet>
      </Container>
    </div>
  );
}

export default App;
