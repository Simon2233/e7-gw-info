import { Tooltip } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import ArtifactModal from './ArtifactModal';
import HeroModal from './HeroModal';

const useStyles = makeStyles({
    item: {
      display: "flex", 
    },
    info: {
      height: "80px",
      padding: "5px"
    },
    statIcon: {
      height: "15px",
      width: "auto",
    }
});

HeroInfo.propTypes = {
  charInfo: PropTypes.object.isRequired,
}


function HeroInfo(props) {
    const {charInfo, artifactMap, heroMap} = props;

    const heroDetails = heroMap[charInfo.heroId]
    const artifactDetails = artifactMap[charInfo.artifactId]

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
      <Grid container>
        <Grid item className={classes.item}>
          <div style={{position: 'relative', width:"100px", height: "85px", borderRadius: "30px", backgroundColor: "#f0f3f7"}}>
            {heroDetails &&
              <img
                style={{position: 'absolute', top: '0px', left: '0px'}}
                width="auto"
                height="70vw"
                onClick={() => setHeroModalOpen(true)}
                src={heroDetails.assets.icon}
                alt={heroDetails._id}>
              </img>
            }
            {
              artifactDetails &&
                <img
                  style={{position: 'absolute', top: '33px', left:'55px'}}
                  width="auto"
                  height="50vw"
                  onClick={() => setArtifactModalOpen(true)}
                  src={artifactDetails.assets.icon}
                  alt={artifactDetails._id}>
                </img>
            }
            <Tooltip title={tooltip}>
              <div style={{position: 'absolute', width:"25px", top: '0px', left:'73px'}}>
                <img style={{position: 'absolute', width: "25px", height: "25px", opacity: charInfo.immunity === "no" ? "0" : "1"}} src="https://epic7x.com/wp-content/uploads/2018/12/stic_debuf_impossible.png" alt="Immunity"></img>
                {charInfo.immunity === "" && <HelpOutlineOutlinedIcon style={{position: 'absolute', width: "25px", height: "25px", color: "rgba(255,255,255,0.9"}}/>} 
              </div>
            </Tooltip>
          </div>
          <div style={{flexDirection: "column", padding: "0px 10px 10px 10px" }}>
              <div><strong>{heroDetails ? heroDetails.name : "None"}</strong></div>
              <div>{artifactDetails ? artifactDetails.name : "None"}</div>
              <table cellSpacing="0" cellPadding="0">
                <tr>
                  <td>
                    <img className={classes.statIcon} src="https://assets.epicsevendb.com/_source/img/cm_icon_stat_max_hp.png" alt="hp"></img>
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
                    <img className={classes.statIcon} src="https://assets.epicsevendb.com/_source/img/cm_icon_stat_speed.png" alt="spd"></img>
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
        {charInfo.notes && 
          <Grid item xs={12} className={classes.item}>
              <p style={{marginTop: "3px", marginBottom: "7px"}}>{charInfo.notes}</p>
          </Grid>
        }
        <HeroModal heroId={charInfo.heroId} open={heroModalOpen} onClose={() => setHeroModalOpen(false)} />
        <ArtifactModal artifactId={charInfo.artifactId} open={artifactModalOpen} onClose={() => setArtifactModalOpen(false)}  />
      </Grid>
    )
}

const mapStateToProps = (state) => {
  return ({
    heroMap: state.e7api.heroMap,
    artifactMap: state.e7api.artifactMap,
  });
}

export default connect(mapStateToProps)(HeroInfo);