import * as constants from '../constants';
import {EDIT_GW_INFO, EDIT_TEAM} from './actionTypes'
import superagent from 'superagent';
import {addArtifactDetails, addHeroDetails} from './actions'

async function getHeroDetails(dispatch, id) {
  try {
    let response = await superagent.get(`https://api.epicsevendb.com/hero/${id}`)
    let heroDetails = JSON.parse(response.text).results[0]
  
    dispatch(addHeroDetails(heroDetails));  

  } catch (err) {
    console.log("Failed request for heroes", err)
  }
}

async function getArtifactDetails(dispatch, id) {
  try {
    let response = await superagent.get(`https://api.epicsevendb.com/artifact/${id}`)
    let artifactDetails = JSON.parse(response.text).results[0]
  
    dispatch(addArtifactDetails(artifactDetails));  
  } catch (err) {
    console.log("Failed request for artifacts", err)
  }
}

export const getMissingDetailsMiddleware = store => next => action => {
  if (action.type === EDIT_GW_INFO) {
    const {heroMap, artifactMap} = store.getState().e7api;
    const gwInfo = action.payload.gwInfo;
    
    for (const [fort, fortInfo] of Object.entries(gwInfo)) {
      for (const [team, teamInfo] of Object.entries(fortInfo)) {
        if (!teamInfo || !teamInfo[constants.CHAR_1]) continue; // Lazy way to get teams only
        
        for (const [char, charInfo] of Object.entries(teamInfo)) {
          if (!charInfo || !charInfo.heroId) continue; // Lazy way to get chars only
          const {heroId, artifactId} = charInfo;

          if (!heroMap[heroId] || !heroMap[heroId].skills) {
            getHeroDetails(store.dispatch, heroId)
          }
          
          if (!artifactMap[artifactId] || !artifactMap[artifactId].stats) {
            getArtifactDetails(store.dispatch, artifactId)
          }
        }
      }
    }

    next(action)
  }

  return next(action)
}
