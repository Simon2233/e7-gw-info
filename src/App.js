import { Container } from '@material-ui/core';
import React, { useState } from 'react';
import Fort from './components/Fort'
import TabDisplay from './components/TabDisplay.js'
import GoogleSheet from './components/GoogleSheet.js'
import logo from './logo.svg';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import * as constants from './constants'

function App() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <Container maxWidth={"md"}>
        <div>
          <TabContext value={value}>
            <TabList onChange={handleChange} centered >
              <Tab label="Left" value="1" />
              <Tab label="Middle" value="2" />
              <Tab label="Right" value="3" />
              <Tab label="Stronghold" value="4" />
            </TabList>
            <TabPanel value="1"><Fort fort={constants.LEFT_FORTRESS}/></TabPanel>
            <TabPanel value="2"><Fort fort={constants.MIDDLE_FORTRESS}/></TabPanel>
            <TabPanel value="3"><Fort fort={constants.RIGHT_FORTRESS}/></TabPanel>
            <TabPanel value="4"><Fort fort={constants.STRONGHOLD}/></TabPanel>
          </TabContext>
        </div>
        {/* <Fort /> */}
        {/* <TabDisplay></TabDisplay> */}
        {/* <GoogleSheet></GoogleSheet> */}
      </Container>
    </div>
  );
}

export default App;
