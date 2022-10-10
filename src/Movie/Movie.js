import React from 'react';
import { useNavigate } from 'react-router-dom';

const Movie = ({ movie }) => {
    const navigate=useNavigate()
    // console.log(movie);
    const imgUrl = `https://image.tmdb.org/t/p/original/${movie.poster_path
        }`

        const showDetails=(id)=>{
            navigate(`/movie/${id}`)
            

        }




    return (
        <div className=' col-lg-3 col-12  '>
            <div onClick={()=>showDetails(movie.id)} style={{width:'19em', height:'450px',borderRadius:'10px'}} class="card  movie-card  " >
            <img style={{borderRadius:'10px'}} src={imgUrl}

                class="card-img-top" alt="..." />
            <div class="card-body">
                {/* <h5 class="card-title">Card title</h5> */}
                
            </div>
        </div>
        </div>
    );
};

export default Movie;