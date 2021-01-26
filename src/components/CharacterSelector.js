import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import superagent from 'superagent';

CharacterSelector.propTypes = {
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  onSelect: PropTypes.func,
  heroDetails: PropTypes.object,
}

export default function CharacterSelector(props) {
  const {heroDetails, onSelect: setHeroDetails } = props;

  const [heroes, setHeroes] = useState([])
  const [selectedHeroId, setSelectedHeroId] = useState(heroDetails && heroDetails._id)

  useEffect(() => {
    async function getHeroes() {
      try {
        let response = await superagent.get('https://api.epicsevendb.com/hero')
        console.log("Heroes Response:")
        console.log(response)
        setHeroes(JSON.parse(response.text).results)
      } catch(err) {
        console.log("Failed request for heroes")
        throw err
      }
    }
    getHeroes()
  }, [])

  useEffect(() => {
    async function getHeroDetails() {
      if (!selectedHeroId) {
        setHeroDetails(null);
        return;
      }

      try {
        let response = await superagent.get(`https://api.epicsevendb.com/hero/${selectedHeroId}`)
        let result = JSON.parse(response.text).results[0]
        console.log("Hero Details Response:")
        console.log(response)
        setHeroDetails(result);
      } catch(err) {
        console.log("Failed request for hero", selectedHeroId)
        throw err
      }
    }

    getHeroDetails()
  }, [selectedHeroId])

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{width: "12vh", height: "12vh", marginRight: "5px", border: "1px solid rgba(0,0,0,0.10)", borderRadius: "10px"}}>
        {heroDetails &&
          <img style={{width: "auto", height: "12vh"}} alt="hero" src={heroDetails.assets.icon} />
        }
      </div>
      <Autocomplete
        id="combo-box-demo"
        onChange={(event, hero) => {
          if (!hero) {
            setSelectedHeroId(null);
            setHeroDetails(null);
            return;
          }
          setSelectedHeroId(hero._id);
        }}
        options={heroes}
        getOptionLabel={(hero) => hero.name}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label={props.label} variant="outlined" error={props.error} helperText={props.helperText} />}
      />
    </div>
  );
}