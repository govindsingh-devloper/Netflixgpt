import React, { useEffect } from 'react'
import { API_OPTIONS } from '../utilis/constants'
import { useDispatch } from 'react-redux'
import { addNowPlayyingMovies } from '../utilis/movieSlice'

const useNowPlayingMovies=()=>{
    const dispatch=useDispatch()
    const getNowPlayingMovies=async()=>{
      const data= await fetch("https://api.themoviedb.org/3/movie/now_playing",
        API_OPTIONS
      );
      const json=await data.json();
      console.log(json.results)
      dispatch(addNowPlayyingMovies(json.results))
    }
    useEffect(()=>{
      getNowPlayingMovies();
    },[])
}


export default useNowPlayingMovies