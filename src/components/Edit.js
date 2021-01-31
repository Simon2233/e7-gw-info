import { Card, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React from 'react';
import EditCharacter from './EditCharacter'
import PropTypes from 'prop-types';
import NOT_EDITING, { EDITING_TEAM1, EDITING_TEAM2 } from './Fort';
import Button from '@material-ui/core/Button';

Edit.propTypes = {
  teamInfo: PropTypes.object,
  setTeamInfo: PropTypes.func,
  setEditTeam: PropTypes.func,
}

export default function Edit(props) {
  const { teamInfo, setTeamInfo, setEditTeam } = props;
  return (
    <div>
      <Card elevation={3} style={{margin: "3vh", padding: "3vh"}}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField label="Player Name" variant="outlined" />
          </Grid>
          <Grid item>
            <TextField label="Your fastest speed" variant="outlined" />
          </Grid>
          <Grid item>
            <InputLabel>How many outsped your fastest?</InputLabel>
            <FormControl>
              <Select>
                <MenuItem value={undefined}></MenuItem>
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Team Info" multiline fullWidth />
          </Grid>
        </Grid>
      </Card>
      <EditCharacter characterInfo={teamInfo.character1} setCharacterInfo={(heroDetails) => setTeamInfo({...teamInfo, character1: heroDetails})} />
      <EditCharacter characterInfo={teamInfo.character2} setCharacterInfo={(heroDetails) => setTeamInfo({...teamInfo, character2: heroDetails})}  />
      <EditCharacter characterInfo={teamInfo.character3} setCharacterInfo={(heroDetails) => setTeamInfo({...teamInfo, character3: heroDetails})}  />
      <Button onClick={() => setEditTeam(null)}>Save</Button>
    </div>
  );
}