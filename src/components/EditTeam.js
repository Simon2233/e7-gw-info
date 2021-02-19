import { Card, Container, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import EditCharacter from './EditCharacter';
import * as constants from '../constants'
import {initialTeamInfo} from '../redux/reducers/gwInfo'

EditTeam.propTypes = {
  teamInfo: PropTypes.object,
  playerName: PropTypes.string,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
}

export default function EditTeam(props) {
  const [teamInfo, setTeamInfo] = useState(props.teamInfo);
  const [playerName, setPlayerName] = useState(props.playerName);
  const { onSave, onCancel } = props;

  function clearInfo() {
    setTeamInfo(initialTeamInfo);
    setPlayerName("")
  }

  function getOnChangeFunc(field) {
    return (e) => setTeamInfo({...teamInfo, [field]: e.target.value})
  }

  return (
    <>
      <Button style={{marginLeft: "3px"}} fullWidth onClick={clearInfo} variant="contained">Clear all</Button>
      <Card elevation={1} style={{margin: "1vh", padding: "3vh"}}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <div style={{display: 'flex'}}>
              <Typography>Name</Typography>
              <TextField value={playerName} style={{paddingLeft: "1em"}} variant="standard" onChange={(e) => setPlayerName(e.target.value)} />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{display: 'flex'}}>
              <Typography>What SPD is the fastest hero you brought?</Typography>
              <TextField value={teamInfo[constants.YOUR_FASTEST_SPEED]} style={{paddingLeft: "1em", width: "3em"}} variant="standard" onChange={getOnChangeFunc(constants.YOUR_FASTEST_SPEED)} />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{display: 'flex', alignContent: 'center'}}>
              <Typography>How many outsped your fastest hero?</Typography>
              <FormControl style={{paddingLeft: "1em"}}>
                <Select onChange={getOnChangeFunc(constants.NUM_OUTSPED)} value={teamInfo[constants.NUM_OUTSPED]}>
                  <MenuItem value={""}></MenuItem>
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Grid>
        </Grid>
      </Card>
      <Card elevation={1} style={{margin: "1vh", padding: "3vh"}}>
        <EditCharacter charInfo={teamInfo[constants.CHAR_1]} setCharInfo={(heroDetails) => setTeamInfo({...teamInfo, [constants.CHAR_1]: heroDetails})} />
      </Card>
      <Card elevation={1} style={{margin: "1vh", padding: "3vh"}}>
        <EditCharacter charInfo={teamInfo[constants.CHAR_2]} setCharInfo={(heroDetails) => setTeamInfo({...teamInfo, [constants.CHAR_2]: heroDetails})}  />
      </Card>
      <Card elevation={1} style={{margin: "1vh", padding: "3vh"}}>
        <EditCharacter charInfo={teamInfo[constants.CHAR_3]} setCharInfo={(heroDetails) => setTeamInfo({...teamInfo, [constants.CHAR_3]: heroDetails})}  />
      </Card>
      <Button onClick={() => onSave(teamInfo, playerName)} variant="contained">Save</Button>
      <Button style={{marginLeft: "3px"}} onClick={onCancel} variant="contained">Cancel</Button>
    </>
  );
}