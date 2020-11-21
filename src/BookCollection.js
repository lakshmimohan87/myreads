import React, { Component } from 'react';
import './App.css';
import Book from './Book';

class BookCollection extends Component {

    /**
     * @description Callback for the updateBook function in parent class
     * @param {object} book - Represents a book
     * @param {string} shelf - Shelf to which the book should be moved
     */
    updateBook = (book, shelf) => {
        this.props.updateBook(book, shelf);
    }

    /**
     * @description Returns the books associated to a shelf
     * @returns JSX Element
     */  
    renderBooks = () => {
        return this.props.books.map(book =>
            <Book book={book} updateBook={this.updateBook} ></ Book >);
    }

    render() {
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.bookShelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.renderBooks()}
                    </ol>
                </div>
            </div>
        );
    }
}

export default BookCollection;
