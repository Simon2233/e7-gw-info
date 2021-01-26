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
	const [heroes, setHeroes] = useState([])
  	const [selectedHeroId, setSelectedHeroId] = useState()
  	const [heroDetails, setHeroDetails] = useState()

  	useEffect(async () => {
	    async function getHeroDetails() {
	      if (!selectedHeroId) return;

	      try {
	        let response = await superagent.get(`https://api.epicsevendb.com/hero/${selectedHeroId}`)
	        let result = JSON.parse(response.text).results[0]
	        console.log("Hero Details Response:")
	        console.log(response)
	        setHeroDetails(result)
	      } catch(err) {
	        console.log("Failed request for hero", selectedHeroId)
	        throw err
	      }
	    }

	    getHeroDetails()
	  }, [selectedHeroId])

	function handleOpen(e) {
		setOpen(true);
		// Handle Modal Body Population
		console.log(e.target);
		setSelectedHeroId('c2007')
	}

	const handleClose = () => {
	    setOpen(false);
	};

	  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">Hero / Artifact Name / Immunity</h2>
      <p id="simple-modal-description">
        Description
      </p>
    </div>
  );
  return (
  	<Container>
	  	<Box mb={10}>
	  	  <Typography variant="h4">Team 1</Typography>
		  <Grid container spacing={3}>
		    <Grid item xs={2} className={classes.item}>
		      	<img onClick={(e) => {handleOpen(e)}} width="70px" src="https://assets.epicsevendb.com/_source/face/c2007_s.png" alt="Arbiter Vildred"></img>
		    </Grid>
		    <Grid item xs={5} className={classes.item}>
		      	<Typography variant="h5">Arbiter Vildred</Typography>
		      	<Typography variant="subtitle2">HP: 51234</Typography>
		    </Grid>
		    <Grid item xs={4} className={classes.item}>
		    	<img onClick={handleOpen} width="70px" src="https://assets.epicsevendb.com/_source/item_arti/icon_art0070.png" alt="Draco's Plate"></img>
		    </Grid>
		    <Grid item xs={1} className={classes.item}>
		    	<img onClick={handleOpen} width="25px" src="https://epic7x.com/wp-content/uploads/2018/12/stic_debuf_impossible.png" alt="Immunity"></img>
		    </Grid>
		    <Grid item xs={12} className={classes.item}>
		    	<Box className={classes.info}>Additional Info</Box>
		    </Grid>
		    <Grid item xs={2} className={classes.item}>
		      	<img onClick={handleOpen} width="70px" src="https://assets.epicsevendb.com/_source/face/c2007_s.png" alt="Arbiter Vildred"></img>
		    </Grid>
		    <Grid item xs={5} className={classes.item}>
		      	<Typography variant="h5">Arbiter Vildred</Typography>
		      	<Typography variant="subtitle2">HP: 51234</Typography>
		    </Grid>
		    <Grid item xs={4} className={classes.item}>
		    	<img onClick={handleOpen} width="70px" src="https://assets.epicsevendb.com/_source/item_arti/icon_art0070.png" alt="Draco's Plate"></img>
		    </Grid>
		    <Grid item xs={1} className={classes.item}>
		    	<img onClick={handleOpen} width="25px" src="https://epic7x.com/wp-content/uploads/2018/12/stic_debuf_impossible.png" alt="Immunity"></img>
		    </Grid>
		    <Grid item xs={12} className={classes.item}>
		    	<Box className={classes.info}>Additional Info</Box>
		    </Grid>
		    <Grid item xs={2} className={classes.item}>
		      	<img onClick={handleOpen} width="70px" src="https://assets.epicsevendb.com/_source/face/c2007_s.png" alt="Arbiter Vildred"></img>
		    </Grid>
		    <Grid item xs={5} className={classes.item}>
		      	<Typography variant="h5">Arbiter Vildred</Typography>
		      	<Typography variant="subtitle2">HP: 51234</Typography>
		    </Grid>
		    <Grid item xs={4} className={classes.item}>
		    	<img onClick={handleOpen} width="70px" src="https://assets.epicsevendb.com/_source/item_arti/icon_art0070.png" alt="Draco's Plate"></img>
		    </Grid>
		    <Grid item xs={1} className={classes.item}>
		    	<img onClick={handleOpen} width="25px" src="https://epic7x.com/wp-content/uploads/2018/12/stic_debuf_impossible.png" alt="Immunity"></img>
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
		      	<img onClick={handleOpen} width="70px" src="https://assets.epicsevendb.com/_source/face/c2007_s.png" alt="Arbiter Vildred"></img>
		    </Grid>
		    <Grid item xs={5} className={classes.item}>
		      	<Typography variant="h5">Arbiter Vildred</Typography>
		      	<Typography variant="subtitle2">HP: 51234</Typography>
		    </Grid>
		    <Grid item xs={4} className={classes.item}>
		    	<img onClick={handleOpen} width="70px" src="https://assets.epicsevendb.com/_source/item_arti/icon_art0070.png" alt="Draco's Plate"></img>
		    </Grid>
		    <Grid item xs={1} className={classes.item}>
		    	<img onClick={handleOpen} width="25px" src="https://epic7x.com/wp-content/uploads/2018/12/stic_debuf_impossible.png" alt="Immunity"></img>
		    </Grid>
		    <Grid item xs={12} className={classes.item}>
		    	<Box className={classes.info}>Additional Info</Box>
		    </Grid>
		    <Grid item xs={2} className={classes.item}>
		      	<img onClick={handleOpen} width="70px" src="https://assets.epicsevendb.com/_source/face/c2007_s.png" alt="Arbiter Vildred"></img>
		    </Grid>
		    <Grid item xs={5} className={classes.item}>
		      	<Typography variant="h5">Arbiter Vildred</Typography>
		      	<Typography variant="subtitle2">HP: 51234</Typography>
		    </Grid>
		    <Grid item xs={4} className={classes.item}>
		    	<img onClick={handleOpen} width="70px" src="https://assets.epicsevendb.com/_source/item_arti/icon_art0070.png" alt="Draco's Plate"></img>
		    </Grid>
		    <Grid item xs={1} className={classes.item}>
		    	<img onClick={handleOpen} width="25px" src="https://epic7x.com/wp-content/uploads/2018/12/stic_debuf_impossible.png" alt="Immunity"></img>
		    </Grid>
		    <Grid item xs={12} className={classes.item}>
		    	<Box className={classes.info}>Additional Info</Box>
		    </Grid>
		    <Grid item xs={2} className={classes.item}>
		      	<img onClick={handleOpen} width="70px" src="https://assets.epicsevendb.com/_source/face/c2007_s.png" alt="Arbiter Vildred"></img>
		    </Grid>
		    <Grid item xs={5} className={classes.item}>
		      	<Typography variant="h5">Arbiter Vildred</Typography>
		      	<Typography variant="subtitle2">HP: 51234</Typography>
		    </Grid>
		    <Grid item xs={4} className={classes.item}>
		    	<img onClick={handleOpen} width="70px" src="https://assets.epicsevendb.com/_source/item_arti/icon_art0070.png" alt="Draco's Plate"></img>
		    </Grid>
		    <Grid item xs={1} className={classes.item}>
		    	<img onClick={handleOpen} width="25px" src="https://epic7x.com/wp-content/uploads/2018/12/stic_debuf_impossible.png" alt="Immunity"></img>
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