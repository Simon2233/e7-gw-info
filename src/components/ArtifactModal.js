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
					<p id="simple-modal-description">
						<p><strong>Description: </strong>{artifactDetails.skill.description}</p>
					</p>
				</Box> }
          </Paper>
	    </Modal>
        )
}