import { IconButton, makeStyles, Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as constants from '../constants';
import HeroInfo from './HeroInfo';

const useStyles = makeStyles({
  pageRule: {
    border: 0,
    borderTop: "1px solid",
    borderColor: "rgba(0,0,0,0.1)", 
  },
});

TeamDisplay.propTypes = {
	setEditingTeam: PropTypes.func,
  team: PropTypes.string,
  fort: PropTypes.string,
}

function TeamDisplay(props) {
  const { setEditingTeam, teamInfo, gapi, team, fort } = props;
  const showEdit = true;
  
  const classes = useStyles();

  const id=`${fort}-${team}-edit`;

  const content = (
    <div style={{position: "relative"}}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <HeroInfo charInfo={teamInfo[constants.CHAR_1]} />
          <hr className={classes.pageRule}></hr>
        </Grid>
        <Grid item xs={12}>
          <HeroInfo charInfo={teamInfo[constants.CHAR_2]} />
          <hr className={classes.pageRule}></hr>
        </Grid>
        <Grid item xs={12}>
          <HeroInfo charInfo={teamInfo[constants.CHAR_3]} />
        </Grid>
      </Grid>
      {showEdit && 
        <div style={{position: "absolute", right: "-10px", bottom: "0px"}}>
          <IconButton id={id} variant="contained"><EditIcon /></IconButton>
        </div>
      }
    </div>
  )

  return (
    <>
      <Paper elevation={1} style={{padding: '25px', borderRadius: '15px'}} >
        {content}
      </Paper>
    </>
  );
}

const mapStateToProps = (state, props) => {
  return ({
    teamInfo: state.gwInfo[props.fort][props.team],
    gapi: state.gapi,
  });
}

export default connect(mapStateToProps)(TeamDisplay);