import superagent from 'superagent';
import {editGwInfo} from '../redux/actions'
import * as constants from '../constants'
import { getInitialCharInfo } from '../structs';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import React from 'react';

function speedCalc(fastestSpd, numFaster, c1, c2, c3) {
  // given a list of numbers, rank them from smallest to largest
  const crs = {
    c1: c1,
    c2: c2,
    c3: c3,
  };

  // make array [("c1", value c1), ("c2", value c2), ("c3", value c3)]
  let orderAndCrArray = Object.entries(crs)
  // sort descending
  orderAndCrArray.sort((a, b) => a[1] - b[1])
  
  const speeds = {}
  
  let i = parseInt(numFaster)
  orderAndCrArray.forEach(x => {
    if (i !== 0) {
      crs[x[0]] = parseInt(x[1])+100
      i--;
    }
  })
  
  orderAndCrArray = Object.entries(crs)
  orderAndCrArray.forEach(x => {
    speeds[x[0]] = Math.round(fastestSpd * x[1] /100)
  })  

  return speeds;
}

function makeCharacter(heroId, artifactId, hp, immunity, cr, notes, spd) {
  const char = getInitialCharInfo();

  if (heroId) char.heroId = heroId;
  if (artifactId) char.artifactId = artifactId
  if (hp) char.hp = hp;
  if (immunity) char.immunity = immunity;
  if (cr) char.cr = cr;
  if (notes) char.notes = notes;
  if (spd) char.spd = spd;

  return char;
}

function makeTeam(sheetTeam) {
  const speeds = speedCalc(sheetTeam[4][1], sheetTeam[4][2], sheetTeam[0][4], sheetTeam[1][4], sheetTeam[2][4])

  return {
    [constants.YOUR_FASTEST_SPEED]: sheetTeam[4][1],
    [constants.NOTES]: sheetTeam[3][0],
    [constants.NUM_OUTSPED]: sheetTeam[4][2],
    [constants.IMG_SRC]: sheetTeam[4][0],
    [constants.CHAR_1]: makeCharacter(
      sheetTeam[0][0],
      sheetTeam[0][1],
      sheetTeam[0][2],
      sheetTeam[0][3],
      sheetTeam[0][4],
      sheetTeam[0][5],
      speeds.c1,
    ),
    [constants.CHAR_2]: makeCharacter(
      sheetTeam[1][0],
      sheetTeam[1][1],
      sheetTeam[1][2],
      sheetTeam[1][3],
      sheetTeam[1][4],
      sheetTeam[1][5],
      speeds.c2,
    ),
    [constants.CHAR_3]: makeCharacter(
      sheetTeam[2][0],
      sheetTeam[2][1],
      sheetTeam[2][2],
      sheetTeam[2][3],
      sheetTeam[2][4],
      sheetTeam[2][5],
      speeds.c3,
    ),
  }
}

function makeFort(sheet) {
  return {
    [constants.PLAYER_NAME]: sheet[0][0],
    [constants.TEAM_1]: makeTeam(sheet.slice(1, 6)),
    [constants.TEAM_2]: makeTeam(sheet.slice(6, 11)),
  }
}

function makeGwInfo(sheets) {
  return {
    [constants.LEFT_FORTRESS]: makeFort(sheets[0].values),
    [constants.MIDDLE_FORTRESS]: makeFort(sheets[1].values),
    [constants.RIGHT_FORTRESS]: makeFort(sheets[2].values),
    [constants.STRONGHOLD]: makeFort(sheets[3].values),
  }
}

export function GoogleSheet(props) {
  const {editGwInfo} = props;

  async function loadGoogleSheetInfo() {
    const range = "M1:R12";
  
    try {
      let response = await superagent.get(
        "https://sheets.googleapis.com/v4/spreadsheets/1l_UrwdZxNQfpJ0XwZKe0tYCi1R7TjHGJ1fEFa58h404/values:batchGet?" + 
        `ranges='${constants.LEFT_FORTRESS}'!${range}&` +
        `ranges='${constants.MIDDLE_FORTRESS}'!${range}&` +
        `ranges='${constants.RIGHT_FORTRESS}'!${range}&` +
        `ranges='${constants.STRONGHOLD}'!${range}&` +
        `key=${constants.API_KEY}`
      )
      const sheets = JSON.parse(response.text).valueRanges;
      const gwInfo = makeGwInfo(sheets);
  
      editGwInfo(gwInfo);
    } catch(err) {
      console.log("Failed sheets batchGet request", err)
      throw err
    }
  }

  useEffect(() => {
    loadGoogleSheetInfo()
  }, [])

  return <>
  </>
}

export default connect(null, {editGwInfo})(GoogleSheet);