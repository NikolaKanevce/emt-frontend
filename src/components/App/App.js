import './App.css';
import React, {Component} from "react"
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import Header from "../Header/header"
import Categories from "../Categories/categories"
import BookLibraryService from "../../repository/booksLibraryRepository";
import BookAdd from "../Books/BookAdd/bookAdd";
import BookEdit from "../Books/BookEdit/bookEdit"
import Books from "../Books/BookList/books"

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            categories: [],
            authors: [],
            selectedBook: {}
        }
    }

    render() {
        return (
            <Router>
                <Header/>
                <main>
                    <div className="container">
                        <Route path={"/categories"} exact render={() =>
                            <Categories categories={this.state.categories}/>}/>
                        <Route path={"/books/add"} exact render={() =>
                            <BookAdd authors={this.state.authors}
                                     categories={this.state.categories}
                                     onAddBook={this.addBook}/>}/>
                        <Route path={"/books/edit/:id"} exact render={() =>
                            <BookEdit categories={this.state.categories}
                                      authors={this.state.authors}
                                      book1={this.state.selectedBook}
                                      onEditBook={this.editBook}
                                      />}/>
                        <Route path={"/books"} exact render={() =>
                            <Books books={this.state.books}
                                    onDelete={this.deleteBook}
                                    onEdit={this.getBook}
                                    onMarkAsTaken={this.markBookAsTaken}/>}/>
                                    
                        <Redirect to={"/books"}/>            
                    </div>
                </main>
            </Router>
        );
    }

    componentDidMount() {
        this.loadCategories();
        this.loadBooks();
        this.loadAuthors();
    }

    loadBooks = () => {
        BookLibraryService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            })
    };

    loadCategories = () => {
        BookLibraryService.fetchCategories()
            .then((data) => {
                this.setState({
                    categories: data.data
                })
            })
    };
    
    loadAuthors = () => {
        BookLibraryService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            })
    };

    deleteBook = (id) => {
        BookLibraryService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            });
    };

    addBook = (name, category, author, availableCopies) => {
        BookLibraryService.addBook(name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    };

    editBook = (id, name, category, author, availableCopies) => {
        BookLibraryService.editBook(id, name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    };

    getBook = (id) => {
        BookLibraryService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            })
    };
    
    markBookAsTaken = (id) => {
        BookLibraryService.markAsTaken(id)
            .then(() => {
                this.loadBooks();
            })
    }


}

export default App;
