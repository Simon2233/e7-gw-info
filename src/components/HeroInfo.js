import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import React from 'react';


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
  characterInfo: PropTypes.object.isRequired,
  onOpenHero: PropTypes.func.isRequired,
  onOpenArtifact: PropTypes.func.isRequired,
}

export default function HeroInfo(props) {
    const {characterInfo, onOpenHero, onOpenArtifact} = props;
    let heroDetails;
    let artifactDetails;

    if (characterInfo) {
        heroDetails = characterInfo.heroDetails;
        artifactDetails = characterInfo.artifactDetails;
    }

    const classes = useStyles();

    return (
    <>
      <Grid item xs={2} className={classes.item}>
            <img width="70px" onClick={() => onOpenHero(heroDetails._id)} src={heroDetails ? heroDetails.assets.icon : ""} alt={heroDetails ? heroDetails._id : "no image"}></img>
            {/* <img onClick={(e) => {handleOpenHero(e)}} width="70px" src="https://assets.epicsevendb.com/_source/face/c2007_s.png" alt="arbiter-vildred"></img> */}
      </Grid>
      <Grid item xs={5} className={classes.item}>
            <Typography variant="h5">{heroDetails ? heroDetails.name : "None"}</Typography>
            <Typography variant="subtitle2">HP: {characterInfo && characterInfo.hp}</Typography>
      </Grid>
      <Grid item xs={4} className={classes.item}>
          <img width="70px" onClick={() => onOpenArtifact(artifactDetails._id)} src={artifactDetails ? artifactDetails.assets.icon : ""} alt={artifactDetails ? artifactDetails._id : "no image"}></img>
          {/* <img onClick={(e) => {handleOpenArtifact(e)}} width="70px" src="https://assets.epicsevendb.com/_source/item_arti/icon_art0070.png" alt="draco-plate"></img> */}
      </Grid>
      <Grid item xs={1} className={classes.item}>
          <img style={{width: "25px", opacity: characterInfo && characterInfo.immunity ? "1" : "0.2"}} src="https://epic7x.com/wp-content/uploads/2018/12/stic_debuf_impossible.png" alt="Immunity"></img>
      </Grid>
      <Grid item xs={12} className={classes.item}>
          <Box className={classes.info}>Additional Info<br />{characterInfo && characterInfo.additionalInfo}</Box>
      </Grid>
    </>
    )
}