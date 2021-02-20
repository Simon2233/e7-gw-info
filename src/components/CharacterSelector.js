import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import superagent from 'superagent';
import { callHeroListApi } from './EpicSevenApi';
import { loadHeroMap } from '../redux/actions'
import { connect } from 'react-redux'

CharacterSelector.propTypes = {
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  onSelect: PropTypes.func,
  heroId: PropTypes.object,
}

function CharacterSelector(props) {
  const {heroId, heroMap, onSelect: setHeroDetails, loadHeroMap } = props;
  const [selectedHeroId, setSelectedHeroId] = useState(heroId)
  const heroDetails = heroMap[selectedHeroId];

  useEffect(() => {
    callHeroListApi(loadHeroMap)
  }, [])

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{width: "12vh", height: "12vh", marginRight: "5px", border: "1px solid rgba(0,0,0,0.10)", borderRadius: "10px"}}>
        {heroDetails &&
          <img style={{width: "auto", height: "12vh"}} alt={heroId} src={heroDetails.assets.icon} />
        }
      </div>
      <Autocomplete
        onChange={(event, hero) => {
          if (!hero) {
            setSelectedHeroId(null);
            return;
          }
          setSelectedHeroId(hero._id);
        }}
        defaultValue={heroDetails}
        options={Object.values(heroMap)}
        getOptionLabel={(hero) => hero.name}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label={props.label} variant="outlined" error={props.error} helperText={props.helperText} />}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return ({
    heroMap: state.e7api.heroMap,
  });
}

export default connect(mapStateToProps, {loadHeroMap})(CharacterSelector);