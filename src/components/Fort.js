import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import Edit from './Edit';
import TeamDisplay from './TeamDisplay';

Fort.propTypes = {
}

export const EDITING_TEAM1 = "EDITING_TEAM_1";
export const EDITING_TEAM2 = "EDITING_TEAM_2";

export default function Fort(props) {
  const [editTeam, setEditTeam] = useState(null);
  const [team1Info, setTeam1Info] = useState({character1: {}, character2: {}, character3: {}});
  const [team2Info, setTeam2Info] = useState({character1: {}, character2: {}, character3: {}});


  return (
    <div>
      {!editTeam && 
        <>
	  	    <Typography variant="h4">Team 1</Typography>
          <TeamDisplay setEditTeam={() => setEditTeam(EDITING_TEAM1)} teamInfo={team1Info} />
	  	    <Typography variant="h4">Team 2</Typography>
          <TeamDisplay setEditTeam={() => setEditTeam(EDITING_TEAM2)} teamInfo={team2Info} />
        </>
      }
      {editTeam === EDITING_TEAM1 &&
        <Edit teamInfo={team1Info} setTeamInfo={setTeam1Info} setEditTeam={setEditTeam} />
      }
      {editTeam === EDITING_TEAM2 &&
        <Edit teamInfo={team2Info} setTeamInfo={setTeam2Info} setEditTeam={setEditTeam} />
      }
    </div>
  );
}