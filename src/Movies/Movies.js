import React, { useEffect, useState } from 'react';
import Movie from '../Movie/Movie';
import './Movies.css'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import ReactPaginate from 'react-paginate';



const Movies = () => {
    let popular = 'https://movie-task.vercel.app/api/popular'
    const [movies, setMovies] = useState([])
    const [data, setData] = useState('')
    const [searcData, setSearchData] = useState([])
    const [loading, setLoading] = useState(false)
    const [hasError, setHasError] = useState(null);
    const [year, setYear] = useState('')
    const [rating, setRating] = useState('')

    // let pitu={...searcData}
    // pitu=pitu.data?.results

    useEffect(() => {
        setLoading(true)
        fetch(`${popular}?page=1`)
            .then(res => {
                if (!res.ok) {
                    throw Error('could not fetch the data for that resource')
                }
                return res.json()

            })

            .then(data => {
                setLoading(false)
                setMovies(data?.data?.results)
            })
            .catch(err => {
                setHasError(err.message)
                setLoading(false)

            })

    }, [])



    useEffect(() => {
        if (movies.length !== 0) {
            setSearchData(movies)
        }

    }, [movies])

    useEffect(() => {
        fetch(`https://movie-task.vercel.app/api/search?page=1&query=${data}`)
            .then(res => res.json())
            .then(data => setSearchData(data?.data?.results))
    }, [data])

    // const searchBox=()=>{


    // }

    useEffect(()=>{

        // let p={...movies}
        // p=p?.data?.results?.filter(po=>po.release_date.includes(year))
        // console.log(p);
        let result=[...movies]
        if(year)
        {
            result=result.filter(r=>r.release_date.includes(year))
        }
        // console.log(result);

        if(rating){
            result=result.filter(r=>r.vote_average.toString().includes(rating,1))

        }

        console.log(result);

        setSearchData(result)


     

    },[year,rating])

    const fetchMovies = async (currentPage) => {
        const res = await fetch(`https://movie-task.vercel.app/api/popular?page=${currentPage}`)
        const data = await res.json()
        return data;

    }





    const handlePageClick = async (data) => {
        console.log(data.selected);
        let currentPage = data.selected + 1
        const apiData = await fetchMovies(currentPage)
        setMovies(apiData?.data?.results)
    }


    return (
        <div className='container mt-4 mb-5'>


            <div className='d-flex justify-content-start align-items-center my-5'>

            

            <div className=''>



                <select value={year} onChange={(e) => setYear(e.target.value)} style={{ padding: '3px 17px 3px 17px', marginRight: '10px' }} id="cars">

                    <option>Year</option>
                    <option>2022</option>
                    <option>2021</option>
                    <option>2020</option>
                    <option>2019</option>
                    <option>2018</option>
                    <option>2017</option>
                </select>


            </div>
            <div className=''>



                <select value={rating} onChange={(e) => setRating(e.target.value)} style={{ padding: '3px 17px 3px 17px', marginRight: '10px' }} id="cars">

                    <option>Rating</option>
                   
                    <option>8</option>
                    <option>7</option>
                    <option>6</option>
                    <option>5</option>
                    <option>4</option>
                </select>
                


            </div>

            </div>




            <div style={{ backgroundColor: '#989898' }} className=' ps-2 py-1 w-50 mx-auto rounded-pill '>
                <MagnifyingGlassIcon style={{ heigth: '25px', width: '25px', color: 'white' }} className="" />
                <input onChange={(e) => setData(e.target.value)} style={{ backgroundColor: '#989898', outline: 'none', color: 'white' }} className='border border-0 ' type="text" />

            </div>

            <div className='text-center mt-4'>
                {
                    loading && <div class="spinner-border " role="status">
                        <span class="visually-hidden ">Loading...</span>
                    </div>
                }
            </div>
            <div className='text-center'>
                {
                    hasError && <div>{hasError}</div>

                }
            </div>

            <div className="row g-5 mt-5 mb-5">
                {/* {
                  popular &&  movies.map(movie=><Movie key={movie.id} movie={movie}></Movie>)
                } */}

                {
                    searcData?.map(movie => <Movie key={movie.id} movie={movie}></Movie>)
                }
            </div>
            <div>
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    pageCount={500}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination justify-content-center flex-sm-wrap'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    activeClassName={'active'}



                />






            </div>






        </div>
    );
};

export default Movies;

// #0c4a6e