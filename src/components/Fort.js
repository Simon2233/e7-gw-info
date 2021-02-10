import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import EditTeam from './EditTeam';
import TeamDisplay from './TeamDisplay';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TEAM_1, TEAM_2, PLAYER_NAME } from '../constants';
import {editTeam} from '../redux/actions';
import Grid from '@material-ui/core/Grid';

Fort.propTypes = {
  fort: PropTypes.string,
}

export const EDITING_TEAM1 = "EDITING_TEAM_1";
export const EDITING_TEAM2 = "EDITING_TEAM_2";

function Fort({ fort, fortInfo, editTeam }) {
  const [editingTeam, setEditingTeam] = useState(null);
  const team1Info = fortInfo[TEAM_1];
  const team2Info = fortInfo[TEAM_2];


  function getOnSaveFunc(team) {
    return teamInfo => {
      editTeam(fort, team, teamInfo);
      setEditingTeam(null);
    }
  }

  return (
    <div>
      <Typography variant="h3">{fortInfo[PLAYER_NAME]}</Typography>
      {!editingTeam && 
        <Grid container spacing={2}>
          <Grid item md={6}>
            <TeamDisplay label="Team 1" setEditingTeam={() => setEditingTeam(EDITING_TEAM1)} teamInfo={team1Info} />
          </Grid>
          <Grid item md={6}>
            <TeamDisplay label="Team 2"  setEditingTeam={() => setEditingTeam(EDITING_TEAM2)} teamInfo={team2Info} />
          </Grid>
        </Grid>
      }
      {editingTeam === EDITING_TEAM1 &&
        <EditTeam teamInfo={team1Info} onSave={getOnSaveFunc(TEAM_1)} />
      }
      {editingTeam === EDITING_TEAM2 &&
        <EditTeam teamInfo={team2Info} onSave={getOnSaveFunc(TEAM_2)} />
      }
    </div>
  );
}

const mapStateToProps = (state, props) => {
  return ({
    fortInfo: state.main[props.fort]
  });
}

export default connect(mapStateToProps, {editTeam})(Fort);