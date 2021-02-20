import { Container, Tabs } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import React, { useEffect, useState } from 'react';
import Fort from './components/Fort';
import * as constants from './constants';
import SwipeableViews from 'react-swipeable-views';
import {initGapi} from './redux/actions'
import { connect } from 'react-redux';
import GoogleSheet from './components/GoogleSheet'
import EpicSevenApi from './components/EpicSevenApi'

function App({initGapi}) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    initGapi(window.gapi);
  }, [])

  return (
    <div className="App">
      <GoogleSheet />
      <EpicSevenApi />
      <Container maxWidth={'md'} disableGutters>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          style={{backgroundColor: "#f7fafc", position: "sticky", top: "0px", width: "100%", marginBottom: "10px", zIndex: "1299"}}
          centered
        >
          <Tab label="Left" disableRipple style={{fontSize: "bold"}}/>
          <Tab label="Middle" disableRipple style={{fontSize: "bold"}}/>
          <Tab label="Right" disableRipple style={{fontSize: "bold"}}/>
          <Tab label="Stronghold" disableRipple style={{fontSize: "bold"}}/>
        </Tabs>
        <SwipeableViews
          axis={'x'}
          index={value}
          onChangeIndex={(index) => {
            setValue(index) 
          }}
        >
          <div style={{overflow: 'hidden', padding: '10px'}}><Fort fort={constants.LEFT_FORTRESS}/></div>
          <div style={{overflow: 'hidden', padding: '10px'}}><Fort fort={constants.MIDDLE_FORTRESS}/></div>
          <div style={{overflow: 'hidden', padding: '10px'}}><Fort fort={constants.RIGHT_FORTRESS}/></div>
          <div style={{overflow: 'hidden', padding: '10px'}}><Fort fort={constants.STRONGHOLD}/></div>
        </SwipeableViews>
      </Container>
    </div>
  );
}

export default connect(null, {initGapi})(App);
