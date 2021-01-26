import { Card, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import Edit from './Edit'

Fort.propTypes = {
}


const NOT_EDITING = "NOT_EDITING";
const EDITING_TEAM1 = "EDITING_TEAM_1";
const EDITING_TEAM2 = "EDITING_TEAM_1";

export default function Fort(props) {
  // TODO: Toggle this state based on what is being edited
  const [edit, setEdit] = useState(EDITING_TEAM1);
  const [team1Info, setTeam1Info] = useState({character1: {}, character2: {}, character3: {}});
  const [team2Info, setTeam2Info] = useState({});

  return (
    <div>
      {/* {edit !== NOT_EDITING && */} 
        <Edit teamInfo={team1Info} setTeamInfo={setTeam1Info} />
      {/* } */}
    </div>
  );
}