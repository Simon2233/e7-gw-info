import { Card, Grid, Paper, TextField } from '@material-ui/core';
import React from 'react';
import ArtifactSelector from './ArtifactSelector';
import CharacterSelector from './CharacterSelector';
import ImmunityButton from './ImmunityButton';
import PropTypes from 'prop-types';

EditCharacter.propTypes = {
  characterInfo: PropTypes.object,
  setCharacterInfo: PropTypes.func,
}

export default function EditCharacter(props) {
  const { characterInfo, setCharacterInfo } = props;

  function getCharacterInfoUpdateFunc(field) {
    return (value) => setCharacterInfo({...characterInfo, [field]: value});
  }

  return (
    <Card elevation={3} style={{margin: "3vh", padding: "3vh"}}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <CharacterSelector label="Character" heroDetails={characterInfo.heroDetails} onSelect={getCharacterInfoUpdateFunc("heroDetails")} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ArtifactSelector label="Artifact" artifactDetails={characterInfo.artifactDetails} onSelect={getCharacterInfoUpdateFunc("artifactDetails")}  />
        </Grid>
        <Grid item container xs={12} justify='center' alignItems='center' spacing={1} >
          <Grid item >
            <ImmunityButton onSelect={getCharacterInfoUpdateFunc("immunity")} immunity={characterInfo.immunity} />
          </Grid>
          <Grid item>
            <TextField value={characterInfo.hp || ""} label="HP" variant="outlined" style={{width: "7em"}} onChange={(e) => getCharacterInfoUpdateFunc("hp")(e.target.value)} />
          </Grid>
          <Grid item>
            <TextField value={characterInfo.cr || ""} label="CR" variant="outlined" style={{width: "4em"}} onChange={(e) => getCharacterInfoUpdateFunc("cr")(e.target.value)}  />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField value={characterInfo.additionalInfo || ""} label="Additional Info" multiline fullWidth onChange={(e) => getCharacterInfoUpdateFunc("additionalInfo")(e.target.value)}  />
        </Grid>
      </Grid> 
    </Card>
  );
}