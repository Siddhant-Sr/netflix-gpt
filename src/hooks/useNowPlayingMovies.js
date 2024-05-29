import { useDispatch } from "react-redux";
import { API_MOVIE } from "../utilities/constants";
import { addNowPlayingMovies } from "../utilities/moviesSlice";
import { useEffect } from "react";


const useNowPlayingMovies = () => {
    const dispatch = useDispatch();

const getNowPlayingMovie = async () => {
  const data = await fetch(
    'https://api.themoviedb.org/3/movie/popular', 
    API_MOVIE);
    const json = await data.json();
   
    dispatch(addNowPlayingMovies(json.results))
}

useEffect(()=>{
  getNowPlayingMovie();
}, []);
}


export default useNowPlayingMovies;