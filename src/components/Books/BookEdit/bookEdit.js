import React from 'react'
import {useHistory} from 'react-router-dom'

const BookEdit = (props) => {

    const history = useHistory();
    const[formData, updateFormData] = React.useState({
        name : "",
        category : "",
        author : 1,
        availableCopies : 0
    });

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        const name = formData.name !== "" ? formData.name: props.book1.name;
        const category = formData.category !== "" ? formData.category: props.book1.category;
        const author = formData.author !== 0 ? formData.author: props.book1.author;
        const availableCopies = formData.availableCopies !== 0 ? formData.availableCopies: props.book1.availableCopies;
        
        props.onEditBook(props.book1.id, name, category, author, availableCopies);
        history.push("/books");
    };
    
    return(
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Book name</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                               placeholder={props.book1.name}
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" className="form-control" onChange={handleChange}>
                            {props.categories.map((term) => {
                                    if(props.book1.category!=="" && props.book1.category===term)
                                        return <option selected={props.book1.category} value={term}>{term}</option>
                                    else return <option value={term}>{term}</option>
                                }
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Author</label>
                        <select name="author" className="form-control" onChange={handleChange}>
                            {props.authors.map((term) => {
                                if(props.book1.author !== undefined
                                    && props.book1.author === term.id)
                                    return <option selected={props.book1.author} value={props.book1.author}>{term.name} {term.surname}</option>
                                else return <option value={term.id}>{term.name} {term.surname}</option>
                            }
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="availableCopies">Quantity</label>
                        <input type="text"
                               className="form-control"
                               id="availableCopies"
                               name="availableCopies"
                               placeholder={props.book1.availableCopies}
                               onChange={handleChange}
                        />
                    </div>
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
    
};

export default BookEdit;