import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import superagent from 'superagent';

ArtifactSelector.propTypes = {
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  onSelect: PropTypes.func,
  artifactDetails: PropTypes.object,
}

export default function ArtifactSelector(props) {
  const { artifactDetails, onSelect: setArtifactDetails  } = props

  const [artifacts, setArtifacts] = useState([])
  const [selectedArtifactId, setSelectedArtifactId] = useState(artifactDetails._id)

  useEffect(() => {
    async function getArtifacts() {
      try {
        let response = await superagent.get('https://api.epicsevendb.com/artifact')
        setArtifacts(JSON.parse(response.text).results)
      } catch(err) {
        console.log("Failed request for artifacts")
        throw err
      }
    }
    getArtifacts()
  }, [])

  useEffect(() => {
    async function getArtifactDetails() {
      if (!selectedArtifactId) {
        setArtifactDetails({ _id: "" });
        return;
      }

      try {
        let response = await superagent.get(`https://api.epicsevendb.com/artifact/${selectedArtifactId}`)
        let result = JSON.parse(response.text).results[0]
        setArtifactDetails(result)
      } catch(err) {
        console.log("Failed request for artifact", selectedArtifactId)
        throw err
      }
    }

    getArtifactDetails()
  }, [selectedArtifactId])

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <div style={{width: "12vh", height: "12vh", marginRight: "5px", border: "1px solid rgba(0,0,0,0.10)", borderRadius: "10px"}}>
      {artifactDetails.assets &&
         <img style={{width: "auto", height: "12vh"}} alt="artifact" src={artifactDetails.assets.icon} />
        }
      </div>
      <Autocomplete
        onChange={(event, artifact) => {
          if (!artifact) {
            setSelectedArtifactId();
            setArtifactDetails();
            return;
          }
          setSelectedArtifactId(artifact._id);
        }}
        options={artifacts}
        getOptionLabel={(artifact) => artifact.name}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label={props.label} variant="outlined" error={props.error} helperText={props.helperText} />}
      />
    </div>
  );
}