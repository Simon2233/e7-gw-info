import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import EditTeam from './EditTeam';
import TeamDisplay from './TeamDisplay';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as constants from '../constants';
import {editTeam} from '../redux/actions';
import Grid from '@material-ui/core/Grid';


Fort.propTypes = {
  fort: PropTypes.string,
}

export const EDITING_TEAM1 = "EDITING_TEAM_1";
export const EDITING_TEAM2 = "EDITING_TEAM_2";

function getValueRange(fort, range, value) {
  return ({
    range: `${fort}!${range}`,
    values: [[value]],
  });
}

const params = {
  spreadsheetId: '1l_UrwdZxNQfpJ0XwZKe0tYCi1R7TjHGJ1fEFa58h404',  
};

async function updateGoogleSheet(fort, team, teamInfo, name, gapi) {
  const startIndex = team === constants.TEAM_1 ? 6 : 58;
  
  const requestBody = {
    valueInputOption: "RAW",
    data: [
        getValueRange(fort, `B2`, name),

        getValueRange(fort, `B${startIndex+0}`, teamInfo[constants.YOUR_FASTEST_SPEED]),
        getValueRange(fort, `G${startIndex+0}`, teamInfo[constants.NUM_OUTSPED]),
      
        getValueRange(fort, `B${startIndex+3}`, teamInfo[constants.CHAR_1].heroDetails._id),
        getValueRange(fort, `E${startIndex+3}`, teamInfo[constants.CHAR_1].artifactDetails._id),
        getValueRange(fort, `G${startIndex+3}`, teamInfo[constants.CHAR_1].hp),
        getValueRange(fort, `H${startIndex+3}`, teamInfo[constants.CHAR_1].immunity),
        getValueRange(fort, `I${startIndex+3}`, teamInfo[constants.CHAR_1].cr),
        getValueRange(fort, `B${startIndex+4}`, teamInfo[constants.CHAR_1].notes),
      
        getValueRange(fort, `B${startIndex+6}`, teamInfo[constants.CHAR_2].heroDetails._id),
        getValueRange(fort, `E${startIndex+6}`, teamInfo[constants.CHAR_2].artifactDetails._id),
        getValueRange(fort, `G${startIndex+6}`, teamInfo[constants.CHAR_2].hp),
        getValueRange(fort, `H${startIndex+6}`, teamInfo[constants.CHAR_2].immunity),
        getValueRange(fort, `I${startIndex+6}`, teamInfo[constants.CHAR_2].cr),
        getValueRange(fort, `B${startIndex+7}`, teamInfo[constants.CHAR_2].notes),
      
        getValueRange(fort, `B${startIndex+9}`, teamInfo[constants.CHAR_3].heroDetails._id),
        getValueRange(fort, `E${startIndex+9}`, teamInfo[constants.CHAR_3].artifactDetails._id),
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


function Fort({ fort, fortInfo, editTeam, gapi }) {
  const [editingTeam, setEditingTeam] = useState(null);
  const team1Info = fortInfo[constants.TEAM_1];
  const team2Info = fortInfo[constants.TEAM_2];


  function getOnSaveFunc(team) {
    return (teamInfo, name) => {
      
      editTeam(fort, team, teamInfo, name);
      updateGoogleSheet(fort, team, teamInfo, name, gapi);
      setEditingTeam(null);
    }
  }

  function onCancel() {
    setEditingTeam(null);
  }

  function getSetEditingTeamFunc(editing_team) {
    return () => {
      if (!gapi) {
        console.log("no gapi", gapi)
        return;
      }

      const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get()
      if (!isSignedIn) {
        gapi.auth2.getAuthInstance().signIn();
        return;
      }

      setEditingTeam(editing_team)
    }
  }

  return (
    <div>
      {!editingTeam && 
        <>
          <Typography variant="h4">{fortInfo[constants.PLAYER_NAME]}</Typography>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <TeamDisplay label="Team 1" setEditingTeam={getSetEditingTeamFunc(EDITING_TEAM1)} teamInfo={team1Info} />
            </Grid>
            <Grid item md={6}>
              <TeamDisplay label="Team 2"  setEditingTeam={getSetEditingTeamFunc(EDITING_TEAM2)} teamInfo={team2Info} />
            </Grid>
          </Grid>
        </>
      }
      {editingTeam === EDITING_TEAM1 &&
        <EditTeam teamInfo={team1Info} playerName={fortInfo[constants.PLAYER_NAME]} onSave={getOnSaveFunc(constants.TEAM_1)} onCancel={onCancel}/>
      }
      {editingTeam === EDITING_TEAM2 &&
        <EditTeam teamInfo={team2Info} playerName={fortInfo[constants.PLAYER_NAME]} onSave={getOnSaveFunc(constants.TEAM_2)} onCancel={onCancel}/>
      }
    </div>
  );
}

const mapStateToProps = (state, props) => {
  return ({
    fortInfo: state.gwInfo[props.fort],
    gapi: state.gapi,
  });
}

export default connect(mapStateToProps, {editTeam})(Fort);