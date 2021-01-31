import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import React, { useState } from 'react';
import ArtifactModal from './ArtifactModal';
import HeroModal from './HeroModal';
import { Tooltip } from '@material-ui/core';


const useStyles = makeStyles({
    item: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    },
    info: {
      height: "80px",
      border: "1px solid black",
      padding: "5px"
    },
});

HeroInfo.propTypes = {
  charInfo: PropTypes.object.isRequired,
}

export default function HeroInfo(props) {
    const {charInfo} = props;
    const {heroDetails, artifactDetails} = charInfo;

    const [heroModalOpen, setHeroModalOpen] = useState(false);
    const [artifactModalOpen, setArtifactModalOpen] = useState(false);

    const classes = useStyles();

    return (
      <>
        <Grid item xs={2} className={classes.item}>
              <img width="70px" onClick={() => setHeroModalOpen(true)} src={heroDetails.assets ? heroDetails.assets.icon : ""} alt={heroDetails._id || "no image"}></img>
        </Grid>
        <Grid item xs={5} className={classes.item}>
              <Typography variant="h5">{heroDetails ? heroDetails.name : "None"}</Typography>
              <Typography variant="subtitle2">HP: {charInfo.hp}</Typography>
              <Typography variant="subtitle2">CR: {charInfo.cr}</Typography>
        </Grid>
        <Grid item xs={4} className={classes.item}>
            <img width="70px" onClick={() => setArtifactModalOpen(true)} src={artifactDetails.assets ? artifactDetails.assets.icon : ""} alt={artifactDetails._id || "no image"}></img>
        </Grid>
        <Grid item xs={1} className={classes.item}>
          <Tooltip title="This unit is not affected by any debuffs or harmful effects.">
            <img style={{width: "25px", opacity: charInfo.immunity ? "1" : "0.2"}} src="https://epic7x.com/wp-content/uploads/2018/12/stic_debuf_impossible.png" alt="Immunity"></img>
          </Tooltip>
        </Grid>
        <Grid item xs={12} className={classes.item}>
            <Box className={classes.info}>Additional Info<br />{charInfo.notes}</Box>
        </Grid>
        <HeroModal heroDetails={heroDetails} open={heroModalOpen} onClose={() => setHeroModalOpen(false)} />
        <ArtifactModal artifactDetails={artifactDetails} open={artifactModalOpen} onClose={() => setArtifactModalOpen(false)}  />
      </>
    )
}