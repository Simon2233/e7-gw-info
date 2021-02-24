import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import superagent from 'superagent';
import { connect } from 'react-redux'
import { callArtifactListApi } from './EpicSevenApi';
import { loadArtifactMap } from '../redux/actions'

ArtifactSelector.propTypes = {
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  onSelect: PropTypes.func,
  artifactId: PropTypes.string,
}

function ArtifactSelector(props) {
  const { artifactId, artifactMap, onSelect, loadArtifactMap  } = props
  const [selectedArtifactId, setSelectedArtifactId] = useState(artifactId);
  const artifactDetails = artifactMap[selectedArtifactId];

  useEffect(() => {
    callArtifactListApi(loadArtifactMap)
  }, [])

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <div style={{width: "12vh", height: "12vh", marginRight: "5px", border: "1px solid rgba(0,0,0,0.10)", borderRadius: "10px"}}>
      {artifactDetails &&
         <img style={{width: "auto", height: "12vh"}} alt="artifact" src={artifactDetails.assets.icon} />
        }
      </div>
      <Autocomplete
        onChange={(event, artifact) => {
          if (!artifact) {
            setSelectedArtifactId();
            onSelect();
            return;
          }
          onSelect(artifact._id)
          setSelectedArtifactId(artifact._id);
        }}
        defaultValue={artifactDetails}
        options={Object.values(artifactMap)}
        getOptionLabel={(artifact) => artifact.name}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label={props.label} variant="outlined" error={props.error} helperText={props.helperText} />}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return ({
    artifactMap: state.e7api.artifactMap,
  });
}

export default connect(mapStateToProps, {loadArtifactMap})(ArtifactSelector);