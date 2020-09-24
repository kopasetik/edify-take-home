import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: '1em',
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    height: '12em',
    width: '10em',
    margin: '0.5em',
    padding: '0.5em',
  },
  para: {
    textTransform: 'capitalize'
  },
  anchor: {
    margin: '0 0.5em'
  }
}))

// For use in detail view
//return (<a key={idx} className={classes.anchor} href={type.type.url}>{type.type.name}</a>)

function Pokemon (props){

	const classes = useStyles()
	const [loadStatus, setLoadStatus] = useState(false)
	const [theTypes, setTheTypes] = useState([])

	useEffect(()=>{
		setTimeout(() => {
			fetch(props.data.url)
				.then(response => response.json())
				.then(({types}) => {
					setTheTypes(types)	
					setLoadStatus(true)
				})
		}, props.data.delay || 0)
	})

	const displayPokemon = ({url}) => {
		props.functions.setCurrentPokemon()
		props.functions.setView('details')
	}

	const view = loadStatus ? (
		<>
			<p className={classes.para}>{props.data.name}</p>
			<p>
				Types: {theTypes.map(type => type.type.name).join(', ')}
			</p>
		</>
	) : (<Skeleton variant="rect" width={'100%'} height={'100%'} />)
	
	return (
		<Grid item xs={6} sm={6} md={3} className={classes.grid} onClick={()=>{console.log('clicked me!')}}>
			<Paper className={classes.paper}>
				{view}
			</Paper>
		</Grid>
	)
}

export default Pokemon
