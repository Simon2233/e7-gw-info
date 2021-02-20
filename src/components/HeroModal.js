import { Dialog, Paper, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

HeroModal.propTypes = {
    heroId: PropTypes.object,
    onClose: PropTypes.func,
    open: PropTypes.bool,
}

function getSkillDescription(skill) {
    if ("enhanced_description" in skill) {
        return skill.enhanced_description.replace('{{variable}}', Math.round(skill.values[0]*100) + "%")
    } else {
        return skill.description.replace('{{variable}}', Math.round(skill.values[0]*100) + "%")
    }
}

export function HeroModal(props) {
    const {heroDetails, open, onClose} = props;
    
    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Paper style={{padding: "10px"}}>
          { heroDetails && heroDetails.skills && 
            <div>
              <div>
                <img src={heroDetails.assets.icon} alt="hero icon"/>
                <Typography variant="h5">{heroDetails.name}</Typography>
              </div>
              <p>
                <img width="70px" src={heroDetails.skills[0].assets.icon} alt="skill 1"></img>
                <img width="70px" src={heroDetails.skills[1].assets.icon} alt="skill 2"></img>
                <img width="70px" src={heroDetails.skills[2].assets.icon} alt="skill 3"></img>
              </p>
              <p id="simple-modal-description">
                <p><strong>Skill 1:</strong>{getSkillDescription(heroDetails.skills[0])}</p>
                <p><strong>Skill 2:</strong>{getSkillDescription(heroDetails.skills[1])}</p>
                <p><strong>Skill 3:</strong>{getSkillDescription(heroDetails.skills[2])}</p>
              </p>
            </div> }
          </Paper>
	    </Dialog>
    )
}

const mapStateToProps = (state, props) => {
  return ({
    heroDetails: state.e7api.heroMap[props.heroId],
  });
}

export default connect(mapStateToProps)(HeroModal);