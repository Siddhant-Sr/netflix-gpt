import { useDispatch } from "react-redux";
import { API_MOVIE } from "../utilities/constants";
import { addTrailerVideo } from "../utilities/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    const getMovieVideos = async () => {
    const data = await fetch (
        "https://api.themoviedb.org/3/movie/"+movieId+"/videos",
        API_MOVIE
    );
const json = await data.json();


const filterData = json.results.filter((video) => video.type === "Trailer")
const trailer = filterData.length ? filterData[0] : json.results[0];

dispatch(addTrailerVideo(trailer));
}

useEffect(() => {
    getMovieVideos();
}, [])
}

export default useMovieTrailer;