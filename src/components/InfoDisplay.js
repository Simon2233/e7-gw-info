import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import superagent from 'superagent';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles({
  item: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
    padding: '10px',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`
  },
  info: {
  	height: "80px",
  	border: "1px solid black",
  	padding: "5px"
  }
});

export default function InfoDisplay(props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
  	const [selectedHeroId, setSelectedHeroId] = useState();
  	const [heroDetails, setHeroDetails] = useState();
  	const [selectedArtifactId, setSelectedArtifactId] = useState();
  	const [artifactDetails, setArtifactDetails] = useState();
  	const [immunity, setImmunity] = useState(false);

  	useEffect(() => {
	    async function getArtifactDetails() {
	      if (!selectedArtifactId) return;

	      try {
	        let response = await superagent.get(`https://api.epicsevendb.com/artifact/${selectedArtifactId}`)
	        let result = JSON.parse(response.text).results[0]
	        console.log("Artifact Details Response:")
	        console.log(response)
	        setArtifactDetails(result)
	      } catch(err) {
	        console.log("Failed request for artifact", selectedArtifactId)
	        throw err
	      }
	    }

	    getArtifactDetails()
	 }, [selectedArtifactId])

  	useEffect(async () => {
	    async function getHeroDetails() {
	      if (!selectedHeroId) return;

	      try {
	        let response = await superagent.get(`https://api.epicsevendb.com/hero/${selectedHeroId}`)
	        let result = JSON.parse(response.text).results[0]
	        console.log("Hero Details Response:")
	        console.log(response)
	        setHeroDetails(result)
	        console.log(result.skills[0].assets.icon);
	      } catch(err) {
	        console.log("Failed request for hero", selectedHeroId)
	        throw err
	      }
	    }

	    getHeroDetails()
	  }, [selectedHeroId])

	function handleOpenHero(e) {
		setOpen(true);
		// Handle Modal Body Population
		setSelectedHeroId(e.target.alt);
	}

	function handleOpenArtifact(e) {
		setOpen(true);
		// Handle Modal Body Population
		setSelectedArtifactId(e.target.alt);
	}

	function handleOpenImmunity(e) {
		setOpen(true);
		setImmunity(true);
		// Handle Modal Body Population
	}
	

	const handleClose = () => {
	    setOpen(false);
	    setArtifactDetails();
	    setSelectedArtifactId();
        setHeroDetails();
        setSelectedHeroId();
        setImmunity(false);
	};

	  const body = (
    <div className={classes.paper}>
    {heroDetails &&
    	<Box>
    		<Box>
    			<img src={`https://assets.epicsevendb.com/_source/face/${heroDetails.id}_s.png`} />
    			<Typography variant="h5">{heroDetails.name}</Typography>
    		</Box>
	      	<p>
	      		<img width="70px" src={`${heroDetails.skills[0].assets.icon}`}></img>
	      		<img width="70px" src={`${heroDetails.skills[1].assets.icon}`}></img>
	      		<img width="70px" src={`${heroDetails.skills[2].assets.icon}`}></img>
	      	</p>
	      	<p id="simple-modal-description">
	      		<p><strong>Skill 1:</strong>{"enhanced_description" in heroDetails.skills[0] ? heroDetails.skills[0].enhanced_description : heroDetails.skills[0].description}</p>
	      		<p><strong>Skill 2:</strong>{"enhanced_description" in heroDetails.skills[1] ? heroDetails.skills[1].enhanced_description : heroDetails.skills[1].description}</p>
	      		<p><strong>Skill 3:</strong>{"enhanced_description" in heroDetails.skills[2] ? heroDetails.skills[2].enhanced_description : heroDetails.skills[2].description}</p>
	      	</p>
        </Box>
      }
      {artifactDetails &&
    	<Box>
    		<Box>
    			<img src={artifactDetails.assets.icon} />
    			<Typography variant="h5">{artifactDetails.name}</Typography>
    		</Box>
	      	<p id="simple-modal-description">
	      		<p><strong>Description: </strong>{artifactDetails.skill.description}</p>
	      	</p>
        </Box>
      }
      {immunity && 
      	<Box>
      		<Typography variant="h4">Immunity<img width="25px" style={{marginLeft: '10px'}} src="https://epic7x.com/wp-content/uploads/2018/12/stic_debuf_impossible.png" alt="Immunity"/></Typography>
	      	<p><strong>Description: </strong>This unit is not affected by any debuffs or harmful effects.</p>
        </Box>
      }
    </div>
  );
  return (
  	<Container>
	  	<Box mb={10}>
	  	  <Typography variant="h4">Team 1</Typography>
		  <Grid container spacing={3}>
		    <Grid item xs={2} className={classes.item}>
		      	<img onClick={(e) => {handleOpenHero(e)}} width="70px" src="https://assets.epicsevendb.com/_source/face/c2007_s.png" alt="arbiter-vildred"></img>
		    </Grid>
		    <Grid item xs={5} className={classes.item}>
		      	<Typography variant="h5">Arbiter Vildred</Typography>
		      	<Typography variant="subtitle2">HP: 51234</Typography>
		    </Grid>
		    <Grid item xs={4} className={classes.item}>
		    	<img onClick={(e) => {handleOpenArtifact(e)}} width="70px" src="https://assets.epicsevendb.com/_source/item_arti/icon_art0070.png" alt="draco-plate"></img>
		    </Grid>
		    <Grid item xs={1} className={classes.item}>
		    	<img onClick={(e) => {handleOpenImmunity(e)}} width="25px" src="https://epic7x.com/wp-content/uploads/2018/12/stic_debuf_impossible.png" alt="Immunity"></img>
		    </Grid>
		    <Grid item xs={12} className={classes.item}>
		    	<Box className={classes.info}>Additional Info</Box>
		    </Grid>
		    <Grid item xs={2} className={classes.item}>
		      	<img onClick={(e) => {handleOpenHero(e)}} width="70px" src="https://assets.epicsevendb.com/_source/face/c1100_s.png" alt="alencia"></img>
		    </Grid>
		    <Grid item xs={5} className={classes.item}>
		      	<Typography variant="h5">Alencia</Typography>
		      	<Typography variant="subtitle2">HP: 43244</Typography>
		    </Grid>
		    <Grid item xs={4} className={classes.item}>
		    	<img onClick={(e) => {handleOpenArtifact(e)}} width="70px" src="https://assets.epicsevendb.com/_source/item_arti/icon_art0070.png" alt="draco-plate"></img>
		    </Grid>
		    <Grid item xs={1} className={classes.item}>
		    	<img onClick={(e) => {handleOpenImmunity(e)}} width="25px" src="https://epic7x.com/wp-content/uploads/2018/12/stic_debuf_impossible.png" alt="Immunity"></img>
		    </Grid>
		    <Grid item xs={12} className={classes.item}>
		    	<Box className={classes.info}>Additional Info</Box>
		    </Grid>
		    <Grid item xs={2} className={classes.item}>
		      	<img onClick={(e) => {handleOpenHero(e)}} width="70px" src="https://assets.epicsevendb.com/_source/face/c2007_s.png" alt="arbiter-vildred"></img>
		    </Grid>
		    <Grid item xs={5} className={classes.item}>
		      	<Typography variant="h5">Arbiter Vildred</Typography>
		      	<Typography variant="subtitle2">HP: 51234</Typography>
		    </Grid>
		    <Grid item xs={4} className={classes.item}>
		    	<img onClick={(e) => {handleOpenArtifact(e)}} width="70px" src="https://assets.epicsevendb.com/_source/item_arti/icon_art0070.png" alt="draco-plate"></img>
		    </Grid>
		    <Grid item xs={1} className={classes.item}>
		    	<img onClick={(e) => {handleOpenImmunity(e)}} width="25px" src="https://epic7x.com/wp-content/uploads/2018/12/stic_debuf_impossible.png" alt="Immunity"></img>
		    </Grid>
		    <Grid item xs={12} className={classes.item}>
		    	<Box className={classes.info}>Additional Info</Box>
		    </Grid>
		  </Grid>
	  	</Box>
	  	<Box mb={10}>
	  	  <Typography variant="h4">Team 2</Typography>
		  <Grid container spacing={3}>
		    <Grid item xs={2} className={classes.item}>
		      	<img onClick={(e) => {handleOpenHero(e)}} width="70px" src="https://assets.epicsevendb.com/_source/face/c2007_s.png" alt="arbiter-vildred"></img>
		    </Grid>
		    <Grid item xs={5} className={classes.item}>
		      	<Typography variant="h5">Arbiter Vildred</Typography>
		      	<Typography variant="subtitle2">HP: 51234</Typography>
		    </Grid>
		    <Grid item xs={4} className={classes.item}>
		    	<img onClick={(e) => {handleOpenArtifact(e)}} width="70px" src="https://assets.epicsevendb.com/_source/item_arti/icon_art0070.png" alt="draco-plate"></img>
		    </Grid>
		    <Grid item xs={1} className={classes.item}>
		    	<img onClick={(e) => {handleOpenImmunity(e)}} width="25px" src="https://epic7x.com/wp-content/uploads/2018/12/stic_debuf_impossible.png" alt="Immunity"></img>
		    </Grid>
		    <Grid item xs={12} className={classes.item}>
		    	<Box className={classes.info}>Additional Info</Box>
		    </Grid>
		    <Grid item xs={2} className={classes.item}>
		      	<img onClick={(e) => {handleOpenHero(e)}} width="70px" src="https://assets.epicsevendb.com/_source/face/c2007_s.png" alt="arbiter-vildred"></img>
		    </Grid>
		    <Grid item xs={5} className={classes.item}>
		      	<Typography variant="h5">Arbiter Vildred</Typography>
		      	<Typography variant="subtitle2">HP: 51234</Typography>
		    </Grid>
		    <Grid item xs={4} className={classes.item}>
		    	<img onClick={(e) => {handleOpenArtifact(e)}} width="70px" src="https://assets.epicsevendb.com/_source/item_arti/icon_art0070.png" alt="draco-plate"></img>
		    </Grid>
		    <Grid item xs={1} className={classes.item}>
		    	<img onClick={(e) => {handleOpenImmunity(e)}} width="25px" src="https://epic7x.com/wp-content/uploads/2018/12/stic_debuf_impossible.png" alt="Immunity"></img>
		    </Grid>
		    <Grid item xs={12} className={classes.item}>
		    	<Box className={classes.info}>Additional Info</Box>
		    </Grid>
		    <Grid item xs={2} className={classes.item}>
		      	<img onClick={(e) => {handleOpenHero(e)}} width="70px" src="https://assets.epicsevendb.com/_source/face/c2007_s.png" alt="arbiter-vildred"></img>
		    </Grid>
		    <Grid item xs={5} className={classes.item}>
		      	<Typography variant="h5">Arbiter Vildred</Typography>
		      	<Typography variant="subtitle2">HP: 51234</Typography>
		    </Grid>
		    <Grid item xs={4} className={classes.item}>
		    	<img onClick={(e) => {handleOpenArtifact(e)}} width="70px" src="https://assets.epicsevendb.com/_source/item_arti/icon_art0070.png" alt="draco-plate"></img>
		    </Grid>
		    <Grid item xs={1} className={classes.item}>
		    	<img onClick={(e) => {handleOpenImmunity(e)}} width="25px" src="https://epic7x.com/wp-content/uploads/2018/12/stic_debuf_impossible.png" alt="Immunity"></img>
		    </Grid>
		    <Grid item xs={12} className={classes.item}>
		    	<Box className={classes.info}>Additional Info</Box>
		    </Grid>
		  </Grid>
	  	</Box>
	  	<Modal
	        open={open}
	        onClose={handleClose}
	        aria-labelledby="simple-modal-title"
	        aria-describedby="simple-modal-description"
	      	>
	        {body}
	    </Modal>
  	</Container>
  );
}