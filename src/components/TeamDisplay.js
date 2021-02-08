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

  let matchStyle = {};
  const matches = useMediaQuery('(max-width:420px)');
  if (matches) {
    matchStyle.marginLeft = "0px";
    matchStyle.marginRight = "0px";
  } else {
    matchStyle.marginLeft = "25px";
    matchStyle.marginRight = "25  px";
  }

  return (
  	<Paper elevation={3} style={{padding: '25px', marginTop: '25px', ...matchStyle }}>
      <div style={{display: 'flex'}}>
        <Typography variant="h4">{label}</Typography>
        <IconButton onClick={setEditingTeam} variant="contained"><EditIcon /></IconButton>
      </div>
		  <Grid container spacing={3}>
			  <HeroInfo charInfo={teamInfo[constants.CHAR_1]} />
			  <HeroInfo charInfo={teamInfo[constants.CHAR_2]} />
			  <HeroInfo charInfo={teamInfo[constants.CHAR_3]} />
		  </Grid>
  	</Paper>
  );
}