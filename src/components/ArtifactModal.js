import { Box, Modal, Paper, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

ArtifactModal.propTypes = {
    artifactDetails: PropTypes.object,
    onClose: PropTypes.func,
    open: PropTypes.bool,
}


export default function ArtifactModal(props) {
	const {artifactDetails, onClose, open} = props;
  let description;
  if (artifactDetails.skill) {
    artifactDetails.skill.enhancements[artifactDetails.skill.enhancements.length - 1].forEach(element => description ? description = description.replace('{{variable}}', element*100 + "%") : description = artifactDetails.skill.description.replace('{{variable}}', element*100 + "%"))
  }
	 return (
        <Modal
          open={open}
          onClose={onClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Paper>
            { artifactDetails.assets && 
              <Box>
                <Box>
                  <img src={artifactDetails.assets.icon} alt={`${artifactDetails.id} icon`} />
                  <Typography variant="h5">{artifactDetails.name}</Typography>
                </Box>
                { artifactDetails.skill && 
                <p>
                  <strong>Description: </strong>{description}
                </p> }
              </Box> }
          </Paper>
	    </Modal>
        )
}