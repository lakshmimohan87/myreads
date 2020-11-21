import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import BookCollection from './BookCollection';
import Search from './Search';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
        currentlyReading: undefined,
        wantToRead: undefined,
        read: undefined,
        fetchCompleted: false,
        bookCollection: undefined
    }

    this.getAllBooks();
  }

  /**
     * @description Get all the books that are currently present in the book shelf and seggregate to appropriate shelf array
     */ 
  getAllBooks = async() => {
    BooksAPI.getAll().then((value) => {
      this.setState(() => ({
        currentlyReading: this.booksByShelf(value, 'currentlyReading'),
        wantToRead: this.booksByShelf(value, 'wantToRead'),
        read: this.booksByShelf(value, 'read'),
        fetchCompleted: true,
      }));
    });
  }

  /**
     * @description Update book to the requested shelf
     * @param {object} book - Represent a book object 
     * @param {string} shelf - Shelf to which the book should be moved
     */
  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.getAllBooks();
      this.setState(() => ({fetchCompleted: false}));
    });
  }

  /**
     * @description Filters the books by shelf
     * @param {object} books - Array of books 
     * @param {string} shelf - Shelf to be used for filtering
     * @return  array of books
     */ 
  booksByShelf = (books, shelf) => {
    return books.filter(book => book.shelf === shelf);
  }

   /**
     * @description Represents the books in all the shelves
     * @return  books from all shelves merged into one single array
     */ 
  bookInShelves = () => {
    let bookInShelves = [];
    return bookInShelves.concat(this.state.currentlyReading)
                        .concat(this.state.wantToRead)
                        .concat(this.state.read);
  }

  render() {
    return(
      <Router>
        <Route exact path="/search">
          <Search updateBook={this.updateBook} booksInShelves={this.bookInShelves()} ></Search>
        </Route>
    
        <Route exact path="/" render={()=>
            this.state.fetchCompleted ?
                <div className="app">
                  <div className="list-books">
                    <div className="list-books-title">
                      <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                      <div>
                        <BookCollection books={this.state.currentlyReading} bookShelfTitle="Currently Reading" updateBook={this.updateBook} ></ BookCollection >
                        <BookCollection books={this.state.wantToRead} bookShelfTitle="Want to Read" updateBook={this.updateBook} ></ BookCollection >
                        <BookCollection books={this.state.read} bookShelfTitle="Read" updateBook={this.updateBook} ></ BookCollection >
                      </div>
                    </div>
                  </div>
                  <Link to="/search">
                    <div className="open-search">
                      <button></button>
                      </div>
                  </Link>
                </div>
            : <div>Loading...</div>
        }></Route>
      </Router>
    )
  }
}

export default BooksApp
