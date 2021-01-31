import React, { useEffect, useState, Fragment } from "react";
import Fort from './Fort'
import InfoDisplay from './InfoDisplay.js'
import TabDisplay from './TabDisplay.js'
import GoogleSheet from './GoogleSheet.js'

export default function Main() {
  const [fortress, setFortress] = useState(
    {leftFort: {},
    rightFort: {},
    midFort: {},
    stronghold: {
      team1: {
        character1: {
          name: "",
          artifact: "",
          hp: "",
          immunity: ""
        },
        character2: {
          name: "",
          artifact: "",
          hp: "",
          immunity: ""
        },
        character3: {
          name: "",
          artifact: "",
          hp: "",
          immunity: ""
        },
        notes: "",
        image: ""
      },
      team2: {
        character1: {
          name: "",
          artifact: "",
          hp: "",
          immunity: ""
        },
        character2: {
          name: "",
          artifact: "",
          hp: "",
          immunity: ""
        },
        character3: {
          name: "",
          artifact: "",
          hp: "",
          immunity: ""
        },
        notes: "",
        image: ""
      }
    }
  });
  return (
    <>
      <Fort />
      <TabDisplay></TabDisplay>
      <GoogleSheet fortInfo={fortress} setFortInfo={setFortress}></GoogleSheet>
    </>
  );
}