import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
      <Grid container item>
        <Grid item className={classes.item}>
          <div style={{position: 'relative', width:"154px", height: "130px", borderRadius: "30px", backgroundColor: "#f0f3f7"}}>
            {heroDetails.assets && heroDetails.assets.icon &&
              <img
                style={{position: 'absolute', top: '5px', left: '5px'}}
                width="auto"
                height="100vw"
                onClick={() => setHeroModalOpen(true)}
                src={heroDetails.assets.icon}
                alt={heroDetails._id}>
              </img>
            }
            {
              artifactDetails.assets && artifactDetails.assets.icon &&
                <img
                  style={{position: 'absolute', top: '55px', left:'85px'}}
                  width="auto"
                  height="70vw"
                  onClick={() => setArtifactModalOpen(true)}
                  src={artifactDetails.assets.icon}
                  alt={artifactDetails._id}>
                </img>
            }
            <Tooltip title={tooltip}>
              <div style={{position: 'absolute', width:"25px", top: '10px', left:'107px'}}>
                <img style={{position: 'absolute', width: "25px", height: "25px", opacity: charInfo.immunity === "no" ? "0" : "1"}} src="https://epic7x.com/wp-content/uploads/2018/12/stic_debuf_impossible.png" alt="Immunity"></img>
                {charInfo.immunity === "" && <HelpOutlineOutlinedIcon style={{position: 'absolute', width: "25px", height: "25px", color: "rgba(255,255,255,0.9"}}/>} 
              </div>
            </Tooltip>
          </div>
        </Grid>
        <Grid item>
          <div style={{flexDirection: "column", padding: "3px 10px 10px 10px" }}>
              <Typography variant="h5">{heroDetails ? heroDetails.name : "None"}</Typography>
              <Typography>{artifactDetails ? artifactDetails.name : "None"}</Typography>
              <table>
                <tr>
                  <td>
                    <img src="https://assets.epicsevendb.com/_source/img/cm_icon_stat_max_hp.png" alt="hp"></img>
                  </td>
                  <td style={{paddingLeft: "5px", letterSpacing: "0.05px"}}>
                    HP
                  </td>
                  <td style={{paddingLeft: "10px"}}>
                    {charInfo.hp || "?" }
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src="https://assets.epicsevendb.com/_source/img/cm_icon_stat_speed.png" alt="spd"></img>
                  </td>
                  <td style={{paddingLeft: "5px", letterSpacing: "0.05em"}}>
                    SPD
                  </td>
                  <td style={{paddingLeft: "10px"}}>
                    {charInfo.spd || "?"}
                  </td>
                  </tr>
              </table>
            </div>
        </Grid>
        <Grid item xs={12} className={classes.item}>
            <p>{charInfo.notes}</p>
        </Grid>
        <HeroModal heroDetails={heroDetails} open={heroModalOpen} onClose={() => setHeroModalOpen(false)} />
        <ArtifactModal artifactDetails={artifactDetails} open={artifactModalOpen} onClose={() => setArtifactModalOpen(false)}  />
      </Grid>
    )
}