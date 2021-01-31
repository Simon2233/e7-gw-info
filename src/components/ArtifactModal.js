import { Box, Modal, Paper, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import superagent from 'superagent';

ArtifactModal.propTypes = {
    artifactId: PropTypes.string,
    onClose: PropTypes.func,
    open: PropTypes.bool,
}

export default function ArtifactModal(props) {
	const {artifactId, onClose, open} = props;
	const [artifactDetails, setArtifactDetails] = useState();

	useEffect(() => {
	    async function getArtifactDetails() {
	      try {
	        let response = await superagent.get(`https://api.epicsevendb.com/artifact/${artifactId}`)
	        let result = JSON.parse(response.text).results[0]
	        console.log("Artifact Details Response:")
	        console.log(response)
	        setArtifactDetails(result)
	      } catch(err) {
	        console.log("Failed request for artifact", artifactId)
	        throw err
	      }
	    }

	    getArtifactDetails()
	 }, [artifactId])

	 return (
        <Modal
          open={open}
          onClose={onClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
      >
          <Paper>
            { artifactDetails && 
				<Box>
					<Box>
						<img src={artifactDetails.assets.icon} />
						<Typography variant="h5">{artifactDetails.name}</Typography>
					</Box>
					<p id="simple-modal-description">
						<p><strong>Description: </strong>{artifactDetails.skill.description}</p>
					</p>
				</Box> }
          </Paper>
	    </Modal>
        )
}