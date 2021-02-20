import { Box, Dialog, Paper, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

ArtifactModal.propTypes = {
    artifactId: PropTypes.string,
    onClose: PropTypes.func,
    open: PropTypes.bool,
}


function ArtifactModal(props) {
	const {artifactDetails, onClose, open} = props;
  let description;
  if (artifactDetails && artifactDetails.skill) {
    artifactDetails.skill.enhancements[artifactDetails.skill.enhancements.length - 1].forEach(element => {
      description = artifactDetails.skill.description.replace('{{variable}}', Math.round(element*100) + "%")
    })
  }
	 return (
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Paper style={{padding: "10px"}}>
            { artifactDetails && 
              <Box>
                <Box>
                  <img src={artifactDetails.assets.icon} alt={`${artifactDetails.id} icon`} />
                  <Typography variant="h5">{artifactDetails.name}</Typography>
                </Box>
                { artifactDetails.description && 
                <p>
                  <strong>Description: </strong>{description}
                </p> }
              </Box> }
          </Paper>
	    </Dialog>
        )
}

const mapStateToProps = (state, props) => {
  return ({
    artifactDetails: state.e7api.artifactMap[props.artifactId],
  });
}

export default connect(mapStateToProps)(ArtifactModal);