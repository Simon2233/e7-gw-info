import { CHAR_1 } from '../constants';
import {EDIT_MAIN} from './actionTypes'
import superagent from 'superagent';
import {addArtifactDetails, addHeroDetails} from './actions'

async function getHeroDetails(dispatch, fort, team, char, id) {
  let response = await superagent.get(`https://api.epicsevendb.com/hero/${id}`)
  let heroDetails = JSON.parse(response.text).results[0]

  dispatch(addHeroDetails(fort, team, char, heroDetails));  
}

async function getArtifactDetails(dispatch, fort, team, char, artifactId) {
  let response = await superagent.get(`https://api.epicsevendb.com/artifact/${artifactId}`)
  let artifactDetails = JSON.parse(response.text).results[0]

  console.log("HELLO WORLD", fort, team, char, artifactDetails)
  dispatch(addArtifactDetails(fort, team, char, artifactDetails));  
}

export const getMissingDetailsMiddleware = store => next => action => {
  if (action.type === EDIT_MAIN) {
    const state = action.payload.mainInfo;
    
    for (const [fort, fortInfo] of Object.entries(state)) {
      for (const [team, teamInfo] of Object.entries(fortInfo)) {
        if (!teamInfo[CHAR_1]) continue; // Lazy way to get teams only
        
        for (const [char, charInfo] of Object.entries(teamInfo)) {
          if (!charInfo.heroDetails) continue; // Lazy way to get chars only

          if (!charInfo.heroDetails.assets) {
            getHeroDetails(store.dispatch, fort, team, char, charInfo.heroDetails._id)
          }
          
          if (!charInfo.artifactDetails.assets) {
            getArtifactDetails(store.dispatch, fort, team, char, charInfo.artifactDetails._id)
          }
        }
      }
    }

    next(action)
  }

  return next(action)
}