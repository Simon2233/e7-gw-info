import * as constants from '../constants';
import {EDIT_GW_INFO, EDIT_TEAM} from './actionTypes'
import superagent from 'superagent';
import {addArtifactDetails, addHeroDetails} from './actions'

async function getHeroDetails(dispatch, fort, team, char, id) {
  try {
    let response = await superagent.get(`https://api.epicsevendb.com/hero/${id}`)
    let heroDetails = JSON.parse(response.text).results[0]
  
    dispatch(addHeroDetails(fort, team, char, heroDetails));  

  } catch (err) {
    console.log("Failed request for heroes", err)
  }
}

async function getArtifactDetails(dispatch, fort, team, char, artifactId) {
  try {
    let response = await superagent.get(`https://api.epicsevendb.com/artifact/${artifactId}`)
    let artifactDetails = JSON.parse(response.text).results[0]
  
    dispatch(addArtifactDetails(fort, team, char, artifactDetails));  
  } catch (err) {
    console.log("Failed request for artifacts", err)
  }
}

export const getMissingDetailsMiddleware = store => next => action => {
  if (action.type === EDIT_GW_INFO) {
    const state = action.payload.gwInfo;
    
    for (const [fort, fortInfo] of Object.entries(state)) {
      for (const [team, teamInfo] of Object.entries(fortInfo)) {
        if (!teamInfo || !teamInfo[constants.CHAR_1]) continue; // Lazy way to get teams only
        
        for (const [char, charInfo] of Object.entries(teamInfo)) {
          if (!charInfo || !charInfo.heroDetails) continue; // Lazy way to get chars only

          if (!charInfo.heroDetails.assets && charInfo.heroDetails._id) {
            getHeroDetails(store.dispatch, fort, team, char, charInfo.heroDetails._id)
          }
          
          if (!charInfo.artifactDetails.assets && charInfo.artifactDetails._id) {
            getArtifactDetails(store.dispatch, fort, team, char, charInfo.artifactDetails._id)
          }
        }
      }
    }

    next(action)
  }

  return next(action)
}


const gapi = window.gapi;

async function updateGoogleSheet(fort, team, teamInfo) {

  const startIndex = team === constants.TEAM_1 ? 6 : 58;
  
  const requestBody = {
    "data": [
      {
        [`B${startIndex+0}`]: teamInfo[constants.YOUR_FASTEST_SPEED],
        [`G${startIndex+0}`]: teamInfo[constants.NUM_OUTSPED],
      
        [`B${startIndex+3}`]: teamInfo[constants.CHAR_1].heroDetails._id,
        [`E${startIndex+3}`]: teamInfo[constants.CHAR_1].artifactDetails._id,
        [`G${startIndex+3}`]: teamInfo[constants.CHAR_1].hp,
        [`H${startIndex+3}`]: teamInfo[constants.CHAR_1].immunity,
        [`I${startIndex+3}`]: teamInfo[constants.CHAR_1].cr,
        [`B${startIndex+4}`]: teamInfo[constants.CHAR_1].notes,
      
        [`B${startIndex+6}`]: teamInfo[constants.CHAR_2].heroDetails._id,
        [`E${startIndex+6}`]: teamInfo[constants.CHAR_2].artifactDetails._id,
        [`G${startIndex+6}`]: teamInfo[constants.CHAR_2].hp,
        [`H${startIndex+6}`]: teamInfo[constants.CHAR_2].immunity,
        [`I${startIndex+6}`]: teamInfo[constants.CHAR_2].cr,
        [`B${startIndex+7}`]: teamInfo[constants.CHAR_2].notes,
      
        [`B${startIndex+9}`]: teamInfo[constants.CHAR_3].heroDetails._id,
        [`E${startIndex+9}`]: teamInfo[constants.CHAR_3].artifactDetails._id,
        [`G${startIndex+9}`]: teamInfo[constants.CHAR_3].hp,
        [`H${startIndex+9}`]: teamInfo[constants.CHAR_3].immunity,
        [`I${startIndex+9}`]: teamInfo[constants.CHAR_3].cr,
        [`B${startIndex+10}`]: teamInfo[constants.CHAR_3].notes,
      }
    ]
  } 

  try {

    // EXAMPLE
    // function makeApiCall() {

    //   var batchUpdateValuesRequestBody = {
    //     // How the input data should be interpreted.
    //     valueInputOption: '',  // TODO: Update placeholder value.

    //     // The new values to apply to the spreadsheet.
    //     data: [],  // TODO: Update placeholder value.

    //     // TODO: Add desired properties to the request body.
    //   };

    //   var request = gapi.client.sheets.spreadsheets.values.batchUpdate(params, batchUpdateValuesRequestBody);
    //   request.then(function(response) {
    //     // TODO: Change code below to process the `response` object:
    //     console.log(response.result);
    //   }, function(reason) {
    //     console.error('error: ' + reason.result.error.message);
    //   });
    // }

    const params = {
      // The ID of the spreadsheet to update.
      spreadsheetId: '1l_UrwdZxNQfpJ0XwZKe0tYCi1R7TjHGJ1fEFa58h404',  // TODO: Update placeholder value.
    };

    // gapi.client.sheets.spreadsheets.values.batchUpdate(params, requestBody)

  } catch(err) {
    console.log("Failed sheets request", err)
  }
}

export const updateTeamInGoogleSheetMiddleware = store => next => action => {
  if (action.type === EDIT_TEAM) {
    const {fort, team, teamInfo} = action.payload;
    
    // updateGoogleSheet(fort, team, teamInfo)
    next(action)
  }

  return next(action)
}