import { Container } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import React, { useState } from 'react';
import Fort from './components/Fort';
import GoogleSheet from './components/GoogleSheet.js';
import * as constants from './constants';

function App() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <GoogleSheet />
      <Container>
        <div>
          <TabContext value={value}>
            <TabList onChange={handleChange} centered indicatorColor="primary" textColor="primary" style={{backgroundColor: "rgba(0,0,0,0.05)"}}>
              <Tab label="Left" value="1" disableRipple style={{fontSize: "bold"}}/>
              <Tab label="Middle" value="2" disableRipple style={{fontSize: "bold"}}/>
              <Tab label="Right" value="3" disableRipple style={{fontSize: "bold"}}/>
              <Tab label="Stronghold" value="4" disableRipple style={{fontSize: "bold"}}/>
            </TabList>
            <TabPanel value="1"><Fort fort={constants.LEFT_FORTRESS}/></TabPanel>
            <TabPanel value="2"><Fort fort={constants.MIDDLE_FORTRESS}/></TabPanel>
            <TabPanel value="3"><Fort fort={constants.RIGHT_FORTRESS}/></TabPanel>
            <TabPanel value="4"><Fort fort={constants.STRONGHOLD}/></TabPanel>
          </TabContext>
        </div>
      </Container>
    </div>
  );
}

export default App;
