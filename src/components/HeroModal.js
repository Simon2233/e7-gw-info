import { Box, Modal, Paper, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useEffect, useState } from 'react';
import superagent from 'superagent';

HeroModal.propTypes = {
    heroId: PropTypes.string,
    onClose: PropTypes.func,
    open: PropTypes.bool,
}

export default function HeroModal(props) {
    const {heroId, open, onClose} = props;
    const [heroDetails, setHeroDetails] = useState(null);

    useEffect(() => {
	    async function getHeroDetails() {
	      try {
	        let response = await superagent.get(`https://api.epicsevendb.com/hero/${heroId}`)
	        let result = JSON.parse(response.text).results[0]
	        console.log("Hero Details Response:")
	        console.log(response)
	        setHeroDetails(result)
	        console.log(result.skills[0].assets.icon);
	      } catch(err) {
	        console.log("Failed request for hero", heroId)
	        throw err
	      }
	    }

	    getHeroDetails()
	  }, [heroId])
	
    return (
        <Modal
          open={open}
          onClose={onClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
      >
          <Paper>
            { heroDetails && <Box>
                    <Box>
                        <img src={heroDetails.assets.icon} />
                        <Typography variant="h5">{heroDetails.name}</Typography>
                    </Box>
                    <p>
                        <img width="70px" src={heroDetails.skills[0].assets.icon}></img>
                        <img width="70px" src={heroDetails.skills[1].assets.icon}></img>
                        <img width="70px" src={heroDetails.skills[2].assets.icon}></img>
                    </p>
                    <p id="simple-modal-description">
                        <p><strong>Skill 1:</strong>{"enhanced_description" in heroDetails.skills[0] ? heroDetails.skills[0].enhanced_description : heroDetails.skills[0].description}</p>
                        <p><strong>Skill 2:</strong>{"enhanced_description" in heroDetails.skills[1] ? heroDetails.skills[1].enhanced_description : heroDetails.skills[1].description}</p>
                        <p><strong>Skill 3:</strong>{"enhanced_description" in heroDetails.skills[2] ? heroDetails.skills[2].enhanced_description : heroDetails.skills[2].description}</p>
                    </p>
                </Box> }
          </Paper>
	    </Modal>
        )
}