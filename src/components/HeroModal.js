import { Box, Dialog, Modal, Paper, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

HeroModal.propTypes = {
    heroDetails: PropTypes.object,
    onClose: PropTypes.func,
    open: PropTypes.bool,
}

export default function HeroModal(props) {
    const {heroDetails, open, onClose} = props;
    return (
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Paper style={{padding: "10px"}}>
            { heroDetails.assets && 
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
                        <p><strong>Skill 1:</strong>{"enhanced_description" in heroDetails.skills[0] ? (heroDetails.skills[0].enhanced_description).replace('{{variable}}', ((heroDetails.skills[0].values[0])*100) + "%") : (heroDetails.skills[0].description).replace('{{variable}}', ((heroDetails.skills[0].values[0])*100) + "%")}</p>
                        <p><strong>Skill 2:</strong>{"enhanced_description" in heroDetails.skills[1] ? (heroDetails.skills[1].enhanced_description).replace('{{variable}}', ((heroDetails.skills[1].values[0])*100) + "%") : (heroDetails.skills[1].description).replace('{{variable}}', ((heroDetails.skills[1].values[0])*100) + "%")}</p>
                        <p><strong>Skill 3:</strong>{"enhanced_description" in heroDetails.skills[2] ? (heroDetails.skills[2].enhanced_description).replace('{{variable}}', ((heroDetails.skills[2].values[0])*100) + "%") : (heroDetails.skills[2].description).replace('{{variable}}', ((heroDetails.skills[2].values[0])*100) + "%")}</p>
                    </p>
                </div> }
          </Paper>
	    </Dialog>
        )
}