import { Card, Container, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import EditCharacter from './EditCharacter';
import * as constants from '../constants'

EditTeam.propTypes = {
  teamInfo: PropTypes.object,
  onSave: PropTypes.func,
}

export default function EditTeam(props) {
  const [teamInfo, setTeamInfo] = useState(props.teamInfo);
  const { onSave } = props;

  function getOnChangeFunc(field) {
    return (e) => setTeamInfo({...teamInfo, [field]: e.target.value})
  }

  return (
    <Container maxWidth="md">
      <Card elevation={3} style={{margin: "3vh", padding: "3vh"}}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <div style={{display: 'flex'}}>
              <Typography>How fast was the fastest hero you brought?</Typography>
              <TextField style={{paddingLeft: "1em", width: "2.5em"}} variant="standard" onChange={getOnChangeFunc(constants.YOUR_FASTEST_SPEED)} />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{display: 'flex', alignContent: 'center'}}>
              <Typography>How many outsped your fastest?</Typography>
              <FormControl style={{paddingLeft: "1em"}}>
                <Select onChange={getOnChangeFunc(constants.NUM_OUTSPED)}>
                  <MenuItem value={""}></MenuItem>
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Notes" multiline fullWidth onChange={getOnChangeFunc(constants.NOTES)} />
          </Grid>
        </Grid>
      </Card>
      <EditCharacter charInfo={teamInfo[constants.CHAR_1]} setCharInfo={(heroDetails) => setTeamInfo({...teamInfo, [constants.CHAR_1]: heroDetails})} />
      <EditCharacter charInfo={teamInfo[constants.CHAR_2]} setCharInfo={(heroDetails) => setTeamInfo({...teamInfo, [constants.CHAR_2]: heroDetails})}  />
      <EditCharacter charInfo={teamInfo[constants.CHAR_3]} setCharInfo={(heroDetails) => setTeamInfo({...teamInfo, [constants.CHAR_3]: heroDetails})}  />
      <Button onClick={() => onSave(teamInfo)} variant="contained">Save</Button>
    </Container>
  );
}