# Table of Contents

* About the project
* Installation and Launching
* Requirements
* Search Terms
* Create React App



## About the project

In the MyReads project, we will be able to create a bookshelf app that allows us to select and categorize books we have read, are currently reading, or want to read.

## Installation and Launching


* install all project dependencies with `npm install`
* start the development server with `npm start`

## Requirements
The main page displays a list of 'shelves', each of which contains a number of books. The three shelves are:

* Currently Reading
* Want to Read
* Read
Each book has a control that lets you select the shelf for that book. When you select a different shelf, the book moves there. The default value for the control should always be the current shelf the book is in. The main page also has a link to '/search', a search page that allows you to find books to add to your library. The search page has a text input that may be used to find books. As the value of the text input changes, the books that match that query are displayed on the page, along with a control that lets you add the book to your library.

## Search Terms

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.


## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). 

