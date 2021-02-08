import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import ArtifactModal from './ArtifactModal';
import HeroModal from './HeroModal';
import { Tooltip } from '@material-ui/core';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

const useStyles = makeStyles({
    item: {
      display: "flex", 
    },
    info: {
      height: "80px",
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

    let tooltip = "";
    if (charInfo.immunity === "yes") {
      tooltip = "This unit is immune";
    } else if (charInfo.immunity === "no") {
      tooltip = "This unit is not immune";
    } if (charInfo.immunity === "") {
      tooltip = "No info on immunity";
    }

    return (
      <>
        <Grid item className={classes.item}>
          <div style={{position: 'relative', width:"135px", height: "90px"}}>
            <img style={{position: 'absolute'}} width="auto" height="100vw" onClick={() => setHeroModalOpen(true)} src={heroDetails.assets ? heroDetails.assets.icon : ""} alt={heroDetails._id || "no image"}></img>
            <img style={{position: 'absolute', top: '50px', left:'80px'}} width="auto" height="70vw" onClick={() => setArtifactModalOpen(true)} src={artifactDetails.assets ? artifactDetails.assets.icon : ""} alt={artifactDetails._id || "no image"}></img>
          </div>
        </Grid>
        <Grid item className={classes.item} style={{flexDirection: "column", }}>
          <Typography variant="h5">{heroDetails ? heroDetails.name : "None"}</Typography>
          <Typography variant="subtitle2"><strong>HP: </strong>{charInfo.hp}</Typography>
            <Tooltip title={tooltip}>
              <div style={{position: 'relative', width:"25px"}}>
                <img style={{position: 'absolute', width: "25px", height: "25px", opacity: charInfo.immunity === "yes" ? "1" : "0.2"}} src="https://epic7x.com/wp-content/uploads/2018/12/stic_debuf_impossible.png" alt="Immunity"></img>
                {charInfo.immunity === "" && <HelpOutlineOutlinedIcon style={{position: 'absolute', width: "25px", height: "25px"}}/>} 
              </div>
            </Tooltip>
        </Grid>
        <Grid item xs={12} className={classes.item}>
            <p>{charInfo.notes}</p>
        </Grid>
        <HeroModal heroDetails={heroDetails} open={heroModalOpen} onClose={() => setHeroModalOpen(false)} />
        <ArtifactModal artifactDetails={artifactDetails} open={artifactModalOpen} onClose={() => setArtifactModalOpen(false)}  />
      </>
    )
}