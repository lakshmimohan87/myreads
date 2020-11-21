import React, { Component } from 'react';
import './App.css';

class Book extends Component{
    
     /**
     * @description Handler for onChange event on shelf options
     * @param {event} - onChange event args
     */ 
    handleChange = (event) => {
        this.props.updateBook(this.props.book, event.target.value);    
    }
    
     /**
     * @description Renders the shelf options with prefising the tick-mark on current shelf
     * @param {string} shelf - Shelf the current book is associated with
     * @return  The shelf option prefixing tick-mark if the current shelf matches
     */ 
    renderShelf = (shelf) => {
        return (this.props.book.shelf === shelf ? String.fromCharCode(10004) + ' '  : '') + shelf;
    }

    /**
     * @description Verifies if the shelf matches the current book and returns 'selected' attribute
     * @param {string} shelf - Shelf to validate with current book object's shelf
     * @return  {string} selected or empty string
     */ 
    isSelected = (shelf) => {
        return this.props.book.shelf === shelf ? 'selected' : '';
    }
                                                
    render() {
        let backgroundImage = '';

        if(this.props.book.imageLinks && this.props.book.imageLinks.thumbnail) {
            backgroundImage = this.props.book.imageLinks.thumbnail;
        }
       
        return(
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${backgroundImage})` }}></div>
                        <div className="book-shelf-changer">
                            <select value={this.props.book.shelf} onChange={this.handleChange}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">{this.renderShelf('currentlyReading')}</option>
                                <option value="wantToRead">{this.renderShelf('wantToRead')}</option>
                                <option value="read">{this.renderShelf('read')}</option>
                                <option value="none">None</option>   
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{this.props.book.title}</div>
                    <div className="book-authors">{this.props.book.authors}</div>
                </div>
          </li>
        );
    }
}

export default Book;
