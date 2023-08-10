import React from 'react'
import MovieCard from './MovieCard'

function Movies(props) {
    const {moviesData} = props
    return (
        <div style={{"display":"grid"}}>
            {moviesData.map(movie=><MovieCard key={movie.imdbID} movie={movie}/>)}
        </div>
    )
}

export default Movies
