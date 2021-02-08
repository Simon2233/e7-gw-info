import React, { useEffect, useState} from 'react';
import { Checkbox } from '@material-ui/core'
import PropTypes from 'prop-types'
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

ImmunityButton.propTypes = {
  onSelect: PropTypes.func,
  immunity: PropTypes.bool,
}

export default function ImmunityButton(props) {
  const {immunity, onSelect} = props;

  function getNextValue(immunity) {
    switch (immunity) {
      case "yes": {
        return "no";
      }
      case "no": {
        return null;
      }
      default: {
        return "yes";
      }
    }
  } 


  return (
    <div
      style={{width: "8vh", height: "8vh"}}  
      onClick={() => {
        onSelect(getNextValue(immunity))
      }}
    >
      {
        immunity === "yes" && 
        <img 
          style={{width: "8vh", height: "8vh"}} 
          alt="immunity" 
          src="https://epic7x.com/wp-content/uploads/2018/12/stic_debuf_impossible.png"
        />
      }
      {
        immunity === "no" && 
        <img 
          style={{width: "8vh", height: "8vh", opacity: "0.2"}} 
          alt="no immunity" 
          src="https://epic7x.com/wp-content/uploads/2018/12/stic_debuf_impossible.png"
        />
      }
      {
        immunity === null && 
        <div style={{position: 'relative', width: "8vh", height: "8vh"}}>
          <img 
            style={{left: "0px", position: 'absolute', width: "8vh", height: "8vh", opacity: "0.2"}} 
            alt="no immunity" 
            src="https://epic7x.com/wp-content/uploads/2018/12/stic_debuf_impossible.png"
          />
          <HelpOutlineOutlinedIcon style={{left: "0px",  position: 'absolute', width: "8vh", height: "8vh", color: "#666666"}}/>
        </div>
      }
    </div>
  );
}