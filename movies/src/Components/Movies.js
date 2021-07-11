import React, { Component } from 'react'
import { getMovies } from "./MovieService"
import axios from 'axios';
export default class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            searchText: "",
            noofresults: 5,
            currentPage: 1,
            genre: [{ _id: "default", name: "All Genre" }],
            currGenre: "All Genre"
        }
    }
    //as network fetch 
    async componentDidMount() {
        console.log('Component DID Mount');
        let res = await axios.get('https://backend-react-movie.herokuapp.com/movies');
        let genreRes = await axios.get("https://backend-react-movie.herokuapp.com/genres")
        // console.log(genreRes.data.genres)
        genreRes = genreRes.data.genres;
        // console.log(res);
        this.setState({
            movies: res.data.movies,
            genre: [...this.state.genre, ...genreRes]
        })
    }

    onDelete = (id) => {
        let filteredArr = this.state.movies.filter(movie => {
            return movie._id !== id;
        })
        this.setState({ movies: filteredArr })
    }
    handleChange = (e) => {
        //We are kind of creating two states for similar content. As the filter movies operation is temporary and occurs with the state change
        //  of currSearchText we can simply form the filterMovies array in the render method itself. So there is no need to make
        // it as a state.
        // if(val=='')
        // {
        //     this.setState({
        //     filterMovies:this.state.movies,
        //     currSearchText:''
        // })
        // return;
        // }
        // let filteredArr = this.state.movies.filter(movieObj=>{
        //     let title = movieObj.title.trim().toLowerCase();
        //     // console.log(title);
        //     return title.includes(val.toLowerCase());
        // })
        // this.setState({
        //     filterMovies:filteredArr,
        //     currSearchText:val
        // })
        this.setState({ searchText: e.target.value })
    }

    // sortByRatings= (e)=>{
    //     let className = e.target.className;
    //     console.log(className);
    //     let sortedMovies=[];
    //     if(className=='fa fa-sort-asc')
    //     {
    //         //ascending order
    //         sortedMovies = this.state.movies.sort(function(movieObjA,movieObjB){
    //             return movieObjA.dailyRentalRate-movieObjB.dailyRentalRate
    //         })
    //     }
    //     else
    //     {
    //         //descending order
    //         sortedMovies =this.state.movies.sort(function(movieObjA,movieObjB){
    //             return movieObjB.dailyRentalRate-movieObjA.dailyRentalRate
    //         })
    //     }
    //     this.setState({
    //         movies:sortedMovies
    //     })
    // }

    sortStockUpClick = (e) => {
        let copy = this.state.movies;
        copy.sort((a, b) => (a.numberInStock > b.numberInStock) ? -1 : (a.numberInStock < b.numberInStock) ? 1 : 0)
        this.setState({ movies: copy });
    }
    sortStockDownClick = (e) => {
        let copy = this.state.movies;
        copy.sort((a, b) => (a.numberInStock > b.numberInStock) ? 1 : (a.numberInStock < b.numberInStock) ? -1 : 0)
        this.setState({ movies: copy });
    }
    sortRateUpClick = () => {
        let copy = this.state.movies;
        copy.sort((a, b) => (a.dailyRentalRate > b.dailyRentalRate) ? -1 : (a.dailyRentalRate < b.dailyRentalRate) ? 1 : 0)
        this.setState({ movies: copy });
    }
    sortRateDownClick = () => {
        let copy = this.state.movies;
        copy.sort((a, b) => (a.dailyRentalRate > b.dailyRentalRate) ? 1 : (a.dailyRentalRate < b.dailyRentalRate) ? -1 : 0)
        this.setState({ movies: copy });
    }

    handleChangeNoOfResults = (e) => {
        let val = e.target.value;
        this.setState({ noofresults: val })
    }
    handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
    }
    handleGenreChange=(gName)=>{
        this.setState({currGenre:gName})
    }
    render() {

        //we know that filtering movies as per input text is a temporary job not a permanet job like delete
        //so whenever render is called due to handleChange we can create a filtered array as per input & apply map to it
        // console.log("call due to handleChange")
        let filteredArr = [];
        let txt = this.state.searchText.trim().toLowerCase();

        (txt == "") ? filteredArr = this.state.movies : (filteredArr = this.state.movies.filter((movie) => {
            // console.log(txt);
            // let mtitle=movie.title.trim().toLowerCase();
            return movie.title.trim().toLowerCase().includes(txt);
        }))
        if(this.state.currGenre!="All Genre"){
            filteredArr=filteredArr.filter(obj=>{
                return obj.genre.name==this.state.currGenre
            });
        }
        // console.log(filteredArr);
        let startingIndex = (this.state.currentPage - 1) * this.state.noofresults;
        // let endingIndex=startingIndex + this.state.noofresults - 1;
        let endingIndex = startingIndex + this.state.noofresults; //removing -1 because of slice
        //if their are not enough element from starting index to ending index slice takes care of it by displaying only no. of elemnets present
        let noOfPages = Math.ceil(filteredArr.length / this.state.noofresults);
        filteredArr = filteredArr.slice(startingIndex, endingIndex);
        console.log(noOfPages);

        let pagesArr = [];
        for (let i = 1; i <= noOfPages; i++) pagesArr.push(i);
        console.log(pagesArr);
        return (
            <>
                {
                    this.state.movies.length == 0 ? <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div> :
                        <div className="container">
                            <div className="row">
                                <div className="col-3">
                                    <ul className="list-group">
                                        {
                                            this.state.genre.map((gObj)=>(
                                                <li key={gObj._id} onClick={()=>this.handleGenreChange(gObj.name)} className="list-group-item">{gObj.name}</li>
                                            ))
                                        }
                                    </ul>
                                    <h3>Current Genre: {this.state.currGenre}</h3>
                                </div>
                                <div className="col-9">
                                    <input type="search" placeholder="Search your Fav Movie" onChange={this.handleChange} value={this.state.searchText}></input>
                                    <input type="number" placeholder="Enter movies per page" onChange={this.handleChangeNoOfResults} value={this.state.noofresults} min="1"></input>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Title</th>
                                                <th scope="col">Genre</th>
                                                <th scope="col">
                                                    Stock
                                                    <i className="fa fa-sort-asc" aria-hidden="true" onClick={this.sortStockUpClick}></i>
                                                    <i className="fa fa-sort-desc" aria-hidden="true" onClick={this.sortStockDownClick}></i>
                                                </th>
                                                <th scope="col">
                                                    Rate
                                                    <i className="fa fa-sort-asc" aria-hidden="true" onClick={this.sortRateUpClick}></i>
                                                    <i className="fa fa-sort-desc" aria-hidden="true" onClick={this.sortRateDownClick}></i>
                                                </th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                filteredArr.map(movie => (
                                                    <tr scope="row" key={movie._id}>
                                                        <td>{movie.title}</td>
                                                        <td>{movie.genre.name}</td>
                                                        <td>{movie.numberInStock}</td>
                                                        <td>{movie.dailyRentalRate}</td>
                                                        <td><button type="button" className="btn btn-danger" onClick={() => this.onDelete(movie._id)}>Delete</button></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <nav aria-label="...">
                                <ul className="pagination">
                                    {
                                        pagesArr.map((pageNumber) => {
                                            let classStyle = pageNumber === this.state.currentPage ? 'page-item active' : 'page-item';
                                            return (
                                                <li key={pageNumber} className={classStyle} onClick={() => this.handlePageChange(pageNumber)}>
                                                    <span className="page-link">{pageNumber}</span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </nav>
                        </div>
                }
            </>
        )
    }
}
