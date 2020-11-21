import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Link } from 'react-router-dom';
import BookCollection from './BookCollection';

class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {searchResult:undefined,}
    }
    
    /**
     * @description Updating the search result with Shelf info
     * @param {Array} searchResult - collection of books
     * @param {Array} booksInShelves - Books in the shelves
     * @returns {Array} Updated results
     */
    updateSearchResult = (searchResult, booksInShelves) => {
        const updatedResult = searchResult.map((item) => {
            var matchingBook = this.findBook(booksInShelves, item.id);
            item.shelf = matchingBook ? matchingBook.shelf : 'none';
            return item;
        });
        return updatedResult;
    }
    
    /**
     * @description Finding a book
     * @param {Array} booksInShelves - Books in the shelves
     * @param {string} bookId - id of a book 
     * @returns {object} book
     */
    findBook = (booksInShelves, bookId) => {
        const foundBooks = booksInShelves.filter((book)=>(book.id === bookId));
        return foundBooks.length ? foundBooks[0] : undefined
    }

    /**
     * @description Searching a book
     * @param {event} event
     */
    searchBook = (event) => {
        if(event.target.value.length) {
            BooksAPI.search(event.target.value).then((value) => {               
                let updatedSearchResult = undefined;
                if(value.length) {
                    updatedSearchResult = this.updateSearchResult(value, this.props.booksInShelves);
                }
                this.setState(() => ({searchResult: updatedSearchResult}));
              });
        } else {
            this.setState(() => ({searchResult: undefined}));
        }
    }   
      

    render() {
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/">
                        <button className="close-search">Close</button>
                    </Link>             
                    <div className="search-books-input-wrapper">               
                        <input type="text" placeholder="Search by title or author" id="search" onChange={this.searchBook}> 
                        </input>
                    </div>
                </div>
                { this.state.searchResult ? this.resultView() : <div></ div> }
          </div>
        );
    }

    /**
     * @description The search results view
     * @return JSX Element
     */
    resultView = () => {
        return (<div className="search-books-results">
                    <div className="bookshelf-books">
                        <BookCollection books={this.state.searchResult} updateBook={this.props.updateBook} ></ BookCollection >
                    </div>
                </div>);
    }
}

export default Search;