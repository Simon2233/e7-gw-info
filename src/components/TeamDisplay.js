import { IconButton, Paper, useMediaQuery } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import * as constants from '../constants';
import HeroInfo from './HeroInfo';
import EditIcon from '@material-ui/icons/Edit';

TeamDisplay.propTypes = {
	setEditingTeam: PropTypes.func,
  teamInfo: PropTypes.object,
  label: PropTypes.string,
}

export default function TeamDisplay(props) {
  const { setEditingTeam, teamInfo, label } = props;

  const content = (
    <>
      <div style={{display: 'flex'}}>
        {/* <Typography variant="h5">{label}</Typography> */}
        {/* <IconButton onClick={setEditingTeam} variant="contained"><EditIcon /></IconButton> */}
      </div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <HeroInfo charInfo={teamInfo[constants.CHAR_1]} />
        </Grid>
        <Grid item xs={12}>
          <HeroInfo charInfo={teamInfo[constants.CHAR_2]} />
        </Grid>
        <Grid item xs={12}>
          <HeroInfo charInfo={teamInfo[constants.CHAR_3]} />
        </Grid>
      </Grid>
    </>
  )

  // const isSmallScreen = useMediaQuery('(max-width:420px)');
  return (
    <>
      <Paper elevation={1} style={{padding: '25px', borderRadius: '15px'}} >
        {content}
      </Paper>
    </>
  );
}