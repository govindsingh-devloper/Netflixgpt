import React, { useEffect } from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/usePlayingMovies'
import MainContainer from './MainContainer'
import SecondaryConatiner from './SecondaryConatiner'
import usePopularMovies from '../hooks/usePopularMovies'
import useTrendingMovies from '../hooks/useTrendingMovies'
import GptSearch from './GptSearch'
import { useSelector } from 'react-redux'


const Browse = () => {

  const showGptSearchView=useSelector(store=>store.gpt.showGptSearch)
  //Custom Hook
  useNowPlayingMovies();
  usePopularMovies();
  useTrendingMovies();
 
  return (
    <div>
      <Header/>
      {
        showGptSearchView ? (  <GptSearch/>):(
          <>
          <MainContainer/>
          <SecondaryConatiner/>
          </>
        )
      }
    
    
 </div>
  )
}

export default Browse