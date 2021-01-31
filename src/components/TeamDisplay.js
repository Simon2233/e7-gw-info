import { Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import superagent from 'superagent';
import * as constants from '../constants';
import ArtifactModal from './ArtifactModal';
import { EDITING_TEAM1 } from './Fort';
import HeroInfo from './HeroInfo';
import HeroModal from './HeroModal';

const useStyles = makeStyles({
  item: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
    padding: '10px',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`
  },
});

TeamDisplay.propTypes = {
	setEditingTeam: PropTypes.func,
  teamInfo: PropTypes.object,
  label: PropTypes.string,
}

export default function TeamDisplay(props) {
	const { setEditingTeam, teamInfo, label } = props;

  return (
  	<Paper elevation={3} style={{padding: '3vh'}}>
      <Typography variant="h3">{label}</Typography>
	  	<Box mb={10}>
		  <Button onClick={setEditingTeam} variant="contained">Edit</Button>
		  <Grid container spacing={3}>
			  <HeroInfo charInfo={teamInfo[constants.CHAR_1]} />
			  <HeroInfo charInfo={teamInfo[constants.CHAR_2]} />
			  <HeroInfo charInfo={teamInfo[constants.CHAR_3]} />
		  </Grid>
	  	</Box>
  	</Paper>
  );
}