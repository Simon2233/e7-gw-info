import { Card, Grid, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import ArtifactSelector from './ArtifactSelector';
import CharacterSelector from './CharacterSelector';
import ImmunityButton from './ImmunityButton';
import PropTypes from 'prop-types';

EditCharacter.propTypes = {
  charInfo: PropTypes.object,
  setCharInfo: PropTypes.func,
}

export default function EditCharacter(props) {
  const { charInfo, setCharInfo } = props;

  function getCharInfoUpdateFunc(field) {
    return (value) => setCharInfo({...charInfo, [field]: value});
  }

  // Lazy way to make the text fields faster
  const [hp, setHp] = useState(charInfo.hp)
  const [cr, setCr] = useState(charInfo.cr)
  const [notes, setNotes] = useState(charInfo.notes)

  useEffect(() => {
    setHp(charInfo.hp)
    setCr(charInfo.cr)
    setNotes(charInfo.notes)
  }, [charInfo.hp, charInfo.cr, charInfo.notes])

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <CharacterSelector label="Character" heroId={charInfo.heroId} onSelect={getCharInfoUpdateFunc("heroId")} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ArtifactSelector label="Artifact" artifactId={charInfo.artifactId} onSelect={getCharInfoUpdateFunc("artifactId")}  />
        </Grid>
        <Grid item container xs={12} style={{marginLeft: "15px"}} alignItems='center' spacing={1} >
          <Grid item >
            <ImmunityButton immunity={charInfo.immunity} onSelect={getCharInfoUpdateFunc("immunity")} />
          </Grid>
          <Grid item>
            <TextField 
              value={hp} 
              label="HP" 
              variant="outlined" 
              style={{width: "7em"}} 
              onChange={(e) => setHp(e.target.value)} 
              onBlur={(e) => getCharInfoUpdateFunc("hp")(e.target.value)} 
            />
          </Grid>
          <Grid item>
            <TextField 
              value={cr} 
              label="CR" 
              variant="outlined" 
              style={{width: "4em"}} 
              onChange={(e) => setCr(e.target.value)} 
              onBlur={(e) => getCharInfoUpdateFunc("cr")(e.target.value)}  
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField 
            value={notes} 
            label="Additional Info"
            multiline 
            fullWidth 
            onChange={(e) => setNotes(e.target.value)} 
            onBlur={(e) => getCharInfoUpdateFunc("notes")(e.target.value)} 
          />
        </Grid>
      </Grid> 
    </>
  );
}