import { useDispatch } from "react-redux"
import { API_OPTIONS } from "../utilis/constants";
import { addTrendingMovies } from "../utilis/movieSlice";
import { useEffect } from "react";

const useTrendingMovies=()=>{
    const dispatch=useDispatch();

    const getTrendingMovies=async()=>{
        const data=await fetch("https://api.themoviedb.org/3/movie/top_rated?page=1",
            API_OPTIONS
        );

        const json=await data.json()
        dispatch(addTrendingMovies(json.results));

    };

    useEffect(()=>{
        getTrendingMovies()
    },[])
}

export default useTrendingMovies;