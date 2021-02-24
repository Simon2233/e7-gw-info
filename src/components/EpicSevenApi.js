import superagent from 'superagent';
import {loadHeroMap, loadArtifactMap} from '../redux/actions'
import * as constants from '../constants'
import { getInitialCharInfo } from '../structs';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import React from 'react';

export async function callHeroListApi(loadHeroMap) {
  try {
    let response = await superagent.get('https://api.epicsevendb.com/hero')
    const results = JSON.parse(response.text).results
    const hero_idToHero = {}
    results.forEach((hero) => {
      hero_idToHero[hero._id] = hero;
    })

    loadHeroMap(hero_idToHero);
  } catch(err) {
    console.log("Failed request for heroes list")
    throw err
  }
}

export async function callArtifactListApi(loadArtifactMap) {
  try {
    let response = await superagent.get('https://api.epicsevendb.com/artifact')
    const results = JSON.parse(response.text).results
    const arti_idToArti = {}
    results.forEach((arti) => {
      arti_idToArti[arti._id] = arti;
    })

    loadArtifactMap(arti_idToArti);
  } catch(err) {
    console.log("Failed request for artifacts list")
    throw err
  }
}

function EpicSevenApi(props) {
  const {loadHeroMap, loadArtifactMap} = props;


  useEffect(() => {
    callHeroListApi(loadHeroMap);
    callArtifactListApi(loadArtifactMap);
  })

  return <>
  </>
}

export default connect(null, {loadHeroMap, loadArtifactMap})(EpicSevenApi);