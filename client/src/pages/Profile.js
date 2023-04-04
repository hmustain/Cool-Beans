
import React, { useState } from "react";

import Products from "../components/Products";

import Nav from "../components/NavTabs";
import sith from "../styles/images/adminimg.jpg"
import feild from "../styles/images/profileimg.jpg"
import { redirect } from 'react-router-dom';
import { useMutation } from "@apollo/client";
// import CategoryMenu from "../components/CategoryMenu";
import { ADD_PRODUCT } from "../utils/mutations";
// import Cart from "../components/Cart";

import "../styles/Profile.css";

import { QUERY_ME } from "../utils/queries";

import { useQuery } from "@apollo/client";

const Profile = () => {
    const [formState, setFormState] = useState({ name: "", description: "", price:0, image:"", quantity:"", category:""});
    const [AddProduct] = useMutation(ADD_PRODUCT);
    const { loading, data } = useQuery(QUERY_ME);
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState)
        const mutationResponse = await AddProduct({
            
            variables: {
                name: formState.name,
                description: formState.description,
                image: formState.image,
                price: formState.price,
                quantity: formState.quantity,
                category: formState.category

            },
            
        });
        console.log(mutationResponse,"here")

    };

    const handleChange = (event) => {
       
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
        console.log(formState)
    };

    const user = data?.me;


   

    if (!user && !loading) {

        window.location.assign('/login');

    }
    function isadmin() {
        if (user.role == "admin") {
            return (
                <div className="admindiv">
                    <div className="card">
                        <img src={sith} alt="sith lord" width="100%" height="100%"></img>
                        <div className="card-body">
                            <h5 className="card-title">Admin Details</h5>
                            <p className="card-text"></p>

                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">FirstName: {user.firstName}</li>
                            <li className="list-group-item">lastName: {user.lastName}</li>
                            <li className="list-group-item">Email: {user.email}</li>
                        </ul>
                    </div>

                    <form className="card1" onSubmit={handleFormSubmit}>
                        <div className="row">
                            <h5>Add a Product</h5>
                            <div className="col-25">
                                <label>Product Name</label>
                            </div>
                            <div className="col-75">
                                <input type="text" placeholder="name.." id="name"
                                    name="name"
                                     onChange={handleChange}></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label type="int">Price</label>
                            </div>
                            <div className="col-75">
                                <div className="input-group">
                                    <input type="int" className="form-control" 
                                     id="price"
                                     name="price"
                                     aria-label="Dollar amount (with dot and two decimal places)" onChange={handleChange}></input>
                                    <span className="input-group-text">$</span>
                                    <span className="input-group-text">0.00</span>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
    <label>Quantity</label>
    <input type="number" className="form-control" id="quantity" name="quantity"></input>
  </div>
                        <div className="row">

                            <div className="col-25">
                                <label>Category</label>
                            </div>
                            <div className="col-75">
                                <select id="category"  name="category"
              type="category">
                                    <option value="australia">Light Roast</option>
                                    <option value="canada">Medium Roast</option>
                                    <option value="usa">Dark Roast</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label>Description</label>
                            </div>
                            <div className="col-75">
                                <input type="text" 
                                placeholder="Write something.." 
                                id="description"
                                name="description"
                                
                                onChange={handleChange}></input>
                            </div>
                        </div>
                        <label>Upload Product Image Below</label>
                        <div className="input-group mb-3">
                            <input type="file" className="form-control"  id="image"
              name="image"
              onChange={handleChange}></input>
                           
                        </div>
                        <div className="row">
                            <button className="btn btn-dark w-50 mx-auto">Submit</button>
                        </div>
                    </form>

                    <div className="card">
                        <div className="card-header">
                            Reviews
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <p>A well-known quote, contained in a blockquote element.</p>
                                <footer className="blockquote-footer">{user.firstName}</footer>
                                <button>edit</button> <button>delete</button>
                            </blockquote><br></br>
                            <blockquote className="blockquote mb-0">
                                <p>A well-known quote, contained in a blockquote element.</p>
                                <footer className="blockquote-footer">{user.firstName}</footer>
                                <button>edit</button> <button>delete</button>
                            </blockquote><br></br>
                            <blockquote className="blockquote mb-0">
                                <p>A well-known quote, contained in a blockquote element.</p>
                                <footer className="blockquote-footer">{user.firstName}</footer>
                                <button>edit</button> <button>delete</button>
                            </blockquote><br></br>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="admindiv">
                    <div className="card">
                        <img src={feild} alt="not sith lord" width="100%" height="100%"></img>
                        <div className="card-body">
                            <h5 className="card-title">User Details</h5>
                            <p className="card-text"></p>

                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">FirstName: {user.firstName}</li>
                            <li className="list-group-item">lastName: {user.lastName}</li>
                            <li className="list-group-item">Email: {user.email}</li>
                        </ul>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            Your Reviews
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <p>A well-known quote, contained in a blockquote element.</p>
                                <footer className="blockquote-footer">{user.firstName}</footer>
                                <button>edit</button> <button>delete</button>
                            </blockquote><br></br>
                            <blockquote className="blockquote mb-0">
                                <p>A well-known quote, contained in a blockquote element.</p>
                                <footer className="blockquote-footer">{user.firstName}</footer>
                                <button>edit</button> <button>delete</button>
                            </blockquote><br></br>
                            <blockquote className="blockquote mb-0">
                                <p>A well-known quote, contained in a blockquote element.</p>
                                <footer className="blockquote-footer">{user.firstName}</footer>
                                <button>edit</button> <button>delete</button>
                            </blockquote><br></br>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (

        <div className="profilediv">

            <Nav />

            <h1 id="profilehead">leave me here</h1>
            <h2>Welcome to your profile {loading ? <p>loading...</p> : user.firstName}</h2>
            <div className="Profilediv">
                {loading ? <p>...</p> : isadmin()}
            </div>
        </div>

    );

};


export default Profile;
// reviews template


/* <div>
<h2>I see your an admin...</h2>

<div className="card">
<img src={sith} alt="sith lord" width="100%" height="100%"></img>
<div class="card-body">
<h5 class="card-title">Admin Info</h5>
<p>hi</p>
</div>
<ul class="list-group list-group-flush">
<li class="list-group-item">An item</li>
<li class="list-group-item">A second item</li>
<li class="list-group-item">A third item</li>
</ul>
</div>
    </div> */