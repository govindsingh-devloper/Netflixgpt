import React, { useEffect } from 'react'
import {API_OPTIONS} from "../utilis/constants"
import { useDispatch, useSelector } from 'react-redux'
import { addTrailerVideo } from '../utilis/movieSlice'

const useMovieTrailer=(movieId)=>{
    const dispatch=useDispatch()

    const getMovieVideo=async()=>{
      const data = await fetch(`https://api.themoviedb.org/3/movie/${845781}/videos`,
        API_OPTIONS
      );
      const json=await data.json();
      console.log(json);
  
  
      const filterData=json.results.filter((video)=> video.type==="Trailer")
      console.log(filterData);
      const trailer= filterData.length? filterData[0] : json.results[0];
      console.log(trailer)
      dispatch(addTrailerVideo(trailer))
  
    }
  
    useEffect(()=>{
     getMovieVideo();
    },[])


}
export default useMovieTrailer