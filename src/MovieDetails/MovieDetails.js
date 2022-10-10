import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
    const { id } = useParams();

    const [movieDetails, setMovieDetails] = useState({})
    useEffect(() => {
        fetch(`https://movie-task.vercel.app/api/movie?movieId=${id}`)
            .then(res => res.json())
            .then(data => setMovieDetails(data))

    }, [])
    const imgUrl = `https://image.tmdb.org/t/p/original/${movieDetails?.data?.backdrop_path}`
    return (
        <div>
            <div class="card mb-3">
                <img style={{ height: '450px', borderRadius: '0px' }} src={imgUrl} class="card-img-top" alt="..." />

            </div>

            <div className='container mt-5'>
                <h2 style={{color:'white'}}>{movieDetails?.data?.original_title}</h2>
                <div className='d-flex justify-content-start align-items-center'>
                    <p style={{color:'#CD853F'}}>Release Date :{movieDetails?.data?.release_date}</p>
                    <p style={{color:'#CD853F'}} className='px-2'>Revenue :{movieDetails?.data?.revenue}</p>
                    <p style={{color:'#CD853F'}} className='px-2'>Runtime :{movieDetails?.data?.runtime}</p>
                    <p style={{color:'#CD853F'}} className='px-2'>Rqting :{movieDetails?.data?.vote_average}</p>
                    <p style={{color:'#CD853F'}} className='px-2'>Vote Count :{movieDetails?.data?.vote_count}</p>
                </div>

                <p style={{color:'white'}} >{movieDetails?.data?.overview}</p>
            
            </div>


        </div>
    );
};

export default MovieDetails;