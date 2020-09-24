import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import Pokemon from './Pokemon.js'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
}))

function PokemonList(props){
const [subgroup, setSubgroup] = useState([])

useEffect(() =>{
async function getData(){
	const url = `https://pokeapi.co/api/v2/type/${props.filter.name || 'normal'}`
			return await fetch(url)
    			  .then(response =>  response.json())
    			  .then(jsonResponse => {
				const pokelist = jsonResponse.pokemon.map(pokemon => {
					return pokemon.name
				})
					setSubgroup(pokelist)  
				return () => {
				}
				})
}
getData()
}, [props.filter.isFiltered])


	const classes = useStyles()


	const data = props.filter.isFiltered ? props.pokedata.filter(pokemon => subgroup.includes(pokemon.name)) : props.pokedata
	console.log(data)
	const guts = data.map((pokemon, idx) => (
						<Pokemon key={idx} data={pokemon} functions={props.functions} />
					)
			)

	return (
		<div className={classes.root}>
				<Grid container className={classes.root} spacing={0}>
					{guts}
				</Grid>
		</div>
	)
}

export default PokemonList
