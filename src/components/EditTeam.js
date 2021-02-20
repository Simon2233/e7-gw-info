import { Card, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getInitialTeamInfo } from '../structs';
import * as constants from '../constants';
import EditCharacter from './EditCharacter';
import {editTeam} from '../redux/actions';


function getValueRange(fort, range, value) {
  return ({
    range: `${fort}!${range}`,
    values: [[value]],
  });
}

const params = {
  spreadsheetId: '1l_UrwdZxNQfpJ0XwZKe0tYCi1R7TjHGJ1fEFa58h404',  
};

async function updateSheetTeam(fort, team, teamInfo, name, gapi) {
  const startIndex = team === constants.TEAM_1 ? 6 : 58;
  
  const requestBody = {
    valueInputOption: "RAW",
    data: [
        getValueRange(fort, `B2`, name),

        getValueRange(fort, `B${startIndex+0}`, teamInfo[constants.YOUR_FASTEST_SPEED]),
        getValueRange(fort, `G${startIndex+0}`, teamInfo[constants.NUM_OUTSPED]),
      
        getValueRange(fort, `B${startIndex+3}`, teamInfo[constants.CHAR_1].heroId),
        getValueRange(fort, `E${startIndex+3}`, teamInfo[constants.CHAR_1].artifactId),
        getValueRange(fort, `G${startIndex+3}`, teamInfo[constants.CHAR_1].hp),
        getValueRange(fort, `H${startIndex+3}`, teamInfo[constants.CHAR_1].immunity),
        getValueRange(fort, `I${startIndex+3}`, teamInfo[constants.CHAR_1].cr),
        getValueRange(fort, `B${startIndex+4}`, teamInfo[constants.CHAR_1].notes),
      
        getValueRange(fort, `B${startIndex+6}`, teamInfo[constants.CHAR_2].heroId),
        getValueRange(fort, `E${startIndex+6}`, teamInfo[constants.CHAR_2].artifactId),
        getValueRange(fort, `G${startIndex+6}`, teamInfo[constants.CHAR_2].hp),
        getValueRange(fort, `H${startIndex+6}`, teamInfo[constants.CHAR_2].immunity),
        getValueRange(fort, `I${startIndex+6}`, teamInfo[constants.CHAR_2].cr),
        getValueRange(fort, `B${startIndex+7}`, teamInfo[constants.CHAR_2].notes),
      
        getValueRange(fort, `B${startIndex+9}`, teamInfo[constants.CHAR_3].heroId),
        getValueRange(fort, `E${startIndex+9}`, teamInfo[constants.CHAR_3].artifactId),
        getValueRange(fort, `G${startIndex+9}`, teamInfo[constants.CHAR_3].hp),
        getValueRange(fort, `H${startIndex+9}`, teamInfo[constants.CHAR_3].immunity),
        getValueRange(fort, `I${startIndex+9}`, teamInfo[constants.CHAR_3].cr),
        getValueRange(fort, `B${startIndex+10}`, teamInfo[constants.CHAR_3].notes),
    ]
  } 

  try {
    const request = gapi.client.sheets.spreadsheets.values.batchUpdate(params, requestBody)
    
    request.then(function(response) {
      // TODO: Change code below to process the `response` object:
      console.log(response.result);
    }, function(reason) {
      console.error('error: ' + reason.result.error.message);
    });
  } catch(err) {
    console.log("Failed sheets request", err)
  }
}


EditTeam.propTypes = {
  team: PropTypes.string,
  fort: PropTypes.string,
  onExit: PropTypes.func,
}

function EditTeam(props) {
  const [teamInfo, setTeamInfo] = useState(props.teamInfo);
  const [playerName, setPlayerName] = useState(props.playerName);
  const { fort, team, onExit, gapi, editTeam } = props;

  function clearInfo() {
    setTeamInfo(getInitialTeamInfo());
    setPlayerName("")
  }

  function onSave() {
    editTeam(fort, team, teamInfo, playerName);
    updateSheetTeam(fort, team, teamInfo, playerName, gapi);
    onExit()
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
      <Button onClick={onSave} variant="contained">Save</Button>
      <Button style={{marginLeft: "3px"}} onClick={onExit} variant="contained">Cancel</Button>
    </>
  );
}

const mapStateToProps = (state, props) => {
  return ({
    playerName: state.gwInfo[props.fort][constants.PLAYER_NAME],
    teamInfo: state.gwInfo[props.fort][props.team],
    gapi: state.gapi,
  });
}

export default connect(mapStateToProps, {editTeam})(EditTeam);