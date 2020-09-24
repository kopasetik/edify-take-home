import React, {useState, useEffect} from 'react';
import './App.css';
import { AppBar, Toolbar, InputBase } from '@material-ui/core'
import { fade, makeStyles } from '@material-ui/core/styles'
import PokemonList from './PokemonList.js'
import PokemonDetails from './PokemonDetails.js'

const useStyles = makeStyles((theme) => ({
  root: {
  },
  appBar: {
    height: '4em',
  },
  delay: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  hourglass: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  delayInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  }
}))

function App(props){
	const classes = useStyles()
	const [delay, setDelay] = useState(2000)	 
	const [pokedata, setPokedata] = useState([])
	const [filteredData, setFilteredData] = useState([])
	const [offset, setOffset] = useState(0)
	const [view, setView] = useState('list')
	const [loadStatus, setLoadStatus] = useState(false)
	const [storage, setStorage] = useState(localStorage.getItem('pokeFaves'))
	const [filter, setFilter] = useState({isFiltered: false, name: null })
	const [currentPokemon, setCurrentPokemon] = useState({})
	
	useEffect(()=>{
		setTimeout(() => {

			// api call requesting 100 pokemon w/ offset
			const url = `https://pokeapi.co/api/v2/pokemon?limit=100&offset=${offset}`
			return fetch(url)
    			  .then(response =>  response.json())
    			  .then(jsonResponse => {
				const pokegroup = jsonResponse.results
				const pokelist = pokegroup.map(pokemon => {
					pokemon.delay = delay
					return pokemon
				})
				console.log(pokelist)
				
					setPokedata([...pokedata, ...pokelist])  
				return () => {
				}
				})
		}, delay)
	
	}, [offset])

	useEffect(() => {
		return () => {}
	}, [view, currentPokemon])


	/* useEffect(() => {

		setTimeout(() => {

			const url = filter
			return fetch(url)
    			  .then(response =>  response.json())
    			  .then(jsonResponse => {
				const pokegroup = jsonResponse.pokemon
				const pokelist = pokegroup.map(pokemon => {
					return pokemon.name
				})
					setFilteredData(pokedata.filter(({name}) => pokelist.includes(name)))  
				return () => {
				}
				})
		}, delay)
		
	}, [filter]) */

	const inputDelay = (e) => {
		setDelay(e.target.value)
	}

	const noop = () => {}

	const handleFilter = (e) => {
		
		setFilter(e.target.value)
		console.log(filter.name)
	}

	return (
		  <div className="App">
			<AppBar className={classes.appBar} position="sticky">
				<Toolbar>
					<div className={classes.delay}>
						<div className={classes.hourglass}>
						</div>
						<InputBase
							placeholder={delay} 
							className={classes.delayInput}
							onBlur={inputDelay} 
						/>
					</div>	
					<div>Delay in milliseconds</div>
					<div>

					</div>
					<div>
						<label>
						Pick a pokemon type:
						<select value={filter} onChange={handleFilter}>
							<option value={{isFiltered: false, name: 'normal' }}></option>
							<option value={{isFiltered: true, name: 'normal'}}>Normal</option>
							<option value={{isFiltered: true, name: 'fighting'}}>Fighting</option>
							<option value={{isFiltered: true, name: 'flying'}}>Flying</option>
						</select>
						</label>
					</div>
					<div>

					</div>
				</Toolbar>
			</AppBar>
		  	<PokemonList pokedata={pokedata} functions={{setView, setCurrentPokemon}} filter={filter} />
		  </div>
	)
}

export default App;
