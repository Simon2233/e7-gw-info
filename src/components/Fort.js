import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import EditTeam from './EditTeam';
import TeamDisplay from './TeamDisplay';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as constants from '../constants';
import {editTeam} from '../redux/actions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

Fort.propTypes = {
  fort: PropTypes.string,
}

export const EDITING_TEAM1 = "EDITING_TEAM_1";
export const EDITING_TEAM2 = "EDITING_TEAM_2";

function Fort({ fort, playerName, gapi }) {
  const [editingTeam, setEditingTeam] = useState(null);

  function onExitEdit() {
    setEditingTeam(null);
  }

  function getSetEditingTeamFunc(editing_team) {
    return () => {
      if (!gapi) {
        console.log("GAPI not initialized", gapi)
        return;
      }

      if (!gapi.auth2) {
        console.log("GAPI auth2 not initialized", gapi.auth2)
        return;
      }

      const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
      if (!isSignedIn) {
        gapi.auth2.getAuthInstance().signIn({
          ux_mode: "redirect",
        });
        return;
      }

      setEditingTeam(editing_team)
    }
  }

  return (
    <div>
      {!editingTeam && 
        <>
          <Typography variant="h4">{playerName}</Typography>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <TeamDisplay setEditingTeam={getSetEditingTeamFunc(EDITING_TEAM1)} fort={fort} team={constants.TEAM_1}/>
            </Grid>
            <Grid item md={6}>
              <TeamDisplay setEditingTeam={getSetEditingTeamFunc(EDITING_TEAM2)} fort={fort} team={constants.TEAM_2}/>
            </Grid>
          </Grid>
        </>
      }
      {editingTeam === EDITING_TEAM1 &&
        <EditTeam fort={fort} team={constants.TEAM_1} onExit={onExitEdit} />
      }
      {editingTeam === EDITING_TEAM2 &&
        <EditTeam fort={fort} team={constants.TEAM_2} onExit={onExitEdit} />
      }
      <Button size="small"  onClick={() => gapi.auth2.getAuthInstance().signOut()}>Sign out</Button>
    </div>
  );
}

const mapStateToProps = (state, props) => {
  return ({
    playerName: state.gwInfo[props.fort][constants.PLAYER_NAME],
    gapi: state.gapi,
  });
}

export default connect(mapStateToProps, {editTeam})(Fort);